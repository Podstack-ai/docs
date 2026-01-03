(function () {
    'use strict';

    // Header scroll effect
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

    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    const openMobileMenu = () => {
        if (!mobileMenu || !mobileMenuOverlay) {
            return;
        }
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

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

    // Search functionality placeholder
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');

    searchButton?.addEventListener('click', () => {
        if (searchInput && searchInput.value.trim()) {
            console.log('Search for:', searchInput.value);
        }
    });

    searchInput?.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && searchInput.value.trim()) {
            console.log('Search for:', searchInput.value);
        }
    });
})();
