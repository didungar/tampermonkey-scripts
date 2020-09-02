// ==UserScript==
// @name         SMS Helper
// @namespace    https://messages.google.com/web
// @version      1.0.0.0
// @description  For write correctly into google messages.
// @author       Didier Ungar
// @match        https://messages.google.com/web/conversations/*
// @grant        none
// @require      http://didungar.com/fonctions_correct.js
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

timestamp = Date.now();
lang = 'fr';
let inputDom = '.input-row textarea';

function writing() {
  console.log('timestamp ini');
  console.log(timestamp);
  timestamp = Date.now();
  console.log('timestamp end');
  console.log(timestamp);
}
function correct() {
  now = Date.now();
  console.log('didungar correct');
  console.log(timestamp - (now - 2000));
  var textIni = $(inputDom).val().trim();
  var textEnd = make_correct(textIni);
  console.log('didungar correct => textIni');
  console.log(textIni);
  console.log('didungar correct => textEnd');
  console.log(textEnd);
  if (textIni == textEnd) {
    $('.compose-container').css('background-color', 'white');
  } else {
    $('.compose-container').css('background-color', 'red');
    if (timestamp > now - 2000) {
      return;
    }
    console.log('didungar correct => auto update');
    $(inputDom).val(textEnd);
    $(inputDom).focus();
  }
}
(function() {
  'use strict';

  setInterval(function() { correct(); }, 500);
  window.onkeyup = function(e) { writing() }
  window.onkeydown = function(e) { writing() }
  setInterval(function() {
    if ($('.display_memberId').html()) {
      return;
    }
    var memberId = $('.member_name.internal_im_link').data('memberId');
    if (!memberId) {
      return;
    }
    $('.member_name.internal_im_link').each(function(index) {
      $('.member_name_and_presence')
          .append('<span class="display_memberId">' + memberId + '</span>')
    });
  }, 500);
  if ('fr-FR' == $('html').attr('lang')) {
    lang = 'fr';
  }
})();
