// ==UserScript==
// @name         Jm Userscript
// @namespace    jm-bypass-userscript
// @version      1.8
// @description  Userscript made by Jm
// @author       Jm
// @match        *://linkvertise.com/*
// @match        *://work.ink/*
// @match        https://linkvertise.com/*/*
// @match        *://workink.net/*
// @match        *://r.work.ink/*
// @match        *://*.*/s?*
// @match        *://keyrblx.com/*
// @match        *://rekonise.com/*
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
// @match        https://spdmteam.com/key-system-2?hwid=*
// @match        https://spdmteam.com/key-system-3?hwid=*
// @match        https://krnl.cat/checkpointv2/vgetkey?hash=*  // Added KRNL URL
// @grant        GM_xmlhttpRequest
// @grant        GM_setClipboard
// @grant        GM_openInTab
// @connect      helya.pylex.xyz
// @homepageURL  https://discord.gg/S2U9rEaKc3
// @downloadURL  https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/jm%20userscript%20main.user.js
// @updateURL    https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/jm%20userscript%20main.user.js
// ==/UserScript==

(function() {
    'use strict';

    // API URL
    const apiUrl = 'http://triple.speedx.lol/api/addlink?url=';
    const currentUrl = window.location.href;

    // Create the pop-up for bypass notification
    function createPopup(message) {
        const style = document.createElement('style');
        style.innerHTML = `
            #bypassPopup {
                position: fixed;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.85);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                z-index: 999999;
                font-family: Arial, sans-serif;
                font-size: 14px;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.5s;
            }
            #bypassPopup.show {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        const popup = document.createElement('div');
        popup.id = 'bypassPopup';
        popup.innerHTML = message;
        document.body.appendChild(popup);

        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 5000);
    }

    // Auto-click "Copy" button for keyrblx.com
    if (currentUrl.includes("keyrblx.com/getkey/")) {
        function clickCopyButton() {
            const copyButton = document.querySelector("button");
            if (copyButton && copyButton.innerText.toLowerCase().includes("copy")) {
                console.log("[KeyRBLX] Clicking copy button...");
                copyButton.click();
                createPopup("<b>Key Copied!</b> ✔️");
            } else {
                setTimeout(clickCopyButton, 500);
            }
        }
        window.onload = clickCopyButton;
        return;
    }

    // Handle SPDM key-system-2 and key-system-3 links
    if (currentUrl.includes("spdmteam.com/key-system-2?hwid=") || currentUrl.includes("spdmteam.com/key-system-3?hwid=")) {
        setInterval(() => {
            document.querySelectorAll('.btn-info, .btn-success').forEach(button => {
                if (button.innerText.includes('Complete')) {
                    console.log('[SPDM] Clicking: ', button.innerText);
                    button.click();
                }
            });
        }, 1000);
        return;
    }

    // Auto-click "Copy" button for KRNL if enabled
    if (currentUrl.includes("krnl.cat/checkpointv2/vgetkey?hash=")) {
        function krnlCopyButton() {
            const copyButton = document.querySelector("button");
            if (copyButton && copyButton.innerText.toLowerCase().includes("copy")) {
                console.log("[KRNL] Clicking copy button...");
                copyButton.click();
                createPopup("<b>KRNL Key Copied!</b> ✔️");
            } else {
                setTimeout(krnlCopyButton, 500);
            }
        }
        window.onload = krnlCopyButton;
        return;
    }

    // Bypass other supported links
    GM_xmlhttpRequest({
        method: "GET",
        url: `${apiUrl}${encodeURIComponent(currentUrl)}`,
        onload: function(response) {
            try {
                const json = JSON.parse(response.responseText);
                if (json.status === "success" && json.result) {
                    GM_setClipboard(json.result);
                    createPopup(`Bypassed by: <b>Jm</b><br>Join: <a href="https://discord.gg/S2U9rEaKc3" target="_blank" style="color:#00AFFF;">Discord Server</a>`);
                    window.location.href = json.result;
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
