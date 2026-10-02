

//  @ 2026 ya 2027 year auto upadet
document.getElementById("year").textContent = new Date().getFullYear();



// ============================================================
// LIVE PAGE TITLE
// Shows which page the user is currently on
// ============================================================

// (function () {
//     function loadLivePage() {
//         const pageDisplay =
//             document.getElementById("liv-open-page");
//         if (!pageDisplay) return;

//         pageDisplay.textContent =
//             `You are on: ${document.title} page.`;
//     }
//     // DOM अभी load हो रहा है
//     if (document.readyState === "loading") {
//         document.addEventListener(
//             "DOMContentLoaded",
//             loadLivePage
//         );
//     }
//     // DOM पहले से load हो चुका है
//     else {
//         loadLivePage();
//     }
// })();

(function () {

    "use strict";

    function loadLivePage() {

        const pageDisplay =
            document.getElementById("liv-open-page");

        if (!pageDisplay) return;

        const title =
            document.title.trim();

        pageDisplay.textContent =
            `Now viewing: ${title}`;

        pageDisplay.style.display = "-webkit-box";
        pageDisplay.style.webkitBoxOrient = "vertical";
        pageDisplay.style.webkitLineClamp = "2";
        pageDisplay.style.overflow = "hidden";
        pageDisplay.style.textOverflow = "ellipsis";

    }

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            loadLivePage,
            { once: true }
        );

    } else {

        loadLivePage();

    }

})();








let lastScrollTop = 0;
const header = document.querySelector('#header');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        header.classList.add('hide'); // Down = Hide
    } else {
        header.classList.remove('hide'); // Up = Show
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});












// dot6menu button
const menuBtn = document.getElementById("dot6menu");
const dropdown = document.getElementById("teamDropdown");
menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
});
document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
    }
});






/* ========================================
MOBILE MENU TOGGLE , 2nd impostant page 
===========================================*/
const toggleBtn = document.querySelector(".menu-toggle");
const nav = document.getElementById("navbar-mobile");
toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("show");

    document.body.style.overflow = isOpen ? "hidden" : "";
});
document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove("show");
        document.body.style.overflow = "";
    }
});
document.querySelectorAll(".dropdown").forEach(drop => {
    drop.addEventListener("click", () => {
        drop.classList.toggle("open");
    });
});
window.addEventListener("resize", () => {
    if (window.innerWidth > 2200) {
        nav.classList.remove("show");
        document.body.style.overflow = "";
    }
});





/*========================
Day and Night mode ,
==========================*/
const toggleButton = document.getElementById('theme-toggle');
function setTheme(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", mode);
    updateIcons(mode);
}
function updateIcons(mode) {
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    if (mode === "dark") {
        sun.style.display = "none";
        moon.style.display = "inline";
    } else {
        sun.style.display = "inline";
        moon.style.display = "none";
    }
}
let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    setTheme(savedTheme);
} else {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(systemDark ? "dark" : "light");
}
toggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? "light" : "dark");
});












/*/////////////////////
    hindi to english  ,data-hi=" हिंदी Text"
//////////////////////*/
let isHindi = localStorage.getItem("lang") === "hi";
function applyLanguage() {
    const elements = document.querySelectorAll("[data-hi]");
    const btn = document.getElementById("langBtn");
    elements.forEach(el => {
        if (isHindi) {
            el.dataset.en = el.dataset.en || el.textContent;
            el.textContent = el.getAttribute("data-hi");
        } else {
            if (el.dataset.en) {
                el.textContent = el.dataset.en;
            }
        }
    });
    btn.textContent = isHindi ? "Eng." : "हिंदी";
}
function toggleLanguage() {
    isHindi = !isHindi;
    localStorage.setItem("lang", isHindi ? "hi" : "en");
    applyLanguage();
}
document.addEventListener("DOMContentLoaded", applyLanguage);
















async function renderSocialLinks() {
    // querySelectorAll se sabhi matching containers select honge
    const containers = document.querySelectorAll('.haproven-sosal-links');
    if (containers.length === 0) return;

    try {
        const response = await fetch('Assets/json/side-link.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const socialData = await response.json();

        // Har container par loop chalayein
        containers.forEach(container => {
            // Clear existing content
            container.innerHTML = '';

            // Links render karein
            socialData.social_links.forEach(item => {
                if (item.is_active) {
                    const linkElement = document.createElement('a');
                    linkElement.href = item.url;
                    linkElement.target = '_blank';
                    linkElement.rel = 'noopener noreferrer';
                    linkElement.title = item.platform;
                    linkElement.className = 'social-link-item';

                    linkElement.style.setProperty('--icon-color', item.color);
                    linkElement.innerHTML = `<i class="${item.icon}"></i>`;

                    container.appendChild(linkElement);
                }
            });
        });

    } catch (error) {
        console.error('JSON File Load karne me error aaya:', error);
    }
}

// DOM ready hone par run karein
document.addEventListener('DOMContentLoaded', renderSocialLinks);








(function () {
    /* =========================================================
       PREVENT DUPLICATE STYLE
    ========================================================= */
    if (document.querySelector("#haproven-brand-style")) {
        return;
    }
    /* =========================================================
       BRAND CSS
    ========================================================= */
    const style = document.createElement("style");
    style.id = "haproven-brand-style";
    style.innerHTML = `
        :root {
            --hap-purple: #bc1be7;
        }

        .haproven-brand {
            display: flex;
            align-items: center;
            width: max-content;
            font-family: Inter, system-ui, sans-serif;
            cursor: pointer;
            user-select: none;
            transition: transform .25s ease;
        }

        .haproven-brand:active {
            transform: scale(.96);
        }

        .haproven-icon {
            position: relative;
            width: 36px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: transform .3s ease;
        }

        .haproven-brand:hover .haproven-icon {
            transform: scale(1.04);
        }

        .shadow-layer {
            position: absolute;
            width: 33px;
            height: 45px;
            top: -2px;
            left: -2px;
            opacity: .35;

            background:
                linear-gradient(
                    135deg,
                    var(--hap-purple),
                    #ffffff55
                );

            clip-path: polygon(
                0 0,
                100% 0,
                100% 100%,
                50% 88%,
                0 100%
            );

            border-radius: 6px 6px 0 0;
        }

        .main-bookmark {
            position: relative;
            width: 30px;
            height: 42px;

            background:
                linear-gradient(
                    135deg,
                    var(--hap-purple),
                    #d94dff
                );

            clip-path: polygon(
                0 0,
                100% 0,
                100% 100%,
                50% 88%,
                0 100%
            );

            border-radius: 6px 6px 0 0;

            display: flex;
            align-items: center;
            justify-content: center;

            z-index: 2;

            box-shadow:
                0 7px 16px rgba(188, 27, 231, .30);
        }

        .haproven-icon svg {
            width: 32px;
            height: 32px;
            margin-right: -4px;
            fill: none;
        }

        .path-line {
            stroke: #fff;
            stroke-width: 6;
            stroke-linecap: round;
            stroke-linejoin: round;

            stroke-dasharray: 260;
            stroke-dashoffset: 260;

            animation:
                hapDraw 2.8s ease-in-out infinite;
        }

        .brand-bar {
            min-height: 30px;

            padding: 2px 7px;

            display: flex;
            align-items: center;

            margin-left: -2px;

            border-radius: 0 8px 8px 0;

            border: 2px solid var(--hap-purple);
            border-left: none;

            // background: rgba(10, 10, 10, .88);

            backdrop-filter: blur(10px);
        }

        .brand-text {
            display: flex;
            flex-direction: column;
            line-height: 1;
        }

        .brand-text strong {
            font-size: 11px;
            font-weight: 900;
            // color: #fff;
            letter-spacing: .25px;
        }

        .brand-text small {
            font-size: 8px;
            font-weight: 600;
            opacity: .7;
            margin-top: 2px;
            letter-spacing: .3px;
            text-transform: uppercase;
        }

        .haproven-brand:hover .main-bookmark {
            box-shadow:
                0 0 18px rgba(188, 27, 231, .55),
                0 7px 20px rgba(188, 27, 231, .25);
        }

        .haproven-brand.icon-only .brand-bar {
            display: none;
        }

        @keyframes hapDraw {

            0% {
                stroke-dashoffset: 260;
                opacity: .6;
            }

            50% {
                stroke-dashoffset: 0;
                opacity: 1;
            }

            100% {
                stroke-dashoffset: -260;
                opacity: .6;
            }

        }

    `;

    document.head.appendChild(style);
    /* =========================================================
       BRAND HTML
    ========================================================= */
    function initBrand(el) {
        const brandName =
            el.dataset.name || "Haproven";
        const parts =
            brandName.split(" by ");
        let finalName =
            `<strong>${brandName}</strong>`;
        if (parts.length > 1) {
            finalName = `
                <strong>${parts[0]}</strong>
                <small>by ${parts[1]}</small>
            `;
        }
        el.innerHTML = `
            <div class="haproven-icon">
                <div class="shadow-layer"></div>
                <div class="main-bookmark">
                    <svg viewBox="0 0 100 100">
                        <path
                            class="path-line"
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
            <div class="brand-bar">
                <span class="brand-text">
                    ${finalName}
                </span>
            </div>
        `;
    }
    /* =========================================================
       START BRAND
    ========================================================= */
    function startHaprovenLogo() {
        document
            .querySelectorAll(".haproven-brand")
            .forEach(initBrand);
    }
    /* =========================================================
       DOM READY / HUB SUPPORT
    ========================================================= */
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startHaprovenLogo
        );
    } else {
        startHaprovenLogo();
    }
})();









// ////////////////////////////////////////////////////////////////

(function () {
    const faviconUrl = "https://haprobase.netlify.app/external/img/logo/haproven.png";

    if (!document.querySelector('link[rel="icon"]')) {
        const favicon = document.createElement("link");

        favicon.rel = "icon";
        favicon.type = "image/png";
        favicon.href = faviconUrl;

        document.head.appendChild(favicon);
    }
})();

// /////////////////////////////////////////////////////////////////////














// ============================================================
// HAPROVEN MAIN AUDIO READER
// Reads only <main> content
// Voice Selection + Play / Stop
// ============================================================

(function () {

    function initMainAudio() {

        const button =
            document.getElementById("main-audio-button");

        const main =
            document.querySelector("main");

        if (!button || !main) {
            console.warn(
                "[Audio] Button or <main> not found."
            );
            return;
        }

        if (button.dataset.audioReady === "true") {
            return;
        }

        button.dataset.audioReady = "true";


        const icon =
            button.querySelector("i");

        const label =
            button.querySelector("span");


        let speaking = false;
        let selectedVoice = null;


        // ====================================================
        // LOAD VOICES
        // ====================================================

        function loadVoice() {

            const voices =
                window.speechSynthesis.getVoices();

            if (!voices.length) return;


            // Prefer Indian English
            selectedVoice =
                voices.find(
                    voice =>
                        voice.lang === "en-IN"
                );


            // Hindi fallback
            if (!selectedVoice) {

                selectedVoice =
                    voices.find(
                        voice =>
                            voice.lang === "hi-IN"
                    );

            }


            // English fallback
            if (!selectedVoice) {

                selectedVoice =
                    voices.find(
                        voice =>
                            voice.lang.startsWith("en")
                    );

            }


            // First available voice
            if (!selectedVoice) {

                selectedVoice =
                    voices[0];

            }

        }


        loadVoice();


        window.speechSynthesis.onvoiceschanged =
            loadVoice;


        // ====================================================
        // BUTTON CLICK
        // ====================================================

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                // --------------------------------------------
                // STOP
                // --------------------------------------------

                if (speaking) {

                    window.speechSynthesis.cancel();

                    speaking = false;

                    updateButton(false);

                    return;
                }


                // --------------------------------------------
                // GET MAIN CONTENT
                // --------------------------------------------

                const text =
                    main.innerText
                        .replace(/\s+/g, " ")
                        .trim();


                if (!text) {

                    console.warn(
                        "[Audio] No text found in <main>."
                    );

                    return;
                }


                // --------------------------------------------
                // STOP PREVIOUS SPEECH
                // --------------------------------------------

                window.speechSynthesis.cancel();


                // --------------------------------------------
                // CREATE SPEECH
                // --------------------------------------------

                const speech =
                    new SpeechSynthesisUtterance(text);


                // Selected voice
                if (selectedVoice) {

                    speech.voice =
                        selectedVoice;

                    speech.lang =
                        selectedVoice.lang;

                } else {

                    speech.lang =
                        "en-IN";

                }


                speech.rate = 0.95;

                speech.pitch = 1;

                speech.volume = 1;


                // --------------------------------------------
                // START
                // --------------------------------------------

                speech.onstart = function () {

                    speaking = true;

                    updateButton(true);

                };


                // --------------------------------------------
                // FINISHED
                // --------------------------------------------

                speech.onend = function () {

                    speaking = false;

                    updateButton(false);

                };


                // --------------------------------------------
                // ERROR
                // --------------------------------------------

                speech.onerror = function (error) {

                    console.error(
                        "[Audio] Speech error:",
                        error
                    );

                    speaking = false;

                    updateButton(false);

                };


                window.speechSynthesis.speak(
                    speech
                );

            }
        );


        // ====================================================
        // BUTTON UI
        // ====================================================

        function updateButton(active) {

            if (active) {

                if (icon) {

                    icon.className =
                        "fa-solid fa-stop";

                }

                if (label) {

                    label.textContent =
                        "Stop";

                }

                button.classList.add(
                    "audio-playing"
                );

            } else {

                if (icon) {

                    icon.className =
                        "fa-solid fa-volume-low";

                }

                if (label) {

                    label.textContent =
                        "Audio";

                }

                button.classList.remove(
                    "audio-playing"
                );

            }

        }

    }


    // ========================================================
    // DOM READY
    // Works with direct JS + hub.js
    // ========================================================

    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {

        initMainAudio();

    } else {

        document.addEventListener(
            "DOMContentLoaded",
            initMainAudio
        );

    }

})();



























  /* =========================================
       TEAMTRACK DYNAMIC SIDEBAR
       Fast Cache + Fresh JSON + Auto Update
    ========================================= */
(() => {
    "use strict";

  

    const CONFIG = {
        jsonPath: "/assets/json/page-sidebar.json",
        navSelector: "#page-laptop-sidebar",
        cacheKey: "page_sidebar_cache_v3",
        fetchTimeout: 10000
    };

    const nav = document.querySelector(CONFIG.navSelector);
    if (!nav) return;

    let isLoading = false;
    let lastRenderedData = "";

    /* =========================================
       PATH HELPERS
    ========================================= */

    function normalizePath(path) {
        if (!path) return "/";

        let cleanPath = path.split("?")[0].split("#")[0];
        cleanPath = cleanPath.replace(/\/+/g, "/");

        if (cleanPath.length > 1) {
            cleanPath = cleanPath.replace(/\/+$/, "");
        }

        return cleanPath || "/";
    }

    function getCurrentPath() {
        return normalizePath(window.location.pathname);
    }

    /* =========================================
       GET DEFAULT + CURRENT PAGE NAVIGATION
    ========================================= */

    function getPageNavigation(data) {
        const currentPath = getCurrentPath();
        const pages = data.pages || {};

        const matchedKey = Object.keys(pages).find(
            path => normalizePath(path) === currentPath
        );

        const defaultNavigation =
            Array.isArray(data.default?.navigation)
                ? data.default.navigation
                : [];

        const pageNavigation =
            matchedKey &&
            Array.isArray(pages[matchedKey]?.navigation)
                ? pages[matchedKey].navigation
                : [];

        return [...defaultNavigation, ...pageNavigation];
    }

    /* =========================================
       ICON
    ========================================= */

    function createIcon(className) {
        const icon = document.createElement("i");

        if (className) {
            icon.className = className;
            icon.setAttribute("aria-hidden", "true");
        }

        return icon;
    }

    /* =========================================
       ACTIVE LINK CHECK
    ========================================= */

    function isCurrentLink(href) {
        if (!href || href === "#") return false;

        try {
            const target = new URL(href, window.location.href);
            const current = new URL(window.location.href);

            if (
                normalizePath(target.pathname) !==
                normalizePath(current.pathname)
            ) {
                return false;
            }

            if (target.hash) {
                return target.hash === current.hash;
            }

            return !current.hash;
        } catch (error) {
            return false;
        }
    }

    /* =========================================
       CREATE LINK
    ========================================= */

    function createLink(item) {
        const link = document.createElement("a");

        link.href = item.href || "#";

        if (item.icon) {
            link.appendChild(createIcon(item.icon));
        }

        const title = document.createElement("span");
        title.textContent = item.title || "Untitled";
        link.appendChild(title);

        if (item.disabled === true) {
            link.removeAttribute("href");
            link.setAttribute("aria-disabled", "true");
            link.classList.add("page-link-disabled");
        }

        if (item.disabled !== true && isCurrentLink(item.href)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

        return link;
    }

    /* =========================================
       CREATE NAVIGATION ITEM
    ========================================= */

    function createNavigationItem(item) {
        const li = document.createElement("li");
        li.className = "page-nav-item";

        const children = Array.isArray(item.children)
            ? item.children
            : [];

        if (children.length > 0) {
            li.classList.add("page-has-submenu");

            const parentLink = createLink(item);
            li.appendChild(parentLink);

            const submenu = document.createElement("ul");
            submenu.className = "page-submenu";

            let childIsActive = false;

            children.forEach(child => {
                const childItem = createNavigationItem(child);

                if (
                    childItem.classList.contains("page-item-active")
                ) {
                    childIsActive = true;
                }

                submenu.appendChild(childItem);
            });

            if (
                childIsActive ||
                parentLink.classList.contains("active")
            ) {
                li.classList.add("page-item-active");
            }

            li.appendChild(submenu);
        } else {
            const link = createLink(item);
            li.appendChild(link);

            if (link.classList.contains("active")) {
                li.classList.add("page-item-active");
            }
        }

        return li;
    }

    /* =========================================
       RENDER NAVIGATION
    ========================================= */

    function renderNavigation(items, force = false) {
        if (!Array.isArray(items) || items.length === 0) {
            showError("No navigation configured for this page.");
            return;
        }

        const dataKey = JSON.stringify(items);

        // Avoid unnecessary DOM replacement.
        if (!force && dataKey === lastRenderedData) {
            return;
        }

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            if (item && typeof item === "object") {
                fragment.appendChild(createNavigationItem(item));
            }
        });

        nav.replaceChildren(fragment);
        lastRenderedData = dataKey;
    }

    /* =========================================
       LOADING STATE
    ========================================= */

    function showLoading() {
        const li = document.createElement("li");
        li.className = "page-sidebar-loading";

        li.appendChild(createIcon("fas fa-spinner fa-spin"));

        const text = document.createElement("span");
        text.textContent = " Loading...";
        li.appendChild(text);

        nav.replaceChildren(li);
    }

    /* =========================================
       ERROR STATE
    ========================================= */

    function showError(message) {
        const li = document.createElement("li");
        li.className = "page-sidebar-error";
        li.textContent = message || "Navigation could not be loaded.";

        nav.replaceChildren(li);
    }

    /* =========================================
       CACHE
    ========================================= */

    function readCache() {
        try {
            const raw = localStorage.getItem(CONFIG.cacheKey);
            if (!raw) return null;

            const cached = JSON.parse(raw);

            if (
                cached &&
                cached.data &&
                typeof cached.timestamp === "number"
            ) {
                return cached;
            }
        } catch (error) {
            console.warn("Sidebar cache error:", error);
        }

        return null;
    }

    function saveCache(data) {
        try {
            localStorage.setItem(
                CONFIG.cacheKey,
                JSON.stringify({
                    data: data,
                    timestamp: Date.now()
                })
            );
        } catch (error) {
            console.warn("Sidebar cache could not be saved:", error);
        }
    }

    /* =========================================
       FETCH LATEST JSON
    ========================================= */

    async function fetchSidebarJSON() {
        const controller = new AbortController();
        const timeout = setTimeout(
            () => controller.abort(),
            CONFIG.fetchTimeout
        );

        try {
            const separator = CONFIG.jsonPath.includes("?")
                ? "&"
                : "?";

            const response = await fetch(
                CONFIG.jsonPath + separator + "_=" + Date.now(),
                {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        "Accept": "application/json"
                    },
                    signal: controller.signal
                }
            );

            if (!response.ok) {
                throw new Error("HTTP " + response.status);
            }

            const data = await response.json();

            if (
                !data ||
                typeof data !== "object" ||
                Array.isArray(data) ||
                !data.pages ||
                typeof data.pages !== "object"
            ) {
                throw new Error("Invalid sidebar JSON format");
            }

            return data;
        } finally {
            clearTimeout(timeout);
        }
    }

    /* =========================================
       LOAD NAVIGATION
    ========================================= */

    async function loadNavigation() {
        if (isLoading) return;
        isLoading = true;

        const cached = readCache();

        // Render cache immediately for faster first display.
        if (cached?.data) {
            renderNavigation(
                getPageNavigation(cached.data),
                true
            );
        } else {
            showLoading();
        }

        try {
            const data = await fetchSidebarJSON();
            const freshNavigation = getPageNavigation(data);

            // Save fresh JSON to cache.
            saveCache(data);

            // Render only if navigation has changed.
            renderNavigation(freshNavigation);
        } catch (error) {
            console.error("Sidebar loading error:", error);

            // Preserve cached links when network request fails.
            if (!cached?.data) {
                showError(
                    error.name === "AbortError"
                        ? "Navigation request timed out."
                        : "Navigation could not be loaded."
                );
            }
        } finally {
            isLoading = false;
        }
    }

    /* =========================================
       UPDATE ACTIVE LINK ON HASH CHANGE
    ========================================= */

    window.addEventListener("hashchange", () => {
        const cached = readCache();

        if (cached?.data) {
            renderNavigation(
                getPageNavigation(cached.data),
                true
            );
        }
    });

    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadNavigation();

})();