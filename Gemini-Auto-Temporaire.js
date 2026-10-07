// ==UserScript==
// @name         Auto-switch Gemini Temp Chat
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Clique automatiquement sur l'icône du chat temporaire Gemini
// @match        https://gemini.google.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/didungar/tampermonkey-scripts/refs/heads/master/Gemini-Auto-Temporaire.js
// @downloadURL  https://raw.githubusercontent.com/didungar/tampermonkey-scripts/refs/heads/master/Gemini-Auto-Temporaire.js
// ==/UserScript==

(function() {
    'use strict';

    const SELECTOR = 'mat-icon[data-mat-icon-name="gemini_chat_temp"]';

    function autoClickTempChat() {
        const icon = document.querySelector(SELECTOR);
        if (icon) {
            // Cherche le bouton cliquable parent si l'icône seule ne prend pas le clic
            const button = icon.closest('button, [role="button"]') || icon;
            button.click();
            return true;
        }
        return false;
    }

    // Essai immédiat au chargement
    if (!autoClickTempChat()) {
        // Détection dynamique si l'élément est injecté plus tard
        const observer = new MutationObserver((_, obs) => {
            if (autoClickTempChat()) {
                obs.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
