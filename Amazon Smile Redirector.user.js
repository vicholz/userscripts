// ==UserScript==
// @name         Amazon Smile Redirector
// @version      0.1
// @description  Redirects cart and checkout to smile.amazon.com.
// @author       Victor Holz
// @match        https://www.amazon.com/gp/cart/view.html*
// @match        https://www.amazon.com/gp/buy/spc/handlers/display.html*
// @icon         https://www.google.com/s2/favicons?domain=amazon.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (location.hostname === "www.amazon.com"){
        console.log("Redirecting to https://smile.amazon.com...");
        let path = location.href.split("https://www.amazon.com/")[1];
        location.replace(`https://smile.amazon.com/${path}`);
    }
})();