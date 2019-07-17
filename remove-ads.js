// ==UserScript==
// @name         Remove Ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Didier Ungar
// @match        https://*/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/didungar/tampermonkey-scripts/master/remove-ads.js
// @updateURL    https://raw.githubusercontent.com/didungar/tampermonkey-scripts/master/remove-ads.js
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @require      http://api.list.dev-performance.com/tag-ads.array
// ==/UserScript==

( function() {
    'use strict';

    $( 'a' ).each( function( index ) {
        if ( 'string' !== typeof $( this ).attr( 'href' ) ) return;

        for ( var i = 0; i < tag_ads.length; i++ ) {
            var regex = new RegExp( tag_ads[i] );
            if ( $( this ).attr( 'href' ).match( regex ) ) {
                console.log( index + ": " + $( this ).attr( 'href' ) + ' => remove (' + regex + ')' );
                $( this ).remove();
            }
        }
    } );
} )();
