// ===== Idea Bank - Index Page Logic =====

(function () {
    'use strict';

    let state = {
        ideas: [],
        categories: [],
        activeCategory: null,
        searchQuery: ''
    };

    function init() {
        // ideasData is embedded inline in index.html
        if (typeof ideasData !== 'undefined') {
            state.ideas = ideasData.ideas || [];
            state.categories = ideasData.categories || [];
        }

        renderCategoryFilters();
        renderIdeas();
        bindEvents();
    }

    function bindEvents() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let debounce;
            searchInput.addEventListener('input', function () {
                clearTimeout(debounce);
                debounce = setTimeout(function () {
                    state.searchQuery = searchInput.value.trim().toLowerCase();
                    renderIdeas();
                }, 200);
            });
        }
    }

    function renderCategoryFilters() {
        const container = document.getElementById('category-filters');
        if (!container) return;

        let html = '<button class="category-btn active" data-category="">All</button>';
        state.categories.forEach(function (cat) {
            html += '<button class="category-btn" data-category="' + cat + '">' + cat + '</button>';
        });
        container.innerHTML = html;

        container.addEventListener('click', function (e) {
            const btn = e.target.closest('.category-btn');
            if (!btn) return;

            container.querySelectorAll('.category-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            state.activeCategory = btn.dataset.category || null;
            renderIdeas();
        });
    }

    function getFilteredIdeas() {
        return state.ideas.filter(function (idea) {
            // Category filter
            if (state.activeCategory && idea.category !== state.activeCategory) {
                return false;
            }
            // Search filter
            if (state.searchQuery) {
                const haystack = (
                    idea.title + ' ' +
                    idea.summary + ' ' +
                    (idea.tags || []).join(' ')
                ).toLowerCase();
                if (haystack.indexOf(state.searchQuery) === -1) {
                    return false;
                }
            }
            return true;
        });
    }

    function renderIdeas() {
        const container = document.getElementById('ideas-grid');
        if (!container) return;

        const filtered = getFilteredIdeas();

        if (filtered.length === 0) {
            if (state.ideas.length === 0) {
                container.innerHTML =
                    '<div class="empty-state">' +
                    '<h2>No ideas yet</h2>' +
                    '<p>Tell Claude Code to add your first idea! Share text, images, audio, or video and it will create a beautiful page for you.</p>' +
                    '</div>';
            } else {
                container.innerHTML =
                    '<div class="empty-state">' +
                    '<h2>No matches</h2>' +
                    '<p>Try a different search or category filter.</p>' +
                    '</div>';
            }
            return;
        }

        container.innerHTML = filtered.map(function (idea) {
            const catClass = 'category-' + (idea.category || 'other').toLowerCase().replace(/\s+/g, '-');
            const thumb = idea.media && idea.media.find(function (m) { return m.type === 'image'; });
            const thumbHtml = thumb
                ? '<img class="idea-card-thumb" src="ideas/' + idea.slug + '/' + thumb.filename + '" alt="' + escapeHtml(idea.title) + '">'
                : '';

            const tagsHtml = (idea.tags || []).map(function (t) {
                return '<span class="tag-pill">' + escapeHtml(t) + '</span>';
            }).join('');

            return (
                '<a href="ideas/' + idea.slug + '/index.html" class="idea-card">' +
                thumbHtml +
                '<div class="idea-card-body">' +
                '<div class="idea-card-top">' +
                '<span class="category-badge ' + catClass + '">' + escapeHtml(idea.category || 'Other') + '</span>' +
                '<span class="idea-date">' + formatDate(idea.date) + '</span>' +
                '</div>' +
                '<h3>' + escapeHtml(idea.title) + '</h3>' +
                '<p class="summary">' + escapeHtml(idea.summary) + '</p>' +
                '<div class="idea-card-footer">' + tagsHtml + '</div>' +
                '</div>' +
                '</a>'
            );
        }).join('');
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        var parts = dateStr.split('-');
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(parts[1], 10) - 1] + ' ' + parseInt(parts[2], 10) + ', ' + parts[0];
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
