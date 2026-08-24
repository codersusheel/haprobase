(function () {

    "use strict";


    /* =========================================================
       PREVENT DUPLICATE INITIALIZATION
    ========================================================= */

    if (window.__HPV_PAGE_LOADER__) {
        return;
    }

    window.__HPV_PAGE_LOADER__ = true;


    /* =========================================================
       CONFIG
    ========================================================= */

    const CONFIG = {

        MIN_TIME: 300,

        MAX_TIME: 8000,

        PROGRESS_START: 8

    };


    /* =========================================================
       STYLE
    ========================================================= */

    const style = document.createElement("style");

    style.id =
        "hpv-page-loader-style";

    style.textContent = `

        #hpv-page-loader {

            position: fixed;

            inset: 0;

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            flex-direction: column;

            background:
                rgba(7, 7, 9, .95);

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            z-index: 2147483647;

            opacity: 1;

            visibility: visible;

            pointer-events: all;

            transition:
                opacity .30s ease,
                visibility .30s ease;

        }


        #hpv-page-loader.hpv-hidden {

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

        }


        /* =====================================================
           CENTER
        ===================================================== */

        .hpv-loader-center {

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

        }


        /* =====================================================
           BRAND
        ===================================================== */

        .hpv-loader-brand {

            display: flex;

            align-items: center;

            justify-content: center;

            animation:
                hpvEnter .35s ease-out both;

        }


        /* =====================================================
           ICON
        ===================================================== */

        .hpv-loader-icon {

            position: relative;

            width: 48px;
            height: 62px;

            display: flex;

            align-items: center;
            justify-content: center;

            animation:
                hpvFloat 1.5s ease-in-out infinite;

            will-change:
                transform;

        }


        .hpv-loader-shadow {

            position: absolute;

            width: 43px;
            height: 58px;

            top: -3px;
            left: -3px;

            opacity: .32;

            background:
                linear-gradient(
                    135deg,
                    #bc1be7,
                    #ffffff44
                );

            clip-path: polygon(
                0 0,
                100% 0,
                100% 100%,
                50% 88%,
                0 100%
            );

            border-radius:
                8px 8px 0 0;

        }


        .hpv-loader-bookmark {

            position: relative;

            width: 40px;
            height: 56px;

            display: flex;

            align-items: center;
            justify-content: center;

            background:
                linear-gradient(
                    135deg,
                    #bc1be7,
                    #d94dff
                );

            clip-path: polygon(
                0 0,
                100% 0,
                100% 100%,
                50% 88%,
                0 100%
            );

            border-radius:
                7px 7px 0 0;

            z-index: 2;

            box-shadow:
                0 0 20px
                rgba(188, 27, 231, .35);

        }


        /* =====================================================
           SVG
        ===================================================== */

        .hpv-loader-icon svg {

            width: 40px;
            height: 40px;

            fill: none;

        }


        .hpv-loader-path {

            stroke: #fff;

            stroke-width: 6;

            stroke-linecap: round;

            stroke-linejoin: round;

            stroke-dasharray: 260;

            stroke-dashoffset: 260;

            animation:
                hpvDraw 1.5s
                ease-in-out
                infinite;

        }


        /* =====================================================
           NAME
        ===================================================== */

        .hpv-loader-name {

            display: flex;

            flex-direction: column;

            justify-content: center;

            min-width: 92px;

            padding:
                8px 14px 8px 11px;

            margin-left: -2px;

            border:
                1px solid
                rgba(188, 27, 231, .7);

            border-left: none;

            border-radius:
                0 10px 10px 0;

            background:
                rgba(12, 12, 14, .95);

        }


        .hpv-loader-name strong {

            color: #fff;

            font-family:
                Inter,
                system-ui,
                sans-serif;

            font-size: 13px;

            font-weight: 900;

            line-height: 1;

        }


        .hpv-loader-status {

            margin-top: 5px;

            color: #fff;

            opacity: .55;

            font-family:
                Inter,
                system-ui,
                sans-serif;

            font-size: 8px;

            font-weight: 600;

            letter-spacing: 1px;

            text-transform: uppercase;

            line-height: 1;

        }


        /* =====================================================
           PROGRESS
        ===================================================== */

        .hpv-progress {

            position: relative;

            width: 130px;

            height: 2px;

            margin-top: 20px;

            overflow: hidden;

            border-radius: 10px;

            background:
                rgba(255, 255, 255, .08);

        }


        .hpv-progress-bar {

            position: absolute;

            top: 0;

            left: 0;

            width: 8%;

            height: 100%;

            border-radius: 10px;

            background:
                linear-gradient(
                    90deg,
                    #bc1be7,
                    #d94dff
                );

            box-shadow:
                0 0 10px
                rgba(188, 27, 231, .8);

            transition:
                width .25s ease;

        }


        /* =====================================================
           OFFLINE
        ===================================================== */

        #hpv-page-loader.hpv-offline
        .hpv-loader-bookmark {

            background:
                linear-gradient(
                    135deg,
                    #555,
                    #777
                );

            box-shadow: none;

        }


        #hpv-page-loader.hpv-offline
        .hpv-progress-bar {

            background: #777;

            box-shadow: none;

        }


        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes hpvEnter {

            from {

                opacity: 0;

                transform:
                    scale(.94)
                    translateY(8px);

            }

            to {

                opacity: 1;

                transform:
                    scale(1)
                    translateY(0);

            }

        }


        @keyframes hpvFloat {

            0%,
            100% {

                transform:
                    translateY(0);

            }

            50% {

                transform:
                    translateY(-5px);

            }

        }


        @keyframes hpvDraw {

            0% {

                stroke-dashoffset: 260;

                opacity: .55;

            }

            45% {

                stroke-dashoffset: 0;

                opacity: 1;

            }

            70% {

                stroke-dashoffset: 0;

                opacity: 1;

            }

            100% {

                stroke-dashoffset: -260;

                opacity: .55;

            }

        }


        @media (max-width: 480px) {

            .hpv-loader-icon {

                width: 42px;
                height: 55px;

            }

            .hpv-loader-bookmark {

                width: 35px;
                height: 49px;

            }

            .hpv-loader-shadow {

                width: 38px;
                height: 51px;

            }

            .hpv-loader-name {

                min-width: 82px;

                padding:
                    7px 11px 7px 9px;

            }

            .hpv-loader-name strong {

                font-size: 11px;

            }

            .hpv-progress {

                width: 110px;

            }

        }

    `;

    document.head.appendChild(style);


    /* =========================================================
       CREATE LOADER
    ========================================================= */

    const loader =
        document.createElement("div");

    loader.id =
        "hpv-page-loader";

    loader.setAttribute(
        "aria-hidden",
        "true"
    );


    loader.innerHTML = `

        <div class="hpv-loader-center">

            <div class="hpv-loader-brand">

                <div class="hpv-loader-icon">

                    <div class="hpv-loader-shadow"></div>

                    <div class="hpv-loader-bookmark">

                        <svg
                            viewBox="0 0 100 100"
                            aria-hidden="true"
                        >

                            <path
                                class="hpv-loader-path"
                                d="
                                    M10 0 L10 70
                                    A10 10 0 0 0 30 70
                                    L30 20
                                    A10 10 0 0 1 50 20
                                    L50 70
                                    A16 9 0 0 0 70 80
                                    A13 20 0 0 1 80 94
                                    L100 95
                                "
                            />

                        </svg>

                    </div>

                </div>


                <div class="hpv-loader-name">

                    <strong>
                        Haproven
                    </strong>

                    <small
                        class="hpv-loader-status"
                    >
                        Loading
                    </small>

                </div>

            </div>


            <div class="hpv-progress">

                <span
                    class="hpv-progress-bar"
                ></span>

            </div>

        </div>

    `;


    /* =========================================================
       INSERT
    ========================================================= */

    function insertLoader() {

        if (!document.body) {
            return;
        }

        if (
            !document.getElementById(
                "hpv-page-loader"
            )
        ) {

            document.body.prepend(
                loader
            );

        }

    }


    /* =========================================================
       GET ELEMENTS
    ========================================================= */

    function getUI() {

        const root =
            document.getElementById(
                "hpv-page-loader"
            );

        if (!root) {
            return null;
        }

        return {

            root,

            status:
                root.querySelector(
                    ".hpv-loader-status"
                ),

            progress:
                root.querySelector(
                    ".hpv-progress-bar"
                ),

            icon:
                root.querySelector(
                    ".hpv-loader-icon"
                )

        };

    }


    /* =========================================================
       STATE
    ========================================================= */

    let progressTimer = null;

    let safetyTimer = null;

    let startedAt = 0;

    let finished = false;


    /* =========================================================
       RESET ANIMATION
       Fixes repeated refresh / stuck animation.
    ========================================================= */

    function resetAnimation() {

        const ui = getUI();

        if (!ui) {
            return;
        }


        ui.icon.style.animation = "none";

        ui.icon.offsetHeight;

        ui.icon.style.animation =
            "";


        const path =
            ui.root.querySelector(
                ".hpv-loader-path"
            );

        if (path) {

            path.style.animation =
                "none";

            path.offsetHeight;

            path.style.animation =
                "";

        }

    }


    /* =========================================================
       PROGRESS
    ========================================================= */

    let progress = CONFIG.PROGRESS_START;


    function setProgress(value) {

        const ui = getUI();

        if (!ui) {
            return;
        }

        progress =
            Math.min(
                94,
                Math.max(
                    0,
                    value
                )
            );

        ui.progress.style.width =
            progress + "%";

    }


    function startProgress() {

        clearInterval(
            progressTimer
        );


        progress =
            CONFIG.PROGRESS_START;


        setProgress(
            progress
        );


        progressTimer =
            setInterval(
                function () {

                    if (finished) {
                        return;
                    }


                    /*
                       Never reach 100%
                       until actual page load.
                    */

                    if (progress < 55) {

                        progress +=
                            Math.random() * 3 + 1;

                    } else if (
                        progress < 78
                    ) {

                        progress +=
                            Math.random() * 1.5;

                    } else {

                        progress +=
                            Math.random() * .25;

                    }


                    setProgress(
                        progress
                    );

                },

                350
            );

    }


    /* =========================================================
       SHOW
    ========================================================= */

    function showLoader() {

        insertLoader();


        const ui = getUI();

        if (!ui) {
            return;
        }


        clearTimeout(
            safetyTimer
        );

        clearInterval(
            progressTimer
        );


        finished = false;

        startedAt =
            Date.now();


        ui.root.style.display =
            "flex";


        /*
           Force animation reset.

           This is important when user
           rapidly refreshes / navigates.
        */

        resetAnimation();


        ui.root.classList.remove(
            "hpv-hidden"
        );

        ui.root.classList.remove(
            "hpv-offline"
        );


        ui.status.textContent =
            navigator.onLine
                ? "Loading"
                : "No Internet Connection";


        startProgress();


        /*
           Never keep custom loader forever.
        */

        safetyTimer =
            setTimeout(
                function () {

                    if (!finished) {

                        finishLoader();

                    }

                },

                CONFIG.MAX_TIME
            );

    }


    /* =========================================================
       HIDE
    ========================================================= */

    function finishLoader() {

        if (finished) {
            return;
        }


        finished = true;


        clearInterval(
            progressTimer
        );

        clearTimeout(
            safetyTimer
        );


        const ui = getUI();

        if (!ui) {
            return;
        }


        const elapsed =
            Date.now() -
            startedAt;


        const wait =
            Math.max(
                0,
                CONFIG.MIN_TIME -
                elapsed
            );


        setTimeout(
            function () {

                setProgress(
                    100
                );


                setTimeout(
                    function () {

                        ui.root.classList.add(
                            "hpv-hidden"
                        );


                        setTimeout(
                            function () {

                                ui.root.style.display =
                                    "none";

                            },

                            320
                        );

                    },

                    80
                );

            },

            wait
        );

    }


    /* =========================================================
       INITIAL PAGE
    ========================================================= */

    function startInitialLoader() {

        showLoader();


        /*
           If page is already loaded,
           don't keep loader.
        */

        if (
            document.readyState ===
            "complete"
        ) {

            setTimeout(
                finishLoader,
                80
            );

        }

    }


    if (document.body) {

        startInitialLoader();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            startInitialLoader,
            { once: true }
        );

    }


    /* =========================================================
       REAL PAGE LOAD
    ========================================================= */

    window.addEventListener(
        "load",
        function () {

            finishLoader();

        },
        { once: true }
    );


    /* =========================================================
       OFFLINE
    ========================================================= */

    window.addEventListener(
        "offline",
        function () {

            const ui = getUI();

            if (!ui) {
                return;
            }


            /*
               Only show offline state
               while loader is active.
            */

            if (finished) {
                return;
            }


            ui.root.classList.add(
                "hpv-offline"
            );


            ui.status.textContent =
                "No Internet Connection";


            setProgress(
                progress
            );

        }
    );


    /* =========================================================
       ONLINE
    ========================================================= */

    window.addEventListener(
        "online",
        function () {

            const ui = getUI();

            if (!ui) {
                return;
            }


            if (finished) {
                return;
            }


            ui.root.classList.remove(
                "hpv-offline"
            );


            ui.status.textContent =
                "Connection Restored";


            setProgress(
                Math.max(
                    progress,
                    88
                )
            );


            setTimeout(
                function () {

                    if (!finished) {

                        ui.status.textContent =
                            "Loading";

                    }

                },

                600
            );

        }
    );


    /* =========================================================
       SHOULD THIS LINK SHOW LOADER?
    ========================================================= */

    function isRealNavigation(link) {

        if (!link) {
            return false;
        }


        /*
           Not an anchor navigation.
        */

        if (
            link.tagName !== "A"
        ) {
            return false;
        }


        /*
           New tab/window.
        */

        if (
            link.target === "_blank" ||
            link.target === "_parent" ||
            link.target === "_top"
        ) {

            return false;

        }


        /*
           Download.
        */

        if (
            link.hasAttribute(
                "download"
            )
        ) {

            return false;

        }


        /*
           Explicitly disabled.
        */

        if (
            link.hasAttribute(
                "data-no-loader"
            )
        ) {

            return false;

        }


        /*
           Common copy buttons / copy links.
        */

        if (
            link.matches(
                `
                [data-copy],
                [data-copy-text],
                [data-clipboard],
                [data-clipboard-text],
                .copy-btn,
                .copy-button,
                .copy-link,
                .copy,
                .clipboard-btn,
                .clipboard-button
                `
            )
        ) {

            return false;

        }


        /*
           If link is inside a copy control.
        */

        if (
            link.closest(
                `
                [data-copy],
                [data-copy-text],
                [data-clipboard],
                [data-clipboard-text],
                .copy-btn,
                .copy-button,
                .copy-link,
                .copy,
                .clipboard-btn,
                .clipboard-button
                `
            )
        ) {

            return false;

        }


        /*
           Javascript links.
        */

        if (
            link.getAttribute("href") &&
            link.getAttribute("href")
                .trim()
                .toLowerCase()
                .startsWith(
                    "javascript:"
                )
        ) {

            return false;

        }


        /*
           Empty href.
        */

        if (
            !link.getAttribute("href") ||
            link.getAttribute("href") === "#"
        ) {

            return false;

        }


        /*
           Modifier key handling
           is done separately.
        */

        return true;

    }


    /* =========================================================
       INTERNAL NAVIGATION
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            /*
               IMPORTANT:

               Find the nearest anchor,
               but don't treat buttons /
               copy controls as navigation.
            */

            const link =
                event.target.closest("a");


            if (
                !isRealNavigation(link)
            ) {

                return;

            }


            /*
               Ctrl / Cmd / Shift / Alt
               means user is doing something
               other than normal navigation.
            */

            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {

                return;

            }


            let current;
            let target;


            try {

                current =
                    new URL(
                        location.href
                    );

                target =
                    new URL(
                        link.href,
                        location.href
                    );

            } catch (error) {

                return;

            }


            /*
               External website.
            */

            if (
                current.origin !==
                target.origin
            ) {

                return;

            }


            /*
               Same document hash.
            */

            if (
                current.pathname ===
                    target.pathname &&

                current.search ===
                    target.search &&

                target.hash
            ) {

                return;

            }


            /*
               Same URL.
            */

            if (
                current.href ===
                target.href
            ) {

                return;

            }


            /*
               REAL NAVIGATION
            */

            showLoader();

        },
        true
    );


    /* =========================================================
       BACK / FORWARD CACHE
    ========================================================= */

    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                finishLoader();

            }

        }
    );


})();