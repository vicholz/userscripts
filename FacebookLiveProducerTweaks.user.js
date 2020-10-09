// ==UserScript==
// @name         FacebookLiveProducerTweaks
// @version      0.3
// @description  Various Facebook Live Producer Tweaks
// @author       Victor Holz
// @include      /^.*?facebook.com\/live\/producer\/.*
// @downloadURL  https://github.com/vicholz/userscripts/raw/master/FacebookLiveProducerTweaks.user.js
// @updateURL    https://github.com/vicholz/userscripts/raw/master/FacebookLiveProducerTweaks.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function getElementsByText(str, tag = 'a') {
        return Array.prototype.slice.call(document.getElementsByTagName(tag)).filter(el => el.textContent.trim() === str.trim());
    }

    function getElementsByAttrib(pe, tag, attrib, value) {
        return Array.prototype.slice.call(pe.getElementsByTagName(tag)).filter(function (el){
            if (el.getAttribute(attrib) && el.getAttribute(attrib).trim() === value.trim()) {
                return el;
            } else {
                return false;
            }
        });
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
            // Hides 'Share to Groups' box.
            let box_label = getElementsByText("Share to Groups", "span")[0];
            let box_label_parent = box_label.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
            let box_close = getElementsByAttrib(box_label_parent, "div", "role", "button")[2];
            box_close.click();
            clearInterval(waitForLoad);
        } catch (e) {
            console.log("Not ready");
            console.log(e);
        }
    }, 500);
})();
