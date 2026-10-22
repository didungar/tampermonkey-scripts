// ==UserScript==
// @name         ChatGPT - Nettoyage Bibliothèque
// @namespace    local.chatgpt.library
// @version      2.0
// @description  Sélectionne les fichiers visibles de la Bibliothèque
// @match        https://chatgpt.com/*
// @run-at       document-idle
// @grant        none
 // ==/UserScript==

 (() => {
   'use strict';

   if (window.top !== window.self) return;

   const ID = 'tm-library-select-all';

   function install() {
     if (!document.body || document.getElementById(ID)) return;

     const btn = document.createElement('button');
     btn.id = ID;
     btn.textContent = 'Sélectionner tous les fichiers visibles';

     Object.assign(btn.style, {
       position: 'fixed',
       bottom: '20px',
       right: '20px',
       zIndex: '999999',
       padding: '12px 16px',
       background: '#b42318',
       color: '#fff',
       border: '0',
       borderRadius: '10px',
       cursor: 'pointer',
       fontSize: '14px',
       boxShadow: '0 2px 10px #0004'
     });

     btn.addEventListener('click', () => {
       const items = [
         ...document.querySelectorAll('[data-library-item]')
       ];

       const cases = items
         .map(item => item.querySelector(
           'button[role="checkbox"][aria-label^="Sélectionner"]'
         ))
         .filter(Boolean);

       if (!items.length || !cases.length) {
         alert(
           'Aucun fichier détecté. Ouvre la Bibliothèque ChatGPT ' +
           'et vérifie que les fichiers sont affichés.'
         );
         return;
       }

       let selected = 0;

       for (const checkbox of cases) {
         if (checkbox.getAttribute('aria-checked') !== 'true') {
           checkbox.click();
           selected++;
         }
       }

       console.log({
         fichiersVisibles: items.length,
         casesDetectees: cases.length,
         clicsEffectues: selected
       });

       alert(
         `${items.length} fichier(s) visible(s), ` +
         `${selected} sélection(s) demandée(s).\n\n` +
         'Vérifie la sélection et cherche une action de suppression ' +
         'dans la barre d’outils de ChatGPT.'
       );
     });

     document.body.appendChild(btn);
   }

   install();

   new MutationObserver(install).observe(
     document.documentElement,
     { childList: true, subtree: true }
   );
 })();
