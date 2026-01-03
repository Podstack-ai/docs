/**
 * Header Module - Handles all header interactions
 * PURPOSE: Manages header scroll effects, mobile menu, and search functionality
 * 
 * FEATURES:
 * - Adds scroll shadow effect to header when page scrolls
 * - Mobile menu toggle with overlay
 * - Real-time search with result previews
 * - Keyboard navigation in search results
 * - Theme toggle functionality
 */
(function () {
    'use strict';

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    // Adds 'scrolled' class to header when user scrolls down
    // Shows a subtle shadow beneath the header
    const header = document.getElementById('site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // MOBILE MENU FUNCTIONALITY
    // ============================================
    // Opens/closes mobile menu with overlay and prevents body scroll
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    /**
     * Opens the mobile menu overlay and drawer
     * Prevents body scrolling while menu is open
     */
    const openMobileMenu = () => {
        if (!mobileMenu || !mobileMenuOverlay) {
            return;
        }
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    /**
     * Closes the mobile menu and re-enables body scrolling
     */
    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenuOverlay) {
            return;
        }
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileMenuToggle?.addEventListener('click', openMobileMenu);
    mobileMenuClose?.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);

    // Close mobile menu on escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ============================================
    // SEARCH FUNCTIONALITY
    // ============================================
    // Client-side search across documentation pages
    // Fetches index.json and performs real-time fuzzy search
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchContainer = document.getElementById('search-container');
    let searchIndex = null;
    let searchTimeout = null;

    /**
     * Fetches and caches the search index from /index.json
     * @returns {Promise<Array>} Array of searchable pages with title, url, content, section, description
     */
    async function fetchSearchIndex() {
        if (searchIndex) return searchIndex;
        try {
            const response = await fetch('/index.json');
            searchIndex = await response.json();
            return searchIndex;
        } catch (error) {
            console.error('Failed to load search index:', error);
            return [];
        }
    }

    /**
     * Performs fuzzy search on the documentation index
     * Scores results based on matches in title, description, and content
     * Prioritizes title matches (100 pts), then description (30 pts), then content (10 pts)
     * 
     * @param {string} query - Search query string (minimum 2 characters)
     * @param {Array} index - Array of searchable pages from index.json
     * @returns {Array} Sorted array of matching pages (max 8 results), highest score first
     */
    function search(query, index) {
        if (!query || query.length < 2) return [];

        const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
        if (terms.length === 0) return [];

        const results = index
            .map(page => {
                let score = 0;
                const titleLower = (page.title || '').toLowerCase();
                const contentLower = (page.content || '').toLowerCase();
                const descLower = (page.description || '').toLowerCase();

                for (const term of terms) {
                    // Title match (highest weight)
                    if (titleLower.includes(term)) {
                        score += titleLower === term ? 100 : 50;
                    }
                    // Description match
                    if (descLower.includes(term)) {
                        score += 30;
                    }
                    // Content match
                    if (contentLower.includes(term)) {
                        score += 10;
                    }
                }

                return { ...page, score };
            })
            .filter(page => page.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 8);

        return results;
    }

    /**
     * Wraps search query terms in <mark> tags for visual highlighting
     * Case-insensitive matching, splits query into individual terms
     * 
     * @param {string} text - Text to highlight
     * @param {string} query - Search query with terms to highlight
     * @returns {string} HTML string with matching terms wrapped in <mark> tags
     */
    function highlightText(text, query) {
        if (!text || !query) return text;
        const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 1);
        let highlighted = text;
        for (const term of terms) {
            const regex = new RegExp(`(${term})`, 'gi');
            highlighted = highlighted.replace(regex, '<mark>$1</mark>');
        }
        return highlighted;
    }

    /**
     * Renders search results as clickable items in dropdown
     * Shows result title with highlights and section name
     * Displays "No results found" message if array is empty
     * 
     * @param {Array} results - Array of search result objects with title, url, section
     * @param {string} query - Original search query (used for highlighting)
     */
    function renderResults(results, query) {
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    No results found for "${query}"
                </div>
            `;
            searchResults.classList.add('active');
            return;
        }

        const html = results.map(result => `
            <a href="${result.url}" class="search-result-item">
                <div class="search-result-title">${highlightText(result.title, query)}</div>
                ${result.section ? `<div class="search-result-section">${result.section}</div>` : ''}
            </a>
        `).join('');

        searchResults.innerHTML = html;
        searchResults.classList.add('active');
    }

    /**
     * Hides the search results dropdown and clears its content
     * Removes 'active' class to hide the dropdown visually
     */
    function clearResults() {
        if (searchResults) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
        }
    }

    /**
     * Main search handler - triggered on user input
     * Validates query length (minimum 2 chars), fetches index, and renders results
     * Called with 200ms debounce to avoid excessive searching
     */
    async function handleSearch() {
        const query = searchInput?.value?.trim();

        if (!query || query.length < 2) {
            clearResults();
            return;
        }

        const index = await fetchSearchIndex();
        const results = search(query, index);
        renderResults(results, query);
    }

    /**
     * Event Listeners for Search Input
     * - 'input': Debounced search on each keystroke (200ms delay)
     * - 'focus': Shows previous results when input is focused
     * - 'keydown': Escape closes dropdown, ArrowDown navigates to first result
     */
    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(handleSearch, 200);
    });

    searchInput?.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) {
            handleSearch();
        }
    });

    /**
     * Closes search results when user clicks outside the search container
     * Allows users to dismiss dropdown by clicking elsewhere on page
     */
    document.addEventListener('click', (event) => {
        if (searchContainer && !searchContainer.contains(event.target)) {
            clearResults();
        }
    });

    /**
     * Keyboard Navigation in Search Input
     * - ArrowDown: Move focus to first search result
     * - Escape: Close results and unfocus input
     */
    searchInput?.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            clearResults();
            searchInput.blur();
        }

        if (event.key === 'ArrowDown' && searchResults?.classList.contains('active')) {
            event.preventDefault();
            const firstResult = searchResults.querySelector('.search-result-item');
            firstResult?.focus();
        }
    });

    /**
     * Keyboard Navigation in Search Results Dropdown
     * - ArrowDown: Move focus to next result item
     * - ArrowUp: Move to previous result or back to input field
     * - Escape: Close results dropdown and refocus input
     * - Enter: Navigate to selected result (default link behavior)
     */
    searchResults?.addEventListener('keydown', (event) => {
        const items = searchResults.querySelectorAll('.search-result-item');
        const currentIndex = Array.from(items).indexOf(document.activeElement);

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = Math.min(currentIndex + 1, items.length - 1);
            items[nextIndex]?.focus();
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (currentIndex <= 0) {
                searchInput?.focus();
            } else {
                items[currentIndex - 1]?.focus();
            }
        }

        if (event.key === 'Escape') {
            clearResults();
            searchInput?.focus();
        }
    });
})();
