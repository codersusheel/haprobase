(function () {
    "use strict";

    /* =========================================================
       PREVENT DUPLICATE SCRIPT
    ========================================================= */

    if (window.__HPV_SMART_LOADER__) return;
    window.__HPV_SMART_LOADER__ = true;


    /* =========================================================
       CONFIG
    ========================================================= */

    const CONFIG = {
        MIN_VISIBLE_TIME: 180,
        MAX_VISIBLE_TIME: 6000,
        BRAND: "Haproven"
    };


    /* =========================================================
       EARLY LOADING STATE
    ========================================================= */

    const html = document.documentElement;

    html.classList.add("hpv-loading");


    /* =========================================================
       EARLY CSS
    ========================================================= */

    const style = document.createElement("style");

    style.id = "hpv-early-loader-style";

    style.textContent = `

        html.hpv-loading,
        html.hpv-loading body {
            background:#000 !important;
        }

        #hpv-smart-loader {
            position:fixed;
            inset:0;
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;

            background:#000;

            z-index:2147483647;

            opacity:1;
            visibility:visible;

            pointer-events:all;

            contain:strict;

            will-change:opacity;

            transition:
                opacity .18s ease,
                visibility .18s ease;
        }


        #hpv-smart-loader.hpv-hide {
            opacity:0;
            visibility:hidden;
            pointer-events:none;
        }


        .hpv-loader-center {
            width:100%;
            height:100%;

            display:flex;
            align-items:center;
            justify-content:center;

            flex-direction:column;

            background:#000;
        }


        .hpv-loader-brand {
            display:flex;
            align-items:center;
            justify-content:center;
        }


        .hpv-loader-icon {
            position:relative;

            width:46px;
            height:60px;

            display:flex;
            align-items:center;
            justify-content:center;

            will-change:transform;

            animation:
                hpvFloat
                1.4s
                ease-in-out
                infinite;
        }


        .hpv-loader-shadow {
            position:absolute;

            width:42px;
            height:57px;

            top:-3px;
            left:-3px;

            opacity:.32;

            background:
                linear-gradient(
                    135deg,
                    #bc1be7,
                    #ffffff44
                );

            clip-path:
                polygon(
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
            position:relative;

            width:38px;
            height:53px;

            display:flex;
            align-items:center;
            justify-content:center;

            background:
                linear-gradient(
                    135deg,
                    #bc1be7,
                    #d94dff
                );

            clip-path:
                polygon(
                    0 0,
                    100% 0,
                    100% 100%,
                    50% 88%,
                    0 100%
                );

            border-radius:
                7px 7px 0 0;

            box-shadow:
                0 0 22px
                rgba(188,27,231,.42),

                0 10px 30px
                rgba(188,27,231,.20);
        }


        .hpv-loader-icon svg {
            width:38px;
            height:38px;

            fill:none;
        }


        .hpv-loader-path {
            stroke:#fff;

            stroke-width:6;

            stroke-linecap:round;
            stroke-linejoin:round;

            stroke-dasharray:260;
            stroke-dashoffset:260;

            animation:
                hpvDraw
                1.5s
                ease-in-out
                infinite;
        }


        .hpv-loader-name {
            display:flex;

            flex-direction:column;
            justify-content:center;

            min-width:92px;

            padding:
                8px 13px 8px 10px;

            margin-left:-2px;

            border:
                1px solid
                rgba(188,27,231,.72);

            border-left:none;

            border-radius:
                0 10px 10px 0;

            background:
                rgba(12,12,14,.96);
        }


        .hpv-loader-name strong {
            color:#fff;

            font-family:
                Inter,
                system-ui,
                sans-serif;

            font-size:12px;
            font-weight:900;

            line-height:1;
        }


        .hpv-loader-status {
            margin-top:5px;

            color:
                rgba(
                    255,
                    255,
                    255,
                    .55
                );

            font-family:
                Inter,
                system-ui,
                sans-serif;

            font-size:8px;

            font-weight:600;

            letter-spacing:1px;

            text-transform:uppercase;

            line-height:1;
        }


        .hpv-loader-progress {
            position:relative;

            width:125px;
            height:2px;

            margin-top:20px;

            overflow:hidden;

            border-radius:10px;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .08
                );
        }


        .hpv-loader-progress-bar {
            position:absolute;

            top:0;
            left:0;

            width:7%;
            height:100%;

            border-radius:10px;

            background:
                linear-gradient(
                    90deg,
                    #bc1be7,
                    #d94dff
                );

            box-shadow:
                0 0 10px
                rgba(
                    188,
                    27,
                    231,
                    .8
                );

            will-change:width;

            transition:
                width .18s linear;
        }


        /* =====================================================
           OFFLINE
        ===================================================== */

        #hpv-smart-loader.hpv-offline
        .hpv-loader-status {
            color:
                rgba(
                    255,
                    255,
                    255,
                    .9
                );
        }


        #hpv-smart-loader.hpv-offline
        .hpv-loader-bookmark {
            background:
                linear-gradient(
                    135deg,
                    #555,
                    #777
                );

            box-shadow:none;
        }


        #hpv-smart-loader.hpv-offline
        .hpv-loader-progress-bar {
            background:#777;

            box-shadow:none;
        }


        /* =====================================================
           ANIMATION
        ===================================================== */

        @keyframes hpvFloat {

            0%,
            100% {
                transform:translateY(0);
            }

            50% {
                transform:translateY(-5px);
            }

        }


        @keyframes hpvDraw {

            0% {
                stroke-dashoffset:260;
                opacity:.9;
            }

            45% {
                stroke-dashoffset:0;
                opacity:1;
            }

            70% {
                stroke-dashoffset:0;
                opacity:1;
            }

            100% {
                stroke-dashoffset:-260;
                opacity:.55;
            }

        }


        @media(prefers-reduced-motion:reduce) {

            .hpv-loader-icon,
            .hpv-loader-path {
                animation:none !important;
            }

        }

    `;


    /* =========================================================
       INSERT CSS AS EARLY AS POSSIBLE
    ========================================================= */

    if (document.head) {
        document.head.prepend(style);
    } else {
        document.documentElement.prepend(style);
    }


    /* =========================================================
       LOADER HTML
    ========================================================= */

    const loader = document.createElement("div");

    loader.id = "hpv-smart-loader";

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


    /* =========================================================
       MOUNT
    ========================================================= */

    function mountLoader() {

        if (
            document.body &&
            !document.getElementById(
                "hpv-smart-loader"
            )
        ) {
            document.body.prepend(loader);
        }

    }


    if (document.body) {
        mountLoader();
    } else {

        document.addEventListener(
            "DOMContentLoaded",
            mountLoader,
            { once:true }
        );

    }


    /* =========================================================
       UI CACHE
    ========================================================= */

    let root = loader;

    const status =
        loader.querySelector(
            ".hpv-loader-status"
        );

    const bar =
        loader.querySelector(
            ".hpv-loader-progress-bar"
        );


    /* =========================================================
       STATE
    ========================================================= */

    let progress = 7;

    let progressFrame = 0;

    let safetyTimer = 0;

    let finishTimer = 0;

    let startedAt = 0;

    let finished = false;


    /* =========================================================
       PROGRESS
    ========================================================= */

    function setProgress(value) {

        progress = Math.min(
            94,
            Math.max(
                0,
                value
            )
        );

        bar.style.width =
            progress + "%";

    }


    function startProgress() {

        cancelAnimationFrame(
            progressFrame
        );

        progress = 7;

        setProgress(7);


        function tick() {

            if (finished) return;


            if (progress < 50) {

                progress +=
                    Math.random() * 2.8 + .8;

            }

            else if (progress < 75) {

                progress +=
                    Math.random() * 1.2;

            }

            else if (progress < 88) {

                progress +=
                    Math.random() * .35;

            }

            else {

                progress +=
                    Math.random() * .06;

            }


            setProgress(progress);


            progressFrame =
                requestAnimationFrame(tick);

        }


        progressFrame =
            requestAnimationFrame(tick);

    }


    /* =========================================================
       SHOW LOADER
    ========================================================= */

    function showLoader() {

        clearTimeout(safetyTimer);
        clearTimeout(finishTimer);

        cancelAnimationFrame(
            progressFrame
        );


        finished = false;

        startedAt =
            performance.now();


        root.style.display =
            "flex";


        root.classList.remove(
            "hpv-hide",
            "hpv-offline"
        );


        html.classList.add(
            "hpv-loading"
        );


        status.textContent =
            navigator.onLine
                ? "Loading"
                : "No Internet Connection";


        startProgress();


        safetyTimer =
            setTimeout(
                finishLoader,
                CONFIG.MAX_VISIBLE_TIME
            );

    }


    /* =========================================================
       FINISH LOADER
    ========================================================= */

    function finishLoader() {

        if (finished) return;

        finished = true;


        cancelAnimationFrame(
            progressFrame
        );

        clearTimeout(
            safetyTimer
        );


        const elapsed =
            performance.now() -
            startedAt;


        const remaining =
            Math.max(
                0,
                CONFIG.MIN_VISIBLE_TIME -
                elapsed
            );


        finishTimer =
            setTimeout(() => {

                setProgress(100);


                requestAnimationFrame(() => {

                    root.classList.add(
                        "hpv-hide"
                    );

                    html.classList.remove(
                        "hpv-loading"
                    );


                    /*

                       No extra 300ms timer.
                       CSS handles the fade.

                    */

                    setTimeout(() => {

                        root.style.display =
                            "none";

                    }, 190);

                });

            }, remaining);

    }


    /* =========================================================
       INITIAL
    ========================================================= */

    mountLoader();

    showLoader();


    /* =========================================================
       PAGE LOAD
    ========================================================= */

    if (
        document.readyState ===
        "complete"
    ) {

        finishLoader();

    } else {

        window.addEventListener(
            "load",
            finishLoader,
            {
                once:true
            }
        );

    }


    /* =========================================================
       OFFLINE
    ========================================================= */

    window.addEventListener(
        "offline",
        () => {

            if (finished) return;

            root.classList.add(
                "hpv-offline"
            );

            status.textContent =
                "No Internet Connection";

        },
        { passive:true }
    );


    /* =========================================================
       ONLINE
    ========================================================= */

    window.addEventListener(
        "online",
        () => {

            if (finished) return;


            root.classList.remove(
                "hpv-offline"
            );


            status.textContent =
                "Connection Restored";


            setProgress(
                Math.max(
                    progress,
                    88
                )
            );


            setTimeout(() => {

                if (!finished) {

                    status.textContent =
                        "Loading";

                }

            }, 450);

        },
        { passive:true }
    );


    /* =========================================================
       COPY SELECTOR
    ========================================================= */

    const COPY_SELECTOR = `
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


    /* =========================================================
       CHECK REAL NAVIGATION
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


        if (
            link.matches(COPY_SELECTOR) ||
            link.closest(COPY_SELECTOR)
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
        event => {

            if (
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }


            const link =
                event.target.closest("a");


            if (
                !shouldLoad(link)
            ) {
                return;
            }


            let target;


            try {

                target =
                    new URL(
                        link.href,
                        location.href
                    );

            }

            catch {

                return;

            }


            /* External */

            if (
                target.origin !==
                location.origin
            ) {
                return;
            }


            /* Same hash */

            if (
                location.pathname ===
                    target.pathname &&

                location.search ===
                    target.search &&

                target.hash
            ) {
                return;
            }


            /* Same URL */

            if (
                location.href ===
                target.href
            ) {
                return;
            }


            /* REAL NAVIGATION */

            showLoader();

        },
        true
    );


    /* =========================================================
       BACK / FORWARD CACHE
    ========================================================= */

    window.addEventListener(
        "pageshow",
        event => {

            if (
                event.persisted
            ) {

                showLoader();

                requestAnimationFrame(
                    finishLoader
                );

            }

        }
    );


    /* =========================================================
       CLEANUP
    ========================================================= */

    window.addEventListener(
        "pagehide",
        () => {

            cancelAnimationFrame(
                progressFrame
            );

            clearTimeout(
                safetyTimer
            );

            clearTimeout(
                finishTimer
            );

        },
        { passive:true }
    );

})();