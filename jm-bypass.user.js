// ==UserScript==
// @name         Jm Userscript 
// @namespace    jm-bypass-userscript
// @version      1.3
// @description  Userscript made by Jm
// @author       jm
// @match        *://linkvertise.com/*
// @match        *://work.ink/*
// @match        *://workink.net/*
// @match        *://r.work.ink/*
// @match        *://*.*/s?*
// @match        *://keyrblx.com/*
// @match        *://mobile.codex.lol/*
// @match        *://pandadevelopment.net/getkey*
// @match        *://ads.luarmor.net/get_key*
// @match        https://plato-gateway-static.pages.dev/b
// @match        https://gateway.platoboost.com/cdn-cgi/trace?url=*
// @match        https://auth.platoboost.net/*
// @match        https://gateway.platoboost.com/a/*?id=*
// @match        https://gateway.platoboost.com/*
// @match        https://gateway.platoboost.com/a/2569?id=*
// @match        https://loot-link.com/s?*
// @match        https://loot-links.com/s?*
// @match        https://lootlink.org/s?*
// @match        https://lootlinks.co/s?*
// @match        https://lootdest.info/s?*
// @match        https://lootdest.org/s?*
// @match        https://lootdest.com/s?*
// @match        https://links-loot.com/s?*
// @match        https://linksloot.net/s?*
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_openInTab
// @connect      helya.pylex.xyz
// @homepageURL  https://discord.gg/S2U9rEaKc3
// @downloadURL  https://raw.githubusercontent.com/jm-packed/jm-userscript-/main/jm-bypass.user.js
// @updateURL    https://raw.githubusercontent.com/jm-packed/jm-userscript-/main/jm-bypass.user.js
// ==/UserScript==

(function() {
    'use strict';

    const apiUrl = 'http://helya.pylex.xyz:10234/api/addlink?url=';

    // Larger pop-up on the top-right
    const style = document.createElement('style');
    style.innerHTML = `
        #bypassPopup {
            position: fixed;
            top: 15px; /* Moved to the top */
            right: 15px; /* Positioned on the right */
            background: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 15px 20px; /* Increased padding (larger size) */
            border-radius: 10px;
            z-index: 999999;
            font-family: Arial, sans-serif;
            font-size: 14px; /* Larger font */
            pointer-events: none; /* Non-intrusive (no touch blocking) */
            opacity: 0;
            transition: opacity 0.5s;
        }
        #bypassPopup.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Create the pop-up
    const popup = document.createElement('div');
    popup.id = 'bypassPopup';
    popup.innerHTML = `Bypassed by: <b>jm</b><br>Join: <a href="https://discord.gg/S2U9rEaKc3" target="_blank" style="color:#00AFFF;">Discord Server</a>`;
    document.body.appendChild(popup);

    // Show the pop-up
    function showPopup() {
        popup.classList.add('show');
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000); // Pop-up disappears after 5 seconds
    }

    // Perform the bypass
    const currentUrl = window.location.href;

    GM_xmlhttpRequest({
        method: "GET",
        url: `${apiUrl}${encodeURIComponent(currentUrl)}`,
        onload: function(response) {
            try {
                const json = JSON.parse(response.responseText);
                if (json.status === "success" && json.result) {
                    GM_setClipboard(json.result); // Copy the result link
                    showPopup(); // Show the pop-up
                    window.location.href = json.result; // Redirect instantly
                } else {
                    console.error("[Bypass Error] Invalid API response: ", json);
                }
            } catch (e) {
                console.error("[Bypass Error] Exception: ", e);
            }
        },
        onerror: function() {
            console.error("[Bypass Error] API request failed.");
        }
    });

})();
