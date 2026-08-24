(function () {

    "use strict";


    /* =========================================================
       HAPROVEN PAGE EXPERIENCE LOADER
       Handles:

       1. Normal page loading
       2. Very slow loading
       3. Repeated refresh
       4. Internal navigation
       5. Offline state
       6. Online recovery
       7. Back / Forward cache
       8. Fast page loading
    ========================================================= */


    /* =========================================================
       PREVENT DUPLICATE INITIALIZATION
    ========================================================= */

    if (window.__HPV_PAGE_EXPERIENCE__) {
        return;
    }

    window.__HPV_PAGE_EXPERIENCE__ = true;


    /* =========================================================
       CONFIG
    ========================================================= */

    const CONFIG = {

        /* Loader minimum visible time */
        MIN_VISIBLE_TIME: 420,

        /* Normal page load safety timeout */
        MAX_WAIT_TIME: 15000,

        /* Offline message */
        OFFLINE_TEXT: "No Internet Connection",

        /* Online message */
        ONLINE_TEXT: "Connection Restored"

    };


    /* =========================================================
       CREATE STYLE
    ========================================================= */

    const style = document.createElement("style");

    style.id =
        "hpv-page-experience-style";

    style.textContent = `


        /* =====================================================
           MAIN OVERLAY
        ===================================================== */

        #hpv-page-experience {

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
                opacity .35s ease,
                visibility .35s ease;

        }


        /* =====================================================
           HIDDEN
        ===================================================== */

        #hpv-page-experience.hpv-hidden {

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

        }


        /* =====================================================
           CENTER AREA
        ===================================================== */

        .hpv-loader-center {

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

            animation:
                hpvEnter
                .45s
                ease-out
                both;

        }


        /* =====================================================
           BRAND
        ===================================================== */

        .hpv-loader-brand {

            display: flex;

            align-items: center;

            justify-content: center;

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
                hpvFloat
                1.8s
                ease-in-out
                infinite;

        }


        /* =====================================================
           ICON SHADOW
        ===================================================== */

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


        /* =====================================================
           MAIN ICON
        ===================================================== */

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
                rgba(188, 27, 231, .38),

                0 10px 28px
                rgba(188, 27, 231, .20);

        }


        /* =====================================================
           SVG
        ===================================================== */

        .hpv-loader-icon svg {

            width: 40px;
            height: 40px;

            fill: none;

        }


        /* =====================================================
           SVG PATH
        ===================================================== */

        .hpv-loader-path {

            stroke: #fff;

            stroke-width: 6;

            stroke-linecap: round;

            stroke-linejoin: round;

            stroke-dasharray: 260;

            stroke-dashoffset: 260;

            animation:
                hpvDraw
                1.8s
                ease-in-out
                infinite;

        }


        /* =====================================================
           BRAND TEXT
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
                rgba(188, 27, 231, .72);

            border-left: none;

            border-radius:
                0 10px 10px 0;

            background:
                rgba(12, 12, 14, .94);

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

            transition:
                color .25s ease,
                opacity .25s ease;

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
                width .35s ease;

        }


        /* =====================================================
           OFFLINE MODE
        ===================================================== */

        #hpv-page-experience.hpv-offline
        .hpv-loader-bookmark {

            background:
                linear-gradient(
                    135deg,
                    #555,
                    #777
                );

            box-shadow:
                0 0 18px
                rgba(255, 255, 255, .10);

        }


        #hpv-page-experience.hpv-offline
        .hpv-loader-status {

            opacity: .9;

        }


        #hpv-page-experience.hpv-offline
        .hpv-progress-bar {

            background:
                #777;

            box-shadow: none;

        }


        /* =====================================================
           ONLINE RECOVERY
        ===================================================== */

        #hpv-page-experience.hpv-recovered
        .hpv-loader-bookmark {

            animation:
                hpvRecovered
                .55s
                ease;

        }


        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes hpvEnter {

            0% {

                opacity: 0;

                transform:
                    translateY(8px)
                    scale(.94);

            }

            100% {

                opacity: 1;

                transform:
                    translateY(0)
                    scale(1);

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

            75% {

                stroke-dashoffset: 0;

                opacity: 1;

            }

            100% {

                stroke-dashoffset: -260;

                opacity: .55;

            }

        }


        @keyframes hpvRecovered {

            0% {

                transform:
                    scale(1);

            }

            50% {

                transform:
                    scale(1.08);

            }

            100% {

                transform:
                    scale(1);

            }

        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media
        (prefers-reduced-motion: reduce) {

            .hpv-loader-icon,
            .hpv-loader-path,
            .hpv-loader-center {

                animation: none;

            }

        }


        /* =====================================================
           MOBILE
        ===================================================== */

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
       CREATE HTML
    ========================================================= */

    const loader =
        document.createElement("div");

    loader.id =
        "hpv-page-experience";

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
                "hpv-page-experience"
            )
        ) {

            document.body.prepend(
                loader
            );

        }

    }


    if (document.body) {

        insertLoader();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            insertLoader,
            { once: true }
        );

    }


    /* =========================================================
       ELEMENT REFERENCES
    ========================================================= */

    function getElements() {

        const root =
            document.getElementById(
                "hpv-page-experience"
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
                )

        };

    }


    /* =========================================================
       STATE
    ========================================================= */

    let pageStarted =
        Date.now();

    let pageFinished =
        false;

    let progressValue =
        8;

    let progressTimer =
        null;

    let safetyTimer =
        null;


    /* =========================================================
       SET STATUS
    ========================================================= */

    function setStatus(text) {

        const elements =
            getElements();

        if (!elements) {
            return;
        }

        elements.status.textContent =
            text;

    }


    /* =========================================================
       SET PROGRESS
    ========================================================= */

    function setProgress(value) {

        const elements =
            getElements();

        if (!elements) {
            return;
        }

        progressValue =
            Math.max(
                0,
                Math.min(
                    98,
                    value
                )
            );

        elements.progress.style.width =
            progressValue + "%";

    }


    /* =========================================================
       START SMART PROGRESS
    ========================================================= */

    function startProgress() {

        clearInterval(
            progressTimer
        );

        progressValue = 8;

        setProgress(
            progressValue
        );


        progressTimer =
            setInterval(
                function () {

                    if (pageFinished) {
                        return;
                    }


                    /*
                       Progress becomes slower
                       as it approaches 90%.
                    */

                    if (
                        progressValue < 55
                    ) {

                        progressValue +=
                            Math.random() * 4 + 1;

                    } else if (
                        progressValue < 78
                    ) {

                        progressValue +=
                            Math.random() * 2 + .5;

                    } else if (
                        progressValue < 90
                    ) {

                        progressValue +=
                            Math.random() * .7;

                    } else {

                        progressValue +=
                            Math.random() * .15;

                    }


                    setProgress(
                        progressValue
                    );

                },

                380
            );

    }


    /* =========================================================
       STOP PROGRESS
    ========================================================= */

    function stopProgress() {

        clearInterval(
            progressTimer
        );

        progressTimer =
            null;

    }


    /* =========================================================
       HIDE LOADER
    ========================================================= */

    function hideLoader() {

        if (pageFinished) {
            return;
        }

        pageFinished = true;

        stopProgress();

        clearTimeout(
            safetyTimer
        );


        const elapsed =
            Date.now() -
            pageStarted;


        const remaining =
            Math.max(
                0,
                CONFIG.MIN_VISIBLE_TIME -
                elapsed
            );


        setTimeout(
            function () {

                const elements =
                    getElements();

                if (!elements) {
                    return;
                }


                setProgress(100);


                setTimeout(
                    function () {

                        elements.root.classList.add(
                            "hpv-hidden"
                        );


                        setTimeout(
                            function () {

                                elements.root.style.display =
                                    "none";

                            },

                            380

                        );

                    },

                    120

                );

            },

            remaining
        );

    }


    /* =========================================================
       SHOW LOADER
    ========================================================= */

    function showLoader() {

        const elements =
            getElements();

        if (!elements) {
            return;
        }


        pageStarted =
            Date.now();

        pageFinished =
            false;


        elements.root.style.display =
            "flex";


        elements.root.classList.remove(
            "hpv-hidden"
        );

        elements.root.classList.remove(
            "hpv-offline"
        );

        elements.root.classList.remove(
            "hpv-recovered"
        );


        setStatus(
            navigator.onLine ?
                "Loading" :
                CONFIG.OFFLINE_TEXT
        );


        startProgress();

    }


    /* =========================================================
       INITIALIZE
    ========================================================= */

    function initialize() {

        insertLoader();

        showLoader();


        /*
           Safety timeout.

           Important:
           It prevents the custom overlay from
           blocking the page forever.

           Browser/server may still be loading,
           but after this point we allow the user
           to see the page.
        */

        safetyTimer =
            setTimeout(
                function () {

                    if (!pageFinished) {

                        hideLoader();

                    }

                },

                CONFIG.MAX_WAIT_TIME
            );

    }


    /* =========================================================
       PAGE LOAD
    ========================================================= */

    if (
        document.readyState ===
        "complete"
    ) {

        initialize();

        /*
           Page already loaded.
           Hide almost immediately.
        */

        setTimeout(
            hideLoader,
            80
        );

    } else {

        initialize();

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );

    }


    /* =========================================================
       OFFLINE
    ========================================================= */

    window.addEventListener(
        "offline",
        function () {

            const elements =
                getElements();

            if (!elements) {
                return;
            }


            /*
               If page is already completely
               loaded, don't cover it.

               Show offline notification only
               when loading/navigation is active.
            */

            if (pageFinished) {
                return;
            }


            elements.root.classList.add(
                "hpv-offline"
            );


            setStatus(
                CONFIG.OFFLINE_TEXT
            );


            setProgress(
                Math.min(
                    progressValue,
                    90
                )
            );

        }
    );


    /* =========================================================
       ONLINE
    ========================================================= */

    window.addEventListener(
        "online",
        function () {

            const elements =
                getElements();

            if (!elements) {
                return;
            }


            elements.root.classList.remove(
                "hpv-offline"
            );


            elements.root.classList.add(
                "hpv-recovered"
            );


            setStatus(
                CONFIG.ONLINE_TEXT
            );


            setProgress(
                Math.max(
                    progressValue,
                    92
                )
            );


            /*
               Give the browser a little time
               after reconnecting.
            */

            setTimeout(
                function () {

                    if (!pageFinished) {

                        setStatus(
                            "Loading"
                        );

                    }

                },

                700
            );

        }
    );


    /* =========================================================
       INTERNAL LINK NAVIGATION
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest("a");

            if (!link) {
                return;
            }


            /* -----------------------------------------------
               SPECIAL LINKS
            ----------------------------------------------- */

            if (
                link.target === "_blank" ||
                link.hasAttribute("download") ||
                link.hasAttribute("data-no-loader") ||
                link.href.startsWith(
                    "javascript:"
                )
            ) {

                return;

            }


            /* -----------------------------------------------
               MODIFIER KEYS
               Ctrl / Cmd / Shift / Alt
            ----------------------------------------------- */

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
                        link.href
                    );

            } catch (error) {

                return;

            }


            /* -----------------------------------------------
               EXTERNAL WEBSITE
            ----------------------------------------------- */

            if (
                current.origin !==
                target.origin
            ) {

                return;

            }


            /* -----------------------------------------------
               HASH / SAME DOCUMENT
            ----------------------------------------------- */

            if (
                target.pathname ===
                    current.pathname &&

                target.search ===
                    current.search &&

                target.hash
            ) {

                return;

            }


            /* -----------------------------------------------
               SAME URL
            ----------------------------------------------- */

            if (
                target.href ===
                current.href
            ) {

                return;

            }


            /* -----------------------------------------------
               SHOW LOADER
            ----------------------------------------------- */

            showLoader();

        }
    );


    /* =========================================================
       PAGE SHOW
       Handles browser back/forward cache.
    ========================================================= */

    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                hideLoader();

            }

        }
    );


    /* =========================================================
       PAGE HIDE
       Prepare next navigation.
    ========================================================= */

    window.addEventListener(
        "pagehide",
        function () {

            /*
               Don't use unload/beforeunload here.
               pagehide is more suitable for modern
               navigation lifecycle handling.
            */

        }
    );


})();