// ==UserScript==
// @name         Meet Controls Toggle
// @version      0.1
// @description  Use 'ESC' button to hide/show Meet controls for cleaner video when trying to capture in OBS.
// @author       Victor Holz
// @downloadURL  https://github.com/vicholz/userscripts/raw/master/MeetControlsToggle.user.js
// @updateURL    https://github.com/vicholz/userscripts/raw/master/MeetControlsToggle.user.js
// @match        https://meet.google.com/*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideElements(elements){
        if (elements instanceof Array){
            elements.forEach(function (e){
                try {
                    e.style.display = "none";
                } catch(e) {
                    console.error("Could not change style for element");
                    console.error(e);
                }
            });
        } else {
            elements.style.display = "none";
        }
    }

    function showElements(elements){
        if (elements instanceof Array){
            elements.forEach(function (e){
                try {
                    e.style.display = "";
                } catch(e) {
                    console.error("Could not change style for element");
                    console.error(e);
                }
            });
        } else {
            elements.style.display = "";
        }
    }

    window.elementsVisible = true;
    let i = setInterval(function(){
        try {
            let video = document.querySelectorAll("video")[1];
            //let video = document.querySelector('div[data-layout*="roi-crop"]')
            document.addEventListener("keyup", function(e){
                let elements = [
                    document.querySelector('div[aria-label*="Leave call"]').parentNode.parentNode.parentNode,
                    document.querySelector('div[aria-label*="Show everyone"]').parentNode.parentNode.parentNode.parentNode,
                    document.querySelectorAll('div[data-self-name*="You"]')[2].parentNode.parentNode
                ];
                if (e.keyCode === 27){
                    console.log("Toggling element(s) visibility...");
                    if (window.elementsVisible){
                        window.elementsVisible = false;
                        hideElements(elements);
                    } else {
                        window.elementsVisible = true;
                        showElements(elements);
                    }
                }
            });
            clearInterval(i);
        } catch(e) {
            console.error("Could not find video element. Will retry...");
            console.error(e);
        }
    }, 500);
})();
