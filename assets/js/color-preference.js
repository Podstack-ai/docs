/**
 * COLOR PREFERENCE
 * The podstack.ai site is light. Docs default to that light theme.
 * A header control switches to the console's dark navy and remembers the choice.
 * The storage key is separate from the old forced-dark preference.
 */
(function () {
    'use strict';

    var key = 'podstack-color';
    var root = document.documentElement;
    var stored = localStorage.getItem(key);
    var pref = stored === 'dark' || stored === 'light' ? stored : 'light';
    root.setAttribute('data-color', pref);

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-theme-toggle]');
        if (!button) return;
        var next = root.getAttribute('data-color') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-color', next);
        localStorage.setItem(key, next);
        button.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    });
})();
