# Idea Bank - Claude Code Instructions

This is an AI-powered idea blog. When the user wants to add an idea, follow these steps precisely.

## How to Add a New Idea

When the user says something like "add this idea", "new idea", or provides content (text, images, audio, video) they want turned into an idea page:

### Step 1: Analyze the Input

- **Images**: Read the image file using the Read tool. Describe what you see, extract the core idea, and identify key themes.
- **Audio/Video**: You cannot directly process audio or video content. Ask the user for a brief description of what the audio/video contains. Embed the media file with a native HTML5 player on the page.
- **Text**: Take the raw text and understand the core idea.

### Step 2: Generate Metadata

Auto-generate the following:
- **Title**: A catchy, concise title (5-10 words)
- **Slug**: URL-safe lowercase version of the title (e.g., `solar-powered-garden-robot`)
- **Category**: Pick the best fit from `ideas/ideas.json` `categories` array. If none fit well, you may add a new category.
- **Tags**: 3-5 relevant keywords as an array
- **Summary**: 1-2 sentence summary for the card on the index page
- **Date**: Today's date in YYYY-MM-DD format
- **Media**: List of media files with type (image/audio/video) and filename

### Step 3: Create the Idea Folder and Page

1. Create directory: `ideas/<slug>/`
2. Copy/move any media files into `ideas/<slug>/`
3. Create `ideas/<slug>/index.html` using the template below

### Step 4: Update the Catalog

1. Read `ideas/ideas.json`
2. Add the new idea object to the `ideas` array (prepend so newest is first)
3. If you created a new category, add it to the `categories` array
4. Write the updated JSON back

### Step 5: Regenerate the Index

1. Read `index.html`
2. Update the `ideasData` JavaScript variable embedded in the page with the full contents of `ideas/ideas.json`
3. Make sure the data in `index.html` matches `ideas/ideas.json` exactly

### Step 6: Commit and Push

Commit all new/changed files with message: "Add idea: <title>"
Push to the current branch.

---

## Idea Page Template

Each idea page at `ideas/<slug>/index.html` should follow this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[TITLE] - Idea Bank</title>
    <link rel="stylesheet" href="../../assets/style.css">
</head>
<body>
    <div class="idea-page">
        <nav class="idea-nav">
            <a href="../../index.html" class="back-link">&larr; Back to Ideas</a>
        </nav>

        <article class="idea-article">
            <header class="idea-header">
                <span class="category-badge category-[CATEGORY_LOWERCASE]">[CATEGORY]</span>
                <h1>[TITLE]</h1>
                <div class="idea-meta">
                    <time datetime="[DATE]">[FORMATTED_DATE]</time>
                    <div class="idea-tags">
                        [FOR EACH TAG: <span class="tag-pill">[TAG]</span>]
                    </div>
                </div>
            </header>

            [MEDIA SECTION - if images:]
            <div class="idea-media">
                <img src="[FILENAME]" alt="[DESCRIPTION]" class="idea-image">
            </div>

            [MEDIA SECTION - if audio:]
            <div class="idea-media">
                <audio controls class="idea-audio">
                    <source src="[FILENAME]" type="audio/[FORMAT]">
                </audio>
            </div>

            [MEDIA SECTION - if video:]
            <div class="idea-media">
                <video controls class="idea-video">
                    <source src="[FILENAME]" type="video/[FORMAT]">
                </video>
            </div>

            <div class="idea-content">
                [WELL-STRUCTURED HTML CONTENT]
                [Use <h2>, <h3>, <p>, <ul>, <blockquote> as appropriate]
                [Write a thorough, engaging exploration of the idea]
                [Include sections like: Overview, Key Details, Potential, Next Steps]
            </div>
        </article>
    </div>
</body>
</html>
```

## Important Notes

- Always use relative paths for links and assets (`../../assets/style.css`)
- Keep media files in the idea's own folder
- The index page loads idea data from an inline JS variable, NOT from a fetch call (so it works as a static file without a server)
- When regenerating the index, only update the `ideasData` variable, don't change the rest of the HTML/CSS/JS
- Use semantic HTML and keep pages accessible
- Write engaging, well-structured content - this is a blog, not just notes
