/**
 * OFF-CANVAS MODULE (assets/js/off-canvas.js)
 * PURPOSE: Handles opening/closing of right TOC drawer on mobile
 * 
 * FEATURES:
 * - Opens table of contents as side drawer
 * - Dark overlay that closes on click
 * - Prevents body scroll while drawer is open
 * - Smooth slide-in animation
 * - Close button inside drawer
 * - Click outside to close
 * 
 * USES:
 * - Only on mobile/tablet (main TOC hidden on desktop)
 * - Right side of screen
 * - Dark overlay #body-model-outer
 * 
 * ELEMENTS:
 * - #aside-wrapper: TOC drawer container
 * - asideWrapperOpenButton: Button to open drawer
 * - asideWrapperCloseButton: Close button inside drawer
 * - #body-model-outer: Click overlay to close
 * 
 * ANIMATIONS:
 * - .open class adds slide-in transform
 * - body.model-open prevents scrolling
 */
(function () {
    'use strict';

    const body = document.body;
    const bodyModelOuter = document.querySelector('#body-model-outer')

    const asideWrapper = document.querySelector('#aside-wrapper')
    const asideWrapperOpenButton = document.querySelector('main > article > nav > button:first-child')
    const asideWrapperCloseButton = document.querySelector('#aside-wrapper > aside > div .btn')

    if (asideWrapper && asideWrapperOpenButton) {
        asideWrapperOpenButton.addEventListener('click', function () {
            body.classList.add('model-open')
            bodyModelOuter.style.display = 'block'
            asideWrapper.classList.add('open')

            asideWrapperCloseButton.addEventListener('click', function () {
                body.classList.remove('model-open')
                bodyModelOuter.style.display = 'none'
                asideWrapper.classList.remove('open')
            });

            bodyModelOuter.addEventListener('click', function () {
                body.classList.remove('model-open')
                bodyModelOuter.style.display = 'none'
                asideWrapper.classList.remove('open')
            });
        });
    }

    const mainAside = document.querySelector('main > aside')
    const mainAsideOpenButton = document.querySelector('main > article > nav > button:last-child')
    const mainAsideCloseButton = document.querySelector('main > aside > div > .btn')

    if (mainAside && mainAsideOpenButton) {
        mainAsideOpenButton.addEventListener('click', function () {
            body.classList.add('model-open')
            bodyModelOuter.style.display = 'block'
            mainAside.classList.add('open')

            mainAsideCloseButton.addEventListener('click', function () {
                body.classList.remove('model-open')
                bodyModelOuter.style.display = 'none'
                mainAside.classList.remove('open')
            });

            bodyModelOuter.addEventListener('click', function () {
                body.classList.remove('model-open')
                bodyModelOuter.style.display = 'none'
                mainAside.classList.remove('open')
            });
        });
    }

    window.addEventListener('resize', function (event) {
        if (body.classList.contains('model-open')) {
            body.classList.remove('model-open')
            bodyModelOuter.style.display = 'none'

            if (mainAside?.classList.contains('open')) {
                mainAside.classList.remove('open')
            }

            if (asideWrapper?.classList.contains('open')) {
                asideWrapper.classList.remove('open')
            }
        }
    });

    const asideWrapperSiteLogo = document.querySelector('#aside-wrapper .site-logo')
    const asideWrapperAsideNav = document.querySelector('#aside-wrapper > aside > nav')

    const adjustAsideWrapperAsideNavHeight = function () {
        // Only run if elements exist
        if (!asideWrapperSiteLogo || !asideWrapperAsideNav) {
            return;
        }

        if (window.innerWidth > 900) {
            asideWrapperAsideNav.style.height = `${window.innerHeight - 1 - asideWrapperSiteLogo.getBoundingClientRect().height}px`
        } else {
            asideWrapperAsideNav.style.height = ''
        }
    }

    if (asideWrapperSiteLogo && asideWrapperAsideNav) {
        adjustAsideWrapperAsideNavHeight()
        window.addEventListener('resize', function (event) {
            adjustAsideWrapperAsideNavHeight();
        })
    }
})();
