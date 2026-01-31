/**
 * CODE COPY BUTTON (assets/js/code-copy.js)
 * PURPOSE: Adds a copy-to-clipboard button on code blocks
 *
 * TARGETS:
 * - .highlight (Hugo/Chroma syntax-highlighted blocks)
 * - pre:not(.chroma) (plain fenced code blocks)
 *
 * BEHAVIOUR:
 * - Button appears top-right on hover
 * - Copies code text (without line numbers) to clipboard
 * - Shows "Copied!" feedback for 2 seconds
 */
(function () {
    'use strict';

    var SVG_COPY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    var SVG_CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    function getCodeText(block) {
        // For Chroma with line number tables, only grab the code column
        var codeTable = block.querySelector('.lntd:last-child code');
        if (codeTable) return codeTable.textContent;

        // For Chroma without table, or plain pre blocks
        var code = block.querySelector('code');
        if (code) return code.textContent;

        return block.textContent;
    }

    function createButton() {
        var btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML = SVG_COPY;
        return btn;
    }

    function handleClick(btn, block) {
        var text = getCodeText(block);
        navigator.clipboard.writeText(text).then(function () {
            btn.innerHTML = SVG_CHECK;
            btn.classList.add('copied');
            setTimeout(function () {
                btn.innerHTML = SVG_COPY;
                btn.classList.remove('copied');
            }, 2000);
        });
    }

    function init() {
        // Chroma highlight blocks
        var highlights = document.querySelectorAll('#article-body .highlight');
        highlights.forEach(function (block) {
            var btn = createButton();
            block.style.position = 'relative';
            block.appendChild(btn);
            btn.addEventListener('click', function () { handleClick(btn, block); });
        });

        // Plain pre blocks (not inside .highlight)
        var pres = document.querySelectorAll('#article-body pre:not(.chroma)');
        pres.forEach(function (pre) {
            if (pre.closest('.highlight')) return;
            var wrapper = pre.parentNode;
            // Wrap in a relative container if not already
            if (!wrapper.classList.contains('code-block-wrapper')) {
                var div = document.createElement('div');
                div.className = 'code-block-wrapper';
                div.style.position = 'relative';
                pre.parentNode.insertBefore(div, pre);
                div.appendChild(pre);
                wrapper = div;
            }
            var btn = createButton();
            wrapper.appendChild(btn);
            btn.addEventListener('click', function () { handleClick(btn, pre); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
