(function () {

    "use strict";

    /* =========================================================
       HAPROVEN SMART LOADER
       External JS / Optimized Version
    ========================================================= */

    if (window.__HPV_SMART_LOADER__) return;
    window.__HPV_SMART_LOADER__ = true;


    /* =========================================================
       CONFIG
    ========================================================= */

    const CONFIG = {
        BRAND: "Haproven",
        MIN_VISIBLE_TIME: 160,
        MAX_VISIBLE_TIME: 6000
    };


    /* =========================================================
       EARLY CSS
    ========================================================= */

    const style = document.createElement("style");

    style.id = "hpv-smart-loader-style";

    style.textContent = `

        html.hpv-loading,
        html.hpv-loading body {
            background: #000 !important;
        }

        #hpv-smart-loader {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #000;
            z-index: 2147483647;
            opacity: 1;
            visibility: visible;
            pointer-events: all;
            transition:
                opacity .18s ease,
                visibility .18s ease;
            contain: strict;
        }

        #hpv-smart-loader.hpv-hide {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .hpv-loader-center {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #000;
        }

        .hpv-loader-brand {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .hpv-loader-icon {
            position: relative;
            width: 46px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: hpvFloat 1.4s ease-in-out infinite;
        }

        .hpv-loader-shadow {
            position: absolute;
            width: 42px;
            height: 57px;
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
            border-radius: 8px 8px 0 0;
        }

        .hpv-loader-bookmark {
            position: relative;
            width: 38px;
            height: 53px;
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
            border-radius: 7px 7px 0 0;
            box-shadow:
                0 0 22px rgba(188,27,231,.42),
                0 10px 30px rgba(188,27,231,.20);
        }

        .hpv-loader-icon svg {
            width: 38px;
            height: 38px;
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
                hpvDraw
                1.5s
                ease-in-out
                infinite;
        }

        .hpv-loader-name {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-width: 92px;
            padding: 8px 13px 8px 10px;
            margin-left: -2px;
            border:
                1px solid
                rgba(188,27,231,.72);
            border-left: none;
            border-radius: 0 10px 10px 0;
            background: rgba(12,12,14,.96);
        }

        .hpv-loader-name strong {
            color: #fff;
            font-family:
                Inter,
                system-ui,
                sans-serif;
            font-size: 12px;
            font-weight: 900;
            line-height: 1;
        }

        .hpv-loader-status {
            margin-top: 5px;
            color: rgba(255,255,255,.55);
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

        .hpv-loader-progress {
            position: relative;
            width: 125px;
            height: 2px;
            margin-top: 20px;
            overflow: hidden;
            border-radius: 10px;
            background: rgba(255,255,255,.08);
        }

        .hpv-loader-progress-bar {
            position: absolute;
            inset: 0 auto 0 0;
            width: 7%;
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
                rgba(188,27,231,.8);
            transition: width .18s ease;
        }


        /* =====================================================
           OFFLINE
        ===================================================== */

        #hpv-smart-loader.hpv-offline
        .hpv-loader-status {
            color: rgba(255,255,255,.9);
        }

        #hpv-smart-loader.hpv-offline
        .hpv-loader-bookmark {
            background:
                linear-gradient(
                    135deg,
                    #555,
                    #777
                );
            box-shadow: none;
        }

        #hpv-smart-loader.hpv-offline
        .hpv-loader-progress-bar {
            background: #777;
            box-shadow: none;
        }


        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes hpvFloat {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-5px);
            }

        }

        @keyframes hpvDraw {

            0% {
                stroke-dashoffset: 260;
                opacity: .9;
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

        @media (
            prefers-reduced-motion: reduce
        ) {

            .hpv-loader-icon,
            .hpv-loader-path {
                animation: none !important;
            }

        }

    `;


    /* =========================================================
       INJECT CSS
    ========================================================= */

    if (!document.getElementById(style.id)) {

        if (document.head) {

            document.head.prepend(style);

        } else {

            document.documentElement.prepend(style);

        }

    }


    /* =========================================================
       LOCK PAGE IMMEDIATELY
    ========================================================= */

    document.documentElement.classList.add(
        "hpv-loading"
    );


    /* =========================================================
       STATE
    ========================================================= */

    let root = null;
    let status = null;
    let bar = null;

    let progress = 7;

    let progressTimer = null;
    let safetyTimer = null;

    let startedAt = 0;
    let finished = false;


    /* =========================================================
       CREATE LOADER
    ========================================================= */

    function createLoader() {

        if (root) return;

        root = document.createElement("div");

        root.id = "hpv-smart-loader";

        root.innerHTML = `

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
                            ${CONFIG.BRAND}
                        </strong>

                        <small class="hpv-loader-status">
                            Loading
                        </small>

                    </div>

                </div>


                <div class="hpv-loader-progress">

                    <span
                        class="hpv-loader-progress-bar"
                    ></span>

                </div>

            </div>

        `;


        /* =====================================================
           INSERT
        ===================================================== */

        if (document.body) {

            document.body.prepend(root);

            cacheUI();

        } else {

            document.addEventListener(
                "DOMContentLoaded",
                function () {

                    if (!root.parentNode) {

                        document.body.prepend(root);

                    }

                    cacheUI();

                },
                { once: true }
            );

        }

    }


    /* =========================================================
       CACHE UI
    ========================================================= */

    function cacheUI() {

        if (!root) return;

        status =
            root.querySelector(
                ".hpv-loader-status"
            );

        bar =
            root.querySelector(
                ".hpv-loader-progress-bar"
            );

    }


    /* =========================================================
       PROGRESS
    ========================================================= */

    function setProgress(value) {

        if (!bar) return;

        progress =
            Math.min(
                94,
                Math.max(0, value)
            );

        bar.style.width =
            progress + "%";

    }


    function startProgress() {

        clearInterval(progressTimer);

        progress = 7;

        setProgress(7);


        progressTimer = setInterval(
            function () {

                if (finished) return;


                if (progress < 50) {

                    progress +=
                        Math.random() * 3 + 1;

                } else if (progress < 75) {

                    progress +=
                        Math.random() * 1.4;

                } else if (progress < 88) {

                    progress +=
                        Math.random() * .4;

                } else {

                    progress +=
                        Math.random() * .08;

                }


                setProgress(progress);

            },
            350
        );

    }


    /* =========================================================
       SHOW
    ========================================================= */

    function showLoader() {

        createLoader();

        if (!root) return;

        clearInterval(progressTimer);
        clearTimeout(safetyTimer);

        finished = false;

        startedAt = Date.now();


        root.style.display = "flex";

        root.classList.remove("hpv-hide");
        root.classList.remove("hpv-offline");


        if (status) {

            status.textContent =
                navigator.onLine
                    ? "Loading"
                    : "No Internet Connection";

        }


        document.documentElement.classList.add(
            "hpv-loading"
        );


        startProgress();


        safetyTimer = setTimeout(
            finishLoader,
            CONFIG.MAX_VISIBLE_TIME
        );

    }


    /* =========================================================
       FINISH
    ========================================================= */

    function finishLoader() {

        if (finished) return;

        finished = true;

        clearInterval(progressTimer);
        clearTimeout(safetyTimer);


        if (!root) return;


        const elapsed =
            Date.now() - startedAt;


        const remaining =
            Math.max(
                0,
                CONFIG.MIN_VISIBLE_TIME - elapsed
            );


        setTimeout(
            function () {

                setProgress(100);


                setTimeout(
                    function () {

                        root.classList.add(
                            "hpv-hide"
                        );

                        document.documentElement.classList.remove(
                            "hpv-loading"
                        );


                        setTimeout(
                            function () {

                                if (root) {

                                    root.style.display =
                                        "none";

                                }

                            },
                            190
                        );

                    },
                    40
                );

            },
            remaining
        );

    }


    /* =========================================================
       INITIAL
    ========================================================= */

    createLoader();

    showLoader();


    /* =========================================================
       PAGE LOAD
    ========================================================= */

    if (
        document.readyState === "complete"
    ) {

        finishLoader();

    } else {

        window.addEventListener(
            "load",
            finishLoader,
            { once: true }
        );

    }


    /* =========================================================
       OFFLINE
    ========================================================= */

    window.addEventListener(
        "offline",
        function () {

            if (!root || finished) return;

            root.classList.add(
                "hpv-offline"
            );

            if (status) {

                status.textContent =
                    "No Internet Connection";

            }

        }
    );


    /* =========================================================
       ONLINE
    ========================================================= */

    window.addEventListener(
        "online",
        function () {

            if (!root || finished) return;

            root.classList.remove(
                "hpv-offline"
            );

            if (status) {

                status.textContent =
                    "Connection Restored";

            }

            setProgress(
                Math.max(progress, 88)
            );


            setTimeout(
                function () {

                    if (
                        !finished &&
                        status
                    ) {

                        status.textContent =
                            "Loading";

                    }

                },
                500
            );

        }
    );


    /* =========================================================
       NAVIGATION CHECK
    ========================================================= */

    function shouldLoad(link) {

        if (
            !link ||
            link.tagName !== "A"
        ) {
            return false;
        }


        if (
            link.target === "_blank" ||
            link.target === "_parent" ||
            link.target === "_top"
        ) {
            return false;
        }


        if (
            link.hasAttribute("download") ||
            link.hasAttribute("data-no-loader")
        ) {
            return false;
        }


        const copySelector = `
            [data-copy],
            [data-copy-text],
            [data-clipboard],
            [data-clipboard-text],
            .copy,
            .copy-btn,
            .copy-button,
            .copy-link,
            .clipboard,
            .clipboard-btn,
            .clipboard-button
        `;


        if (
            link.matches(copySelector) ||
            link.closest(copySelector)
        ) {
            return false;
        }


        const href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#" ||
            href.trim()
                .toLowerCase()
                .startsWith("javascript:")
        ) {
            return false;
        }


        return true;

    }


    /* =========================================================
       NAVIGATION
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest("a");


            if (!shouldLoad(link)) return;


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
                    new URL(location.href);

                target =
                    new URL(
                        link.href,
                        location.href
                    );

            } catch {

                return;

            }


            /* External */

            if (
                current.origin !==
                target.origin
            ) {
                return;
            }


            /* Same hash */

            if (
                current.pathname ===
                    target.pathname &&
                current.search ===
                    target.search &&
                target.hash
            ) {
                return;
            }


            /* Same URL */

            if (
                current.href ===
                target.href
            ) {
                return;
            }


            /* Real navigation */

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


    /* =========================================================
       CLEANUP
    ========================================================= */

    window.addEventListener(
        "pagehide",
        function () {

            clearInterval(progressTimer);
            clearTimeout(safetyTimer);

        }
    );


})();