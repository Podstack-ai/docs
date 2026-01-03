(function () {
    'use strict';

    // Initialize sidebar functionality
    function initSidebar() {
        const sidebar = document.querySelector('.sidebar-docker');

        if (!sidebar) {
            return;
        }

        // Handle section toggle buttons (supports recursive nesting)
        initSectionToggles();

        // Handle mobile menu
        initMobileMenu();

        // Scroll active item into view
        scrollActiveIntoView();
    }

    // Initialize collapsible sections - supports unlimited nesting levels
    function initSectionToggles() {
        const toggleButtons = document.querySelectorAll('.nav-section__toggle');

        toggleButtons.forEach((button) => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling to parent sections

                const section = this.closest('.nav-section');
                // Get only the direct child items container, not nested ones
                const items = section.querySelector(':scope > .nav-section__items');
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                // Toggle expanded state
                this.setAttribute('aria-expanded', String(!isExpanded));

                if (isExpanded) {
                    items.classList.remove('expanded');
                } else {
                    items.classList.add('expanded');
                }
            });
        });

        // Handle section link clicks - expand section when navigating
        const sectionLinks = document.querySelectorAll('.nav-section__link');
        sectionLinks.forEach((link) => {
            link.addEventListener('click', function (e) {
                // Don't prevent default - let navigation happen
                e.stopPropagation();

                const section = this.closest('.nav-section');
                const toggle = section.querySelector(':scope > .nav-section__header > .nav-section__toggle');
                const items = section.querySelector(':scope > .nav-section__items');

                // Expand the section when clicking the link
                if (toggle && items) {
                    toggle.setAttribute('aria-expanded', 'true');
                    items.classList.add('expanded');
                }
            });
        });
    }

    // Initialize mobile menu functionality
    function initMobileMenu() {
        const sidebar = document.querySelector('.sidebar-docker');
        const closeBtn = document.querySelector('.sidebar-close');
        const backdrop = document.querySelector('.sidebar-backdrop');
        const menuToggle = document.querySelector('.header-menu-toggle');

        // Close sidebar
        function closeSidebar() {
            sidebar?.classList.remove('open');
        }

        // Open sidebar
        function openSidebar() {
            sidebar?.classList.add('open');
        }

        // Event listeners
        closeBtn?.addEventListener('click', closeSidebar);
        backdrop?.addEventListener('click', closeSidebar);
        menuToggle?.addEventListener('click', openSidebar);

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    // Scroll active item into view
    function scrollActiveIntoView() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            setTimeout(() => {
                activeLink.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSidebar);
    } else {
        initSidebar();
    }
})();