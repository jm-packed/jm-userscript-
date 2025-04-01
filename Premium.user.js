// ==UserScript==

// @name         Jm Userscript Premium

// @namespace    jm-bypass-userscript

// @version      3.0

// @description  Userscript made by Jm

// @author       Jm

// @match        *://linkvertise.net/*

// @match        *://linkvertise.com/*/*

// @match        *://work.ink/*

// @match        *://*.*/S?*

// @match        *://*.*/s?*

// @match        *://linkvertise.com/63771/*

// @match        *://keyrblx.com/*

// @match        *://rekonise.com/*

// @match        *://pandadevelopment.net/getkey*

// @match        *://ads.luarmor.net/get_key*

// @match        https://spdmteam.com/key-system-2?hwid=*

// @match        https://spdmteam.com/key-system-3?hwid=*

// @match        https://krnl.cat/checkpointv2/vgetkey?hash=*

// @match      https://auth.platorelay.com/*

// @match      https://auth.platoboost.net/*

// @grant        GM_xmlhttpRequest

// @grant        GM_setClipboard

// @grant        GM_openInTab

// @connect      helya.pylex.xyz

// @connect      triple.speedx.lol

// @connect      auth.platorelay.com

// @homepageURL  https://discord.gg/S2U9rEaKc3

// @downloadURL  https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Premium.user.js

// @updateURL    https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Premium.user.js

// @icon         https://i.imgur.com/onJQllI.png

// ==/UserScript==

(function() {

    'use strict';

    const apiUrl = 'http://hnode1.roverdev.xyz:27375/api/refresh?apikey=TRIPLE-DxbdiuUFOckiqrVyrfn6RIbMikxcO6wg-Triple&url=';

    const currentUrl = window.location.href;

  // Check if the URL matches either of the two excluded domains

    if (window.location.href.includes('https://auth.platorelay.com/') || window.location.href.includes('https://auth.platoboost.net/')) {

        console.log("[Jm Userscript] Excluding bypass for this URL.");

        return; // Exit the script without performing the bypass logic

    }

    function autoClickButtons() {

        document.querySelectorAll("button, a").forEach(button => {

            const text = button.innerText.trim().toLowerCase();

            if (text.includes("continue") || button.classList.contains("inline-flex")) {

                console.log(`[Jm Userscript] Clicking: ${text}`);

                button.click();

            }

        });

    }

    function autoClickCopyButtons() {

        document.querySelectorAll("button").forEach(button => {

            if (button.innerText.trim().toLowerCase() === "copy") {

                console.log("[Jm Userscript] Clicking 'Copy' button.");

                button.click();

                // Copy the associated text if available

                const textToCopy = button.parentElement?.previousElementSibling?.innerText?.trim();

                if (textToCopy) {

                    GM_setClipboard(textToCopy);

                    console.log(`[Jm Userscript] Copied text: ${textToCopy}`);

                }

                setTimeout(() => button.click(), 300);

            }

        });

    }

    function observeDOMChanges() {

        const observer = new MutationObserver(() => {

            autoClickButtons();

            autoClickCopyButtons();

        });

        observer.observe(document.body, { childList: true, subtree: true });

    }

    function bypassURL() {

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

    }

    function createPopup(message) {

        const style = document.createElement('style');

        style.innerHTML = `

            #bypassPopup {

                position: fixed; top: 15px; right: 15px;

                background: rgba(0, 0, 0, 0.85); color: white;

                padding: 15px 20px; border-radius: 10px;

                z-index: 999999; font-family: Arial, sans-serif;

                font-size: 14px; pointer-events: none; opacity: 0;

                transition: opacity 0.5s;

            }

            #bypassPopup.show { opacity: 1; }

        `;

        document.head.appendChild(style);

        const popup = document.createElement('div');

        popup.id = 'bypassPopup';

        popup.innerHTML = message;

        document.body.appendChild(popup);

        popup.classList.add('show');

        setTimeout(() => popup.classList.remove('show'), 5000);

    }

    function autoClickPlatoBoost() {

        document.querySelectorAll("button, a").forEach(button => {

            if (button.innerText.toLowerCase().includes("Continue")) {

                button.click();

            }

            if (button.innerText.toLowerCase().includes("Copy")) {

                button.click();

                setTimeout(() => button.click(), 5000);

            }

        });

    }

    function detectPlatoBoost() {

        if (currentUrl.includes("auth.platorelay.com")) {

            setInterval(autoClickPlatoBoost, 5000);

        }

    }



    // Auto Actions Based on URL

    if (currentUrl.includes("keyrblx.com/getkey/") || currentUrl.includes("krnl.cat/checkpointv2/vgetkey?hash=")) {

        function clickCopyButton() {

            const copyButton = document.querySelector("button");

            if (copyButton && copyButton.innerText.toLowerCase().includes("copy")) {

                copyButton.click();

                createPopup("<b>Key Copied!</b> ✔️");

            } else {

                setTimeout(clickCopyButton, 500);

            }

        }

        window.onload = clickCopyButton;

        return;

    }

    if (currentUrl.includes("spdmteam.com/key-system-2?hwid=") || currentUrl.includes("spdmteam.com/key-system-3?hwid=")) {

        setInterval(autoClickButtons, 1000);

        return;

    }

    // Function to create a notification pop-up at the top right corner (for general key copy)
function createTopRightPopup(message) {
    const style = document.createElement('style');
    style.innerHTML = `
        #topRightPopup {
            position: fixed; top: 15px; right: 15px;
            background: rgba(0, 0, 0, 0.85); color: white;
            padding: 15px 20px; border-radius: 10px;
            z-index: 999999; font-family: Arial, sans-serif;
            font-size: 14px; pointer-events: none; opacity: 0;
            transition: opacity 0.5s;
        }
        #topRightPopup.show { opacity: 1; }
        #topRightPopup a { color: #00AFFF; text-decoration: none; }
    `;
    document.head.appendChild(style);

    const popup = document.createElement('div');
    popup.id = 'topRightPopup';
    popup.innerHTML = message;
    document.body.appendChild(popup);

    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 5000);
}

// Full-screen pop-up for flux.li key copied notification
function createFullScreenPopup(message) {
    const style = document.createElement('style');
    style.innerHTML = `
        #fullScreenPopup {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.9); color: white; display: flex;
            align-items: center; justify-content: center; text-align: center;
            font-size: 24px; font-family: Arial, sans-serif; z-index: 999999;
        }
        #fullScreenPopup a { color: #00AFFF; text-decoration: none; font-size: 20px; }
    `;
    document.head.appendChild(style);

    const popup = document.createElement('div');
    popup.id = 'fullScreenPopup';
    popup.innerHTML = `${message}<br><br><a href="#" id="dismissPopup">Dismiss</a>`;
    document.body.appendChild(popup);

    document.getElementById("dismissPopup").addEventListener("click", () => {
        popup.remove();
    });
}

// Flux.li bypass handling - full-screen pop-up for key copied
function bypassFluxLi() {
    if (window.location.href.includes("flux.li")) {
        GM_xmlhttpRequest({
            method: "GET",
            url: `${apiUrl}${encodeURIComponent(window.location.href)}`,
            onload: function(response) {
                try {
                    const json = JSON.parse(response.responseText);
                    if (json.status === "success" && json.result) {
                        GM_setClipboard(json.result);
                        console.log(`[Flux.li Bypass] Key copied: ${json.result}`);

                        // Show full-screen pop-up for flux.li key copy
                        createFullScreenPopup('<b>Key Copied Successfully!</b> ✔️<br>Join: <a href="https://discord.gg/S2U9rEaKc3" target="_blank">Discord Server</a>');
                    } else {
                        console.error("[Flux.li Bypass] Invalid API response: ", json);
                    }
                } catch (e) {
                    console.error("[Flux.li Bypass] Exception: ", e);
                }
            },
            onerror: function() {
                console.error("[Flux.li Bypass] API request failed.");
            }
        });

        return; // Prevents redirection
    }
}

// Function to handle copying general keys with a top-right corner notification
function autoClickCopyButtons() {
    document.querySelectorAll("button").forEach(button => {
        if (button.innerText.trim().toLowerCase() === "copy") {
            console.log("[Jm Userscript] Clicking 'Copy' button.");
            button.click();

            // Copy the associated text if available
            const textToCopy = button.parentElement?.previousElementSibling?.innerText?.trim();
            if (textToCopy) {
                GM_setClipboard(textToCopy);
                console.log(`[Jm Userscript] Copied text: ${textToCopy}`);

                // Show a smaller notification at the top-right corner
                createTopRightPopup('<b>Copied Successfully!</b> ✔️<br>Join: <a href="https://discord.gg/S2U9rEaKc3" target="_blank">Discord Server</a>');
            }

            setTimeout(() => button.click(), 300);
        }
    });
}

// Function to notify the user that the userscript has been loaded
function notifyScriptLoaded() {
    createTopRightPopup('<b>Jm Userscript Loaded</b> ✔️<br>Join: <a href="https://discord.gg/S2U9rEaKc3" target="_blank">Discord Server</a>');
}

// Call the notification function when the userscript is loaded
notifyScriptLoaded();

// Call bypassFluxLi when on Flux.li
bypassFluxLi();

// General auto-click and copy button function
autoClickCopyButtons();

const WAIT_TIME = 10000; // Default wait time in milliseconds (10s)

    if (window.location.hostname === "ads.luarmor.net" && window.location.pathname.startsWith("/get_key")) {
        console.log("[Jm Userscript] Checking bypass method...");

        // Function to detect CAPTCHA
        function isCaptchaPresent() {
            return !!document.querySelector("iframe[src*='captcha'], div.g-recaptcha, .h-captcha");
        }

        if (isCaptchaPresent()) {
            console.log("[Jm Userscript] CAPTCHA detected! Manual verification required.");
            return;
        }

        if (window.location.search.includes("api_bypass")) {
            console.log(`[Jm Userscript] Waiting ${WAIT_TIME / 1000} seconds before API bypass...`);
            setTimeout(() => {
                console.log("[Jm Userscript] Proceeding with API bypass...");
                // Insert API bypass logic here
            }, WAIT_TIME);
        } else {
            console.log("[Jm Userscript] Clicking Start button instantly...");

            const startButton = document.querySelector("button.btn-success"); // Adjust selector if needed
            if (startButton) {
                startButton.click();
                console.log("[Jm Userscript] Start button clicked!");
            } else {
                console.log("[Jm Userscript] Start button not found!");
            }
        }
    }
    
    setInterval(autoClickButtons, 1000);

    bypassURL();

    detectPlatoBoost();

  autoClickButtons();

    autoClickCopyButtons();

    observeDOMChanges();
})();
