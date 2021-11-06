// ==UserScript==
// @name         Amazon Smile Redirector
// @version      0.2
// @description  Redirects cart and checkout to smile.amazon.com.
// @author       Victor Holz
// @downloadURL  https://github.com/vicholz/userscripts/raw/master/AmazonSmileRedirector.user.js
// @updateURL    https://github.com/vicholz/userscripts/raw/master/AmazonSmileRedirector.user.js
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// @run-at document-start
// @noframes
// ==/UserScript==

(function() {
    'use strict';

    var i = setInterval(function(){
        if (location.hostname === "www.amazon.com"){
            if (location.pathname.includes("/gp/buy/spc/handlers/display.html")){
                console.log("Redirecting to https://smile.amazon.com...");
                let path = location.href.split("https://www.amazon.com/")[1];
                location.replace(`https://smile.amazon.com/${path}`);
                clearInterval(i);
            }
        }
    },500);
})();
