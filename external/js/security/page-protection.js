(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html",
        checkInterval: 500,
        devToolsThreshold: 180
    };

    let blocked = false;

    /* =========================================
       403 REDIRECT
       ========================================= */

    function go403() {
        if (blocked) return;

        blocked = true;

        window.location.replace(CONFIG.redirectURL);
    }

    /* =========================================
       MOBILE CHECK
       ========================================= */

    function isMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(
            navigator.userAgent
        );
    }

    /* =========================================
       DEVTOOLS CHECK
       ========================================= */

    function checkDevTools() {

        if (blocked || isMobile()) return;

        const widthGap = Math.abs(
            window.outerWidth - window.innerWidth
        );

        const heightGap = Math.abs(
            window.outerHeight - window.innerHeight
        );

        if (
            widthGap > CONFIG.devToolsThreshold ||
            heightGap > CONFIG.devToolsThreshold
        ) {
            go403();
        }
    }

    /* =========================================
       KEYBOARD PROTECTION
       ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            const key = String(event.key).toLowerCase();

            const restricted =
                // F12
                event.key === "F12" ||

                // Ctrl + Shift + I
                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    key === "i"
                ) ||

                // Ctrl + Shift + J
                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    key === "j"
                ) ||

                // Ctrl + Shift + C
                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    key === "c"
                ) ||

                // Ctrl + Shift + K
                (
                    event.ctrlKey &&
                    event.shiftKey &&
                    key === "k"
                ) ||

                // Ctrl + U
                (
                    event.ctrlKey &&
                    key === "u"
                );

            if (restricted) {

                event.preventDefault();
                event.stopImmediatePropagation();

                go403();
            }

        },
        true
    );

    /* =========================================
       RIGHT CLICK
       ========================================= */

    document.addEventListener(
        "contextmenu",
        function (event) {
            event.preventDefault();
        },
        true
    );

    /* =========================================
       TEXT SELECTION
       ========================================= */

    document.addEventListener(
        "selectstart",
        function (event) {
            event.preventDefault();
        },
        true
    );

    /* =========================================
       DRAG
       ========================================= */

    document.addEventListener(
        "dragstart",
        function (event) {
            event.preventDefault();
        },
        true
    );

    /* =========================================
       IFRAME PROTECTION
       ========================================= */

    function checkFrame() {

        if (blocked) return;

        try {

            if (window.top !== window.self) {
                go403();
            }

        } catch (error) {
            go403();
        }
    }

    checkFrame();

    /* =========================================
       VIEW-SOURCE
       ========================================= */

    function checkViewSource() {

        if (blocked) return;

        const url = String(window.location.href);

        if (url.startsWith("view-source:")) {
            go403();
        }
    }

    checkViewSource();

    /* =========================================
       PERIODIC SECURITY CHECK
       ========================================= */

    setInterval(() => {

        if (blocked) return;

        checkDevTools();
        checkFrame();
        checkViewSource();

    }, CONFIG.checkInterval);

    /* =========================================
       CONSOLE WARNING
       ========================================= */

    console.log(
        "%cProtected Page",
        "color:red;font-size:30px;font-weight:bold;"
    );

})();
