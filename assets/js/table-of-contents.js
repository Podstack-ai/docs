/**
 * TABLE OF CONTENTS MODULE (assets/js/table-of-contents.js)
 * PURPOSE: Auto-highlights TOC links based on scroll position
 * 
 * FEATURES:
 * - Uses IntersectionObserver API for performance
 * - Highlights active heading as user scrolls
 * - Smooth scroll to headings (handled by CSS scroll-behavior)
 * - Accounts for fixed header offset (80px rootMargin)
 * - Updates active link classes in real-time
 * 
 * HOW IT WORKS:
 * 1. Gets all links from #TableOfContents
 * 2. Creates a map of heading IDs to their links
 * 3. Observes heading elements for visibility
 * 4. When a heading enters viewport, highlights its TOC link
 * 5. Removes highlight from previous link
 * 
 * APPLIES TO:
 * - Right sidebar on doc pages
 * - Auto-generated from page headings
 * 
 * PERFORMANCE:
 * - IntersectionObserver is more performant than scroll event
 * - Falls back gracefully on older browsers
 */

if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', function () {
        const links = document.querySelectorAll('#TableOfContents a');
        let activeLink = null;
        const linksById = {};

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (activeLink) {
                        activeLink.classList.remove('active');
                    }

                    activeLink = linksById[entry.target.id];
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, { rootMargin: `0% 0% -80% 0%` });

        links.forEach(link => {
            const id = link.getAttribute('href') ? link.getAttribute('href').slice(1) : null; // Checking if href exists before slicing #
            if (id) {
                const target = document.getElementById(id);
                if (target) {
                    linksById[id] = link;
                    observer.observe(target);
                }
            }

            link.addEventListener('click', function () {
                if (body.classList.contains('model-open')) {
                    mainAsideCloseButton.click()
                }
            });
        });
    });
}