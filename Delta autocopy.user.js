// ==UserScript==
2

3
// @name         Delta autocopy
4

5
// @namespace    jm-autocopy
6

7
// @version      2.9
8

9
// @description  Userscript made by Jm
10

11
// @author       Jm
12

13
// @match        *://linkvertise.com/*
14

15
// @match        *://work.ink/*
16

17
// @match        *://*.*/s?*
18

19
// @match        *://keyrblx.com/*
20

21
// @match        *://rekonise.com/*
22

23
// @match        *://mobile.codex.lol/*
24

25
// @match        *://pandadevelopment.net/getkey*
26

27
// @match        *://ads.luarmor.net/get_key*
28

29
// @match        https://spdmteam.com/key-system-2?hwid=*
30

31
// @match        https://spdmteam.com/key-system-3?hwid=*
32

33
// @match        https://krnl.cat/checkpointv2/vgetkey?hash=*
34

35
// @match        https://auth.platorelay.com/*
36

37
// @match      https://auth.platoboost.net/*
38

39
// @grant        GM_xmlhttpRequest
40

41
// @grant        GM_setClipboard
42

43
// @grant        GM_openInTab
44

45
// @connect      auth.platoboost.net
46

47
// @connect      triple.speedx.lol
48

49
// @homepageURL  https://discord.gg/S2U9rEaKc3
50
// @download     https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Delta%20autocopy.user.js
55
// @update       https://raw.githubusercontent.com/jm-packed/jm-userscript-/refs/heads/main/Delta%20autocopy.user.js

// ==/UserScript==
56

57
(function() {
58

59
    'use strict';
60

61
    function forceClickButton(button) {
62

63
        if (button && button.offsetParent !== null) { // Ensure button is visible
64

65
            console.log(`[Jm Userscript] Clicking button: ${button.innerText.trim()}`);
66

67
            for (let i = 0; i < 5; i++) { // Click multiple times
68

69
                setTimeout(() => {
70

71
                    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
72

73
                    button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
74

75
                    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
76

77
                }, i * 200); // Click every 200ms
78

79
            }
80

81
        }
82

83
    }
84

85
    function clickContinueButtons() {
86

87
        const continueButtons = [...document.querySelectorAll("button, a")].filter(button =>
88

89
            button.innerText.trim().toLowerCase().includes("continue") ||
90

91
            button.matches(".inline-flex.items-center.justify-center")
92

93
        );
94

95
        continueButtons.forEach(forceClickButton);
96

97
    }
98

99
    function clickCopyButtons() {
100

101
        document.querySelectorAll("button").forEach(button => {
102

103
            if (button.innerText.trim().toLowerCase() === "copy") {
104

105
                console.log("[Jm Userscript] Clicking 'Copy' button.");
106

107
                forceClickButton(button);
108

109
                // Copy associated text
110

111
                const textToCopy = button.closest("div")?.previousElementSibling?.innerText?.trim();
112

113
                if (textToCopy) {
114

115
                    GM_setClipboard(textToCopy);
116

117
                    console.log(`[Jm Userscript] Copied: ${textToCopy}`);
118

119
                }
120

121
            }
122

123
        });
124

125
    }
126

127
    setTimeout(() => {
128

129
        console.log("[Jm Userscript] Scanning for buttons...");
130

131
        clickContinueButtons();
132

133
        clickCopyButtons();
134

135
    }, 1000); // Wait 1 seconds before scanning
136

137
})();
