// ==UserScript==

// @name         Jm Userscript Premium

// @namespace    jm-bypass-userscript

// @version      2.4

// @description  Userscript made by Jm

// @author       Jm

// @match        *://linkvertise.com/*

// @match        *://work.ink/*

// @match        *://*.*/s?*

// @match        *://keyrblx.com/*

// @match        *://rekonise.com/*

// @match        *://mobile.codex.lol/*

// @match        *://pandadevelopment.net/getkey*

// @match        *://ads.luarmor.net/get_key*

// @match        https://spdmteam.com/key-system-2?hwid=*

// @match        https://spdmteam.com/key-system-3?hwid=*

// @match        https://krnl.cat/checkpointv2/vgetkey?hash=*

// @match      https://auth.platorelay.com/*

// @match      https://auth.platoboost.net/*

// @require    https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Delta%20autocopy.js

// @grant        GM_xmlhttpRequest

// @grant        GM_setClipboard

// @grant        GM_openInTab

// @connect      helya.pylex.xyz

// @connect      triple.speedx.lol

// @connect      auth.platorelay.com

// @homepageURL  https://discord.gg/S2U9rEaKc3

// @downloadURL  https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Jm%20Premium%20userscript.user.js

// @updateURL    https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Jm%20Premium%20userscript.user.js

// ==/UserScript==

(function() {

    'use strict';

    const apiUrl = 'http://triple.speedx.lol/api/bypass?apikey=TRIPLE-DxbdiuUFOckiqrVyrfn6RIbMikxcO6wg-Triple&url=';

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

    function clickCopyButton() {
        const buttons = document.querySelectorAll('button');
        
        for (let button of buttons) {
            if (button.innerText.includes("Copy")) { 
                button.click();
                console.log("Copy button clicked automatically.");
                return;
            }
        }

        console.log("Copy button not found.");
    }

    // Wait for the page to fully load, then attempt to click the button
    window.addEventListener('load', () => {
        setTimeout(clickCopyButton, 1000);
    });
    
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

    // To track clicked elements to prevent repeats
33
    const clickedElements = new Set();
34

35
    // Random delay between clicks (in milliseconds)
36
    function getRandomDelay(min = 200, max = 500) {
37
        return Math.random() * (max - min) + min;
38
    }
39

40
    // Simulate mouse movement towards the button
41
    function simulateMouseMove(button) {
42
        const rect = button.getBoundingClientRect();
43
        const mouseX = rect.left + rect.width / 2;
44
        const mouseY = rect.top + rect.height / 2;
45

46
        // Here you could add mouse movement, but we'll skip actual mousemove for simplicity
47
        // and directly perform a click at the button's position
48
        return { x: mouseX, y: mouseY };
49
    }
50

51
    // Simulate a human-like click on a button
52
    function clickButton(button) {
53
        if (button && button.offsetParent !== null && !button.disabled && !clickedElements.has(button)) {
54
            console.log(`[Jm Userscript] Simulating human-like click on: ${button.innerText.trim()}`);
55

56
            // Simulate mouse movement towards the button
57
            const { x, y } = simulateMouseMove(button);
58

59
            // Simulate the click with a delay
60
            setTimeout(() => {
61
                button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, clientX: x, clientY: y }));
62
                button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, clientX: x, clientY: y }));
63
                button.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: x, clientY: y }));
64
                console.log("[Jm Userscript] Clicked the button.");
65
                clickedElements.add(button); // Mark button as clicked to prevent repeat clicks
66
            }, getRandomDelay(200, 800)); // Random delay between 200ms and 800ms
67
        }
68
    }
69

70
    // Function to click on the "Continue" button
71
    function clickContinueButton() {
72
        const continueButtons = [...document.querySelectorAll("button, a")].filter(button =>
73
            button.innerText.trim().toLowerCase().includes("continue") ||
74
            button.matches(".inline-flex.items-center.justify-center")
75
        );
76

77
        // Click the "Continue" button if found and interactable
78
        if (continueButtons.length > 0) {
79
            const button = continueButtons[0];
80
            clickButton(button);  // Simulate human-like click
81
        } else {
82
            console.log("[Jm Userscript] No 'Continue' button found.");
83
        }
84
    }
85

86
    // Function to click on the "Copy" button
87
    function clickCopyButton() {
88
        document.querySelectorAll("button").forEach(button => {
89
            if (button.innerText.trim().toLowerCase() === "copy" && !clickedElements.has(button)) {
90
                console.log("[Jm Userscript] Clicking 'Copy' button.");
91
                clickButton(button);  // Simulate human-like click
92

93
                // Copy associated text
94
                const textToCopy = button.closest("div")?.previousElementSibling?.innerText?.trim();
95
                if (textToCopy) {
96
                    GM_setClipboard(textToCopy);
97
                    console.log(`[Jm Userscript] Copied: ${textToCopy}`);
98
                }
99
            }
100
        });
101
    }
102

103
    // Scan the screen for buttons and perform the actions
104
    setTimeout(() => {
105
        console.log("[Jm Userscript] Scanning for buttons...");
106
        clickContinueButton();
107
        clickCopyButton();
108
    }, 1000); // Wait 1 second before scanning
109

110
})();
    
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

    

    setInterval(autoClickButtons, 1000);

    bypassURL();

    detectPlatoBoost();

  autoClickButtons();

    autoClickCopyButtons();

    observeDOMChanges();
})();
