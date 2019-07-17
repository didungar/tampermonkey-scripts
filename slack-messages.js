// ==UserScript==
// @name         slack.com/messages
// @namespace    http://tampermonkey.net/
// @version      1.0.0.0
// @description  For write correctly into slack chat
// @author       Didier Ungar
// @match        https://*.slack.com/messages/*
// @match        https://app.slack.com/client/*/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/didungar/tampermonkey-scripts/master/slack-messages.js
// @updateURL    https://raw.githubusercontent.com/didungar/tampermonkey-scripts/master/slack-messages.js
// @require      http://didungar.com/fonctions_correct.js
// ==/UserScript==

timestamp = Date.now();
lang = 'fr';

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
  var textIni = $('#msg_input .ql-editor p').html().trim();
  var textEnd = make_correct(textIni);
  console.log('didungar correct => textIni');
  console.log(textIni);
  console.log('didungar correct => textEnd');
  console.log(textEnd);
  if (textIni == textEnd) {
    $('#footer_msgs').css('background-color', 'white');
  } else {
    $('#footer_msgs').css('background-color', 'red');
    if (timestamp > now - 2000) {
      return;
    }
    console.log('didungar correct => auto update');
    $('#msg_input .ql-editor p').html(textEnd);
    $('#msg_input .ql-editor p').focus();
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