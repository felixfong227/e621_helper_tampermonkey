// ==UserScript==
// @name         e621.net Helper
// @namespace    RainbowTheDashie
// @version      1.1.2
// @description  Little util script to help make e621.net a much better place then it already is :P
// @author       RainbowTheDashie
// @match        https://e621.net/post/*
// @match        http://e621.net/post/*
// @match        https://e621.net/post
// @match        http://e621.net/post
// @run-at       document-end
//
// @updateURL    https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master/index.user.js
// @downloadURL  https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master/index.user.js
// @supportURL   https://github.com/felixfong227/e621_helper_tampermonkey/issues
//
// @require      https://cdnjs.cloudflare.com/ajax/libs/bodymovin/4.4.27/bodymovin.min.js
// @require      https://unpkg.com/tocca@2.0.4/Tocca.min.js
//
// @require      https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master/src/Utils.js
// @require      https://raw.githubusercontent.com/felixfong227/e621_helper_tampermonkey/master/src/Effects.js
//
// 
// ==/UserScript==


window.tocca({
    useJquery: false,
    dbltapThreshold: 500,
});

'use strict';
var APP_NAME_SPACE = 'ext_e621_helper';
// credit: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function errLocateEl(elID) {
    if(!elID) throw new Error('Missing argument elID');
    console.error('[E621 Helper] Fail to locate ' + elID +' element');
}
function nameSpaceFormat(name) {
    return APP_NAME_SPACE + "_" + name;
}
function saveOption(opt) {
    if(!opt) throw new Error('No option object are given');
    if(typeof opt !== 'object') throw new Error('Argument opt must be typeof object');
    window.localStorage.settItem( nameSpaceFormat('options'), JSON.stringify(opt));
}
function getOption() {
    var optStr = window.localStorage.getItem( nameSpaceFormat('options') );
    // Return a JSON object
    if(optStr) return JSON.parse(optStr);
    // Return null
    return optStr;
}

// All case handlers

// Post handlers

function handler_post_imgOnClickNewScreen(event) {
    var target = event.target;
    if(target.tagName === 'IMG') {
        var pageURL = target.parentElement.href;
        // Users is indeed clicking on an image element OwO
        window.open(pageURL);
        return event.preventDefault();
    }
}

function favClick(el) {
    el.querySelector('a').click();
}

var previewButton = document.querySelector('input[type=button][value=Preview]');
var postCommentBox = document.querySelector('textarea[id^=reply-text]');

var livePreviewButtonPress = debounce(function() {
    if(previewButton) previewButton.click();
}, 500);

let cache_beforeFocusWidth = null;

function likeThisPost() {
    // Fav/unfavorite that post

    // Check if this page support fav and unfav action
    var favButtons = [document.querySelector('#add-to-favs'), document.querySelector('#remove-from-favs')];
    var favAble = favButtons[0] !== null && favButtons[1] !== null;
    if(favAble) {
        // This page does support "favorite" action
        // Check if this post fav's status
        var isUnFav = favButtons[1].style.display === 'none';
        isUnFav === true ? favClick(favButtons[0]) : favClick(favButtons[1]);
        isUnFav = !isUnFav;
    }
    return isUnFav;
}

var theImage = document.querySelector('#image');

// var options = {
//     openInNewTab: true,
//     autoPlayVid: true,
// };

// Add hotkey to the page
window.addEventListener('keydown', function(e) {

    var currentActiveElm = document.activeElement.tagName;

    if(currentActiveElm === 'INPUT' || currentActiveElm === 'TEXTAREA' || currentActiveElm.contentEditable == "true" || currentActiveElm.contentEditable === true) return 0;

    switch(e.key) {
        case 'f': {
            // Cancel action if either CTRL or CMD key are pressed as well
            if(event.ctrlKey || event.metaKey) return false;
            // Otherwise like the post
            likeThisPost();
            break;
        }
        case 'F': {
            // Toggle "Focus Mode"
            var elms = [
                // The website side bar
                document.querySelector('.sidebar'),
                // The comment session for this post
                document.querySelector('#comments'),
                // Website header
                document.querySelector('#header'),
                // The news banner
                document.querySelector('#news'),
                // Ads
                document.querySelector('#ad-leaderboard'),
                // All notifications
                document.querySelector('#notices'),
                // Pending notify bar
                document.querySelector('#pending-notice'),
            ];

            // NOTE: Video will soon be supported
            var editButton = document.querySelector('[name=edit]');
            if(editButton) {
                // Media bar and descriptions
                var mediaBar = editButton.previousElementSibling;
                elms.push(
                    mediaBar,
                    mediaBar.previousElementSibling,
                );
            }
            // Move the image to the the cetenr of the screen
            try {
                for(var index = 0; index < elms.length; index++) Utils.toggleDisplayNone(elms[index]);
                if(theImage) {
                    // Save the origin size for resotring the the normal look of the web page
                    if(cache_beforeFocusWidth === null) cache_beforeFocusWidth = theImage.width;
    
                    theImage.parentElement.style.width = theImage.parentElement.style.width === '100vw' ? 'auto' : '100vw';
                    theImage.style.left = theImage.style.left === '50%' ? 'auto' : '50%';
                    theImage.style.transform = theImage.style.transform == 'translateX(-50%)' ? 'none' : 'translateX(-50%)' ;
                    theImage.style.position = theImage.style.position === 'relative' ? 'initial' : 'relative';
                    theImage.style.width = theImage.style.width === '35%'  ? cache_beforeFocusWidth + 'px' : '35%';
                }
            } catch (err) {
                // Suppress any error message related to imssing element
                if(!err.message.startsWith('Cannot read property')) throw new Error(err);
            }
        }
    }
});

if(theImage) {
    // Tocca custom event
    theImage.addEventListener('dbltap', function() {
        // User has double the image, time to inst-like this pic :3
        var isUnFav = likeThisPost();
        Effects.instagramLike(theImage, !isUnFav);
    });

}

// Live preview for comment box
if(postCommentBox) postCommentBox.addEventListener('keydown', livePreviewButtonPress);

var quickEditEl = document.querySelector('#quick-edit');
if(quickEditEl) {
    var postsDiv = quickEditEl.nextSibling.nextSibling;
    return postsDiv ? postsDiv.addEventListener('click', handler_post_imgOnClickNewScreen) : errLocateEl('The Posts Container Element');
}