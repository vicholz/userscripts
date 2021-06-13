// ==UserScript==
// @name         Meet Controls Toggle
// @version      0.3
// @description  Use TM context menu or 'ESC' button to hide/show Meet controls for cleaner video when trying to capture in OBS.
// @author       Victor Holz
// @downloadURL  https://github.com/vicholz/userscripts/raw/master/MeetControlsToggle.user.js
// @updateURL    https://github.com/vicholz/userscripts/raw/master/MeetControlsToggle.user.js
// @match        https://meet.google.com/*
// @icon         https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-64dp/logo_meet_2020q4_color_1x_web_64dp.png
// @run-at       document-end
// @grant        GM.registerMenuCommand
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

    function toggleControls(){
        let elements = [
            //document.querySelector('div[aria-label*="Leave call"]') ? document.querySelector('div[aria-label*="Leave call"]').parentNode.parentNode.parentNode : null,
            document.querySelector('button[aria-label*="Leave call"]') ? document.querySelector('button[aria-label*="Leave call"]').parentNode.parentNode.parentNode.parentNode.parentNode : null,
            document.querySelector('div[aria-label*="Show everyone"]') ? document.querySelector('div[aria-label*="Show everyone"]').parentNode.parentNode.parentNode.parentNode : null,
            //document.querySelectorAll('div[data-self-name*="You"]') ? document.querySelectorAll('div[data-self-name*="You"]')[2].parentNode.parentNode : null,
            //document.querySelectorAll('div[data-self-name*="You"]') ? document.querySelectorAll('div[data-self-name*="You"]')[0].parentNode : null,
            document.querySelectorAll('div[data-self-name*="You"]') ? document.querySelectorAll('div[data-self-name*="You"]')[1].parentNode.parentNode : null,
            document.querySelector('div[data-icon-type*="4"]') ? document.querySelector('div[data-icon-type*="4"]').parentNode.parentNode.parentNode : null,
            document.querySelector('div[aria-label*="Pin yourself to your main screen."]') ? document.querySelector('div[aria-label*="Pin yourself to your main screen."]').parentNode.parentNode.parentNode.parentNode.parentNode : null,
            document.evaluate("//i[contains(., 'present_to_all')]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
        ];
        console.log("Toggling element(s) visibility...");
        if (window.elementsVisible){
            window.elementsVisible = false;
            hideElements(elements);
        } else {
            window.elementsVisible = true;
            showElements(elements);
        }
    }

    window.elementsVisible = true;
    let i = setInterval(function(){
        console.log("Looking for controls....");
        try {
            let foundElement = false;
            let waitForElements = [
                document.querySelector('div[aria-label*="Leave call"]'),
                document.querySelector('button[aria-label*="Leave call"]')
            ];
            waitForElements.forEach(function(e){
                if (e !== undefined && e !== null) {
                    foundElement = true;
                }
            });
            if (!foundElement) {
                throw "Controls not found! Will try again...";
            } else {
                console.log("Found controls.");
            }
            console.log("Looking for video element...");
            let video = document.querySelectorAll("video")[1];
            if (!video){
                video = document.querySelectorAll("video")[0];
            }
            if (!video){
                throw "Could not find video element! Will try again...";
            }
            console.log("Found video element.");

            console.log("Adding context menu item...");
            GM.registerMenuCommand("Toggle Meet Controls", toggleControls);
            
            console.log("Adding event listener...");
            window.addEventListener('DOMContentLoaded', function() {
                document.addEventListener("keypress", function(e) {
                    console.log("Detected keypress...");
                    if (e.keyCode === 27){
                        console.log("Toggling element(s) visibility...");
                        toggleControls();
                    }
                }, false);
            }, false);
            
            clearInterval(i);
        } catch(e) {
            console.error("Could not find video element. Will retry...");
            console.error(e);
        }
    }, 500);
})();
