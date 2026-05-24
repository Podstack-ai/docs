/**
 * COLOR PREFERENCE MODULE (assets/js/color-preference.js)
 * PURPOSE: Manages dark/light theme switching and persistence
 * 
 * FEATURES:
 * - Detects system color scheme preference
 * - Persists user selection in localStorage
 * - Syncs theme across all pages
 * - Updates HTML data-color attribute
 * - Handles all theme toggle buttons in header and footer
 * 
 * HOW IT WORKS:
 * 1. Gets saved preference from localStorage or system default
 * 2. Sets data-color attribute on <html> element
 * 3. CSS uses [data-color="dark"]/[data-color="light"] selectors
 * 4. Toggle buttons switch between themes
 * 5. Choice is saved to localStorage for next visit
 * 
 * THEME COLORS:
 * - Light mode: White background, dark text
 * - Dark mode: Dark background, light text
 * 
 * RELATED:
 * - css/theme.css: CSS custom properties for both themes
 * - Buttons: .theme-toggle, .theme-toggle-header
 */
(function () {
    'use strict';

    // Docs site is dark-only to match blog.podstack.ai.
    // Light mode + theme switching disabled.
    const lsKeyColorPreference = 'color-preference'
    localStorage.setItem(lsKeyColorPreference, 'dark')
    document.firstElementChild.setAttribute('data-color', 'dark')
})();