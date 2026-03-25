# Idea Bank

An AI-powered idea blog. Share ideas with Claude Code as text, images, audio, or video, and it automatically creates beautiful, categorized pages for you.

## How It Works

1. Open Claude Code in this repo
2. Share an idea: text, image, audio, or video file
3. Claude Code analyzes your input, writes it up, categorizes it, and generates a page
4. Open `index.html` in your browser to see your growing collection

## Viewing

Open `index.html` in any browser. No server required.

## Structure

```
index.html          - Main page with idea grid, search, and filters
assets/style.css    - Shared styles
assets/main.js      - Search and filter logic
ideas/ideas.json    - Catalog of all ideas
ideas/<slug>/       - Individual idea folders with page and media
CLAUDE.md           - Instructions for Claude Code
```
