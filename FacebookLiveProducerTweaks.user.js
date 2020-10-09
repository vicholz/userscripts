// ==UserScript==
// @name         FacebookLiveProducerTweaks
// @version      0.1
// @description  Various Facebook Live Producer Tweaks
// @author       Victor Holz
// @include      /^.*?facebook.com\/live\/producer\/.*?\/.*
// @downloadURL  https://github.com/vicholz/userscripts/blob/master/FacebookLiveProducerTweaks.user.js
// @updateURL    https://github.com/vicholz/userscripts/blob/master/FacebookLiveProducerTweaks.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function getElementsByText(str, tag = 'a') {
        return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
    }

    let waitForLoad = setInterval(function(){
        try {
            // Keeps 'Use a Persistent Stream Key' checked.
            let label = getElementsByText("Use a Persistent Stream Key", "span")[0];
            let parent = label.parentNode.parentNode.parentNode.parentNode.parentNode;
            let persistentKeyCheckBox = parent.querySelector("input");
            if (persistentKeyCheckBox.getAttribute("aria-checked") === "false"){
                persistentKeyCheckBox.click();
            }
            clearInterval(waitForLoad);
        } catch (e) {
            console.log("Not ready");
            console.log(e);
        }
    }, 500);
})();
