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

    const lsKeyColorPreference = 'color-preference'

    /**
     * Gets the current color preference
     * Returns: saved preference, or system preference, or default
     */
    const getColorPreference = () => {
        let lastUsedColorPreference = localStorage.getItem(lsKeyColorPreference)
        if (lastUsedColorPreference !== null)
            return lastUsedColorPreference
        else
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    let colorPreference = getColorPreference()
    localStorage.setItem(lsKeyColorPreference, colorPreference)
    document.firstElementChild.setAttribute('data-color', colorPreference)

    // Select all theme toggle buttons (in header and footer)
    const colorPreferenceButtons = document.querySelectorAll('.theme-toggle, .theme-toggle-header, #content-wrapper > footer > div:last-child > button:last-child, #content-wrapper > header > nav > button.theme-toggle, #content-wrapper > header > button.theme-toggle')
    colorPreferenceButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function () {
                if (colorPreference == 'dark') {
                    colorPreference = 'light'
                } else {
                    colorPreference = 'dark'
                }
                setColorPreference()
            });
        }
    });

    const setColorPreference = () => {
        localStorage.setItem(lsKeyColorPreference, colorPreference)
        document.firstElementChild.setAttribute('data-color', colorPreference)
    }

    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches: isDark }) => {
            colorPreference = isDark ? 'dark' : 'light'
            setColorPreference()
        })
})();