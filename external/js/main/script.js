

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

            background: rgba(10, 10, 10, .88);

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
            color: #fff;
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












// (function () {

//     if (document.querySelector("#haproven-brand-style")) return;

//     const style = document.createElement("style");
//     style.id = "haproven-brand-style";

//     style.innerHTML = `

//     :root {
//         --hap-purple: #bc1be7;
//     }

//     .haproven-brand {
//         display: flex;
//         align-items: center;
//         width: max-content;
//         font-family: Inter, system-ui, sans-serif;
//         cursor: pointer;
//         user-select: none;
//         transition: transform .25s ease;
//     }

//     .haproven-brand:active {
//         transform: scale(.96);
//     }

//     /* ICON */
//     .haproven-icon {
//         position: relative;
//         width: 30px;
//         height: 40px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         flex-shrink: 0;
//         transition: transform .3s ease;
//     }

//     .haproven-brand:hover .haproven-icon {
//         transform: scale(1.04);
//     }

//     /* SHADOW */
//     .shadow-layer {
//         position: absolute;
//         width: 28px;
//         height: 37px;
//         top: -2px;
//         left: -2px;
//         opacity: .35;

//         background:
//             linear-gradient(
//                 135deg,
//                 var(--hap-purple),
//                 #ffffff55
//             );

//         clip-path: polygon(
//             0 0,
//             100% 0,
//             100% 100%,
//             50% 88%,
//             0 100%
//         );

//         border-radius: 5px 5px 0 0;
//     }

//     /* MAIN ICON */
//     .main-bookmark {
//         position: relative;
//         width: 25px;
//         height: 35px;

//         background:
//             linear-gradient(
//                 135deg,
//                 var(--hap-purple),
//                 #d94dff
//             );

//         clip-path: polygon(
//             0 0,
//             100% 0,
//             100% 100%,
//             50% 88%,
//             0 100%
//         );

//         border-radius: 5px 5px 0 0;

//         display: flex;
//         align-items: center;
//         justify-content: center;

//         z-index: 2;

//         box-shadow:
//             0 5px 12px rgba(188, 27, 231, .28);
//     }

//     /* SVG */
//     .haproven-icon svg {
//         width: 27px;
//         height: 27px;
//         margin-right: -3px;
//         fill: none;
//     }

//     .path-line {
//         stroke: #fff;
//         stroke-width: 6;
//         stroke-linecap: round;
//         stroke-linejoin: round;

//         stroke-dasharray: 260;
//         stroke-dashoffset: 260;

//         animation:
//             hapDraw 2.8s ease-in-out infinite;
//     }

//     /* TEXT BAR */
//     .brand-bar {
//         min-height: 25px;

//         padding: 1px 6px;

//         display: flex;
//         align-items: center;

//         margin-left: -2px;

//         border-radius: 0 7px 7px 0;

//         border: 2px solid var(--hap-purple);
//         border-left: none;

//         background: rgba(10, 10, 10, .88);

//         backdrop-filter: blur(8px);
//     }

//     .brand-text {
//         display: flex;
//         flex-direction: column;
//         line-height: 1;
//     }

//     .brand-text strong {
//         font-size: 10px;
//         font-weight: 900;
//         color: #fff;
//         letter-spacing: .2px;
//     }

//     .brand-text small {
//         font-size: 7px;
//         font-weight: 600;
//         opacity: .7;
//         margin-top: 2px;
//         letter-spacing: .25px;
//         text-transform: uppercase;
//     }

//     /* HOVER */
//     .haproven-brand:hover .main-bookmark {
//         box-shadow:
//             0 0 15px rgba(188, 27, 231, .5),
//             0 6px 16px rgba(188, 27, 231, .22);
//     }

//     /* ICON ONLY */
//     .haproven-brand.icon-only .brand-bar {
//         display: none;
//     }

//     /* ANIMATION */
//     @keyframes hapDraw {

//         0% {
//             stroke-dashoffset: 260;
//             opacity: .6;
//         }

//         50% {
//             stroke-dashoffset: 0;
//             opacity: 1;
//         }

//         100% {
//             stroke-dashoffset: -260;
//             opacity: .6;
//         }

//     }

//     `;

//     document.head.appendChild(style);


//     function initBrand(el) {

//         const brandName =
//             el.dataset.name || "Haproven";

//         const parts =
//             brandName.split(" by ");

//         let finalName =
//             `<strong>${brandName}</strong>`;

//         if (parts.length > 1) {

//             finalName = `
//                 <strong>${parts[0]}</strong>
//                 <small>by ${parts[1]}</small>
//             `;

//         }

//         el.innerHTML = `

//             <div class="haproven-icon">

//                 <div class="shadow-layer"></div>

//                 <div class="main-bookmark">

//                     <svg viewBox="0 0 100 100">

//                         <path
//                             class="path-line"
//                             d="
//                                 M10 0 L10 70
//                                 A10 10 0 0 0 30 70
//                                 L30 20
//                                 A10 10 0 0 1 50 20
//                                 L50 70
//                                 A16 9 0 0 0 70 80
//                                 A13 20 0 0 1 80 94
//                                 L100 95
//                             "
//                         />

//                     </svg>

//                 </div>

//             </div>

//             <div class="brand-bar">

//                 <span class="brand-text">
//                     ${finalName}
//                 </span>

//             </div>

//         `;
//     }


//     document.addEventListener("DOMContentLoaded", () => {

//         document
//             .querySelectorAll(".haproven-brand")
//             .forEach(initBrand);

//     });

// })();















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



























// // ============================================================
// // HAPROVEN LOGIN
// // Login UI + Demo Authentication
// // ============================================================

// (function () {

//     function initLogin() {

//         const loginButton =
//             document.getElementById("login-action");

//         if (!loginButton) return;

//         if (loginButton.dataset.loginReady === "true") {
//             return;
//         }

//         loginButton.dataset.loginReady = "true";


//         // ====================================================
//         // LOGIN BUTTON
//         // ====================================================

//         loginButton.addEventListener("click", function (event) {

//             event.preventDefault();

//             openLogin();

//         });

//     }


//     // ========================================================
//     // OPEN LOGIN
//     // ========================================================

//     function openLogin() {

//         if (document.getElementById("haproven-login")) {
//             return;
//         }


//         const popup =
//             document.createElement("div");

//         popup.id = "haproven-login";


//         popup.innerHTML = `

//             <div class="login-overlay">

//                 <div class="login-box">

//                     <button
//                         type="button"
//                         class="login-close"
//                         id="login-close"
//                     >
//                         ×
//                     </button>


//                     <div class="login-header">

//                         <i class="ri-login-circle-line"></i>

//                         <h2>Login</h2>

//                         <p>
//                             Login to your Haproven account
//                         </p>

//                     </div>


//                     <form id="haproven-login-form">

//                         <div class="login-field">

//                             <label>
//                                 Username or Email
//                             </label>

//                             <input
//                                 type="text"
//                                 id="login-username"
//                                 placeholder="Enter username or email"
//                                 autocomplete="username"
//                                 required
//                             >

//                         </div>


//                         <div class="login-field">

//                             <label>
//                                 Password
//                             </label>

//                             <input
//                                 type="password"
//                                 id="login-password"
//                                 placeholder="Enter password"
//                                 autocomplete="current-password"
//                                 required
//                             >

//                         </div>


//                         <button
//                             type="submit"
//                             class="login-submit"
//                         >
//                             <i class="ri-login-circle-line"></i>
//                             Login
//                         </button>


//                         <p
//                             id="login-message"
//                             class="login-message"
//                         ></p>

//                     </form>

//                 </div>

//             </div>

//         `;


//         document.body.appendChild(popup);

//         addLoginStyles();


//         // ====================================================
//         // CLOSE
//         // ====================================================

//         document
//             .getElementById("login-close")
//             .addEventListener(
//                 "click",
//                 closeLogin
//             );


//         // ====================================================
//         // LOGIN FORM
//         // ====================================================

//         document
//             .getElementById("haproven-login-form")
//             .addEventListener(
//                 "submit",
//                 handleLogin
//             );


//         // Overlay close

//         popup
//             .querySelector(".login-overlay")
//             .addEventListener(
//                 "click",
//                 function (event) {

//                     if (
//                         event.target ===
//                         event.currentTarget
//                     ) {

//                         closeLogin();

//                     }

//                 }
//             );

//     }


//     // ========================================================
//     // LOGIN
//     // ========================================================

//     function handleLogin(event) {

//         event.preventDefault();


//         const username =
//             document
//                 .getElementById("login-username")
//                 .value
//                 .trim();


//         const password =
//             document
//                 .getElementById("login-password")
//                 .value;


//         const message =
//             document.getElementById(
//                 "login-message"
//             );


//         if (!username || !password) {

//             message.textContent =
//                 "Please enter username and password.";

//             return;

//         }


//         // ====================================================
//         // DEMO LOGIN
//         // ====================================================

//         message.textContent =
//             "Checking login...";


//         setTimeout(function () {

//             /*
//                 DEMO LOGIN

//                 Username:
//                 demo

//                 Password:
//                 123456
//             */

//             if (
//                 username === "demo" &&
//                 password === "123456"
//             ) {

//                 const user = {

//                     username: "demo",

//                     name: "Demo User",

//                     login: true

//                 };


//                 localStorage.setItem(
//                     "haproven_user",
//                     JSON.stringify(user)
//                 );


//                 message.textContent =
//                     "Login successful!";


//                 setTimeout(function () {

//                     closeLogin();

//                 }, 1000);


//             } else {

//                 message.textContent =
//                     "Invalid username or password.";

//             }

//         }, 700);

//     }


//     // ========================================================
//     // CLOSE LOGIN
//     // ========================================================

//     function closeLogin() {

//         const popup =
//             document.getElementById(
//                 "haproven-login"
//             );

//         if (popup) {
//             popup.remove();
//         }

//     }


//     // ========================================================
//     // LOGIN CSS
//     // ========================================================

//     function addLoginStyles() {

//         if (
//             document.getElementById(
//                 "haproven-login-style"
//             )
//         ) {
//             return;
//         }


//         const style =
//             document.createElement("style");


//         style.id =
//             "haproven-login-style";


//         style.textContent = `

//             .login-overlay {

//                 position: fixed;

//                 inset: 0;

//                 z-index: 99999;

//                 display: flex;

//                 align-items: center;

//                 justify-content: center;

//                 padding: 20px;

//                 background:
//                     rgba(0, 0, 0, .65);

//                 backdrop-filter:
//                     blur(8px);

//             }


//             .login-box {

//                 position: relative;

//                 width: 100%;

//                 max-width: 390px;

//                 padding: 32px 25px;

//                 box-sizing: border-box;

//                 background: #fff;

//                 border-radius: 18px;

//                 box-shadow:
//                     0 20px 60px
//                     rgba(0, 0, 0, .3);

//             }


//             .login-close {

//                 position: absolute;

//                 top: 8px;

//                 right: 14px;

//                 border: none;

//                 background: none;

//                 font-size: 28px;

//                 cursor: pointer;

//                 color: #555;

//             }


//             .login-header {

//                 text-align: center;

//                 margin-bottom: 25px;

//             }


//             .login-header > i {

//                 font-size: 45px;

//                 color: #bc1be7;

//             }


//             .login-header h2 {

//                 margin: 10px 0 5px;

//             }


//             .login-header p {

//                 margin: 0;

//                 color: #777;

//                 font-size: 14px;

//             }


//             .login-field {

//                 margin-bottom: 16px;

//             }


//             .login-field label {

//                 display: block;

//                 margin-bottom: 6px;

//                 font-size: 14px;

//                 font-weight: 600;

//             }


//             .login-field input {

//                 width: 100%;

//                 box-sizing: border-box;

//                 padding: 12px;

//                 border: 1px solid #ddd;

//                 border-radius: 8px;

//                 outline: none;

//                 font-size: 14px;

//             }


//             .login-field input:focus {

//                 border-color: #bc1be7;

//                 box-shadow:
//                     0 0 0 3px
//                     rgba(188, 27, 231, .1);

//             }


//             .login-submit {

//                 width: 100%;

//                 border: none;

//                 padding: 12px;

//                 border-radius: 8px;

//                 background: #bc1be7;

//                 color: #fff;

//                 font-size: 15px;

//                 font-weight: 600;

//                 cursor: pointer;

//             }


//             .login-submit:hover {

//                 opacity: .9;

//             }


//             .login-message {

//                 min-height: 20px;

//                 margin: 12px 0 0;

//                 text-align: center;

//                 font-size: 13px;

//             }

//         `;


//         document.head.appendChild(style);

//     }


//     // ========================================================
//     // DOM READY
//     // Works with hub.js
//     // ========================================================

//     if (document.readyState === "loading") {

//         document.addEventListener(
//             "DOMContentLoaded",
//             initLogin
//         );

//     } else {

//         initLogin();

//     }

// })();












// // ============================================================
// // HAPROVEN LOGIN
// // Demo Login Component
// // ============================================================

// (function () {

//     function initLogin() {

//         const loginButton =
//             document.getElementById("login-action");

//         if (!loginButton) return;

//         if (loginButton.dataset.loginReady === "true") {
//             return;
//         }

//         loginButton.dataset.loginReady = "true";


//         // ====================================================
//         // LOGIN BUTTON
//         // ====================================================

//         loginButton.addEventListener("click", function (event) {

//             event.preventDefault();

//             openLoginDemo();

//         });

//     }


//     // ========================================================
//     // OPEN LOGIN DEMO
//     // ========================================================

//     function openLoginDemo() {

//         if (document.getElementById("haproven-login-demo")) {
//             return;
//         }


//         const popup =
//             document.createElement("div");

//         popup.id =
//             "haproven-login-demo";


//         popup.innerHTML = `

//             <div class="login-overlay">

//                 <div class="login-box">

//                     <button
//                         class="login-close"
//                         type="button"
//                     >
//                         ×
//                     </button>

//                     <i class="ri-login-circle-line login-icon"></i>

//                     <h2>Login</h2>

//                     <p>
//                         Haproven Login Demo
//                     </p>

//                     <button
//                         type="button"
//                         class="login-demo-btn"
//                     >
//                         Demo Login
//                     </button>

//                 </div>

//             </div>

//         `;


//         document.body.appendChild(popup);

//         addLoginStyle();


//         // Close
//         popup
//             .querySelector(".login-close")
//             .addEventListener(
//                 "click",
//                 closeLoginDemo
//             );


//         // Overlay close
//         popup
//             .querySelector(".login-overlay")
//             .addEventListener(
//                 "click",
//                 function (event) {

//                     if (
//                         event.target ===
//                         event.currentTarget
//                     ) {

//                         closeLoginDemo();

//                     }

//                 }
//             );


//         // Demo Login
//         popup
//             .querySelector(".login-demo-btn")
//             .addEventListener(
//                 "click",
//                 function () {

//                     alert(
//                         "Login system will be connected here."
//                     );

//                 }
//             );

//     }


//     // ========================================================
//     // CLOSE LOGIN
//     // ========================================================

//     function closeLoginDemo() {

//         const popup =
//             document.getElementById(
//                 "haproven-login-demo"
//             );

//         if (popup) {
//             popup.remove();
//         }

//     }


//     // ========================================================
//     // LOGIN CSS
//     // ========================================================

//     function addLoginStyle() {

//         if (
//             document.getElementById(
//                 "haproven-login-style"
//             )
//         ) {
//             return;
//         }


//         const style =
//             document.createElement("style");


//         style.id =
//             "haproven-login-style";


//         style.textContent = `

//             .login-overlay {

//                 position: fixed;
//                 inset: 0;

//                 z-index: 99999;

//                 display: flex;
//                 align-items: center;
//                 justify-content: center;

//                 padding: 20px;

//                 background:
//                     rgba(0, 0, 0, .65);

//                 backdrop-filter:
//                     blur(8px);

//             }


//             .login-box {

//                 position: relative;

//                 width: 100%;
//                 max-width: 380px;

//                 padding: 35px 25px;

//                 text-align: center;

//                 background: #fff;

//                 border-radius: 18px;

//                 box-shadow:
//                     0 20px 60px
//                     rgba(0, 0, 0, .3);

//             }


//             .login-icon {

//                 font-size: 48px;

//                 color: #bc1be7;

//             }


//             .login-box h2 {

//                 margin: 12px 0 8px;
//                color: #191919;

//             }


//             .login-box p {

//                 margin-bottom: 22px;

//                 color: #666;

//             }


//             .login-demo-btn {

//                 border: none;

//                 padding: 11px 25px;

//                 border-radius: 8px;

//                 background: #bc1be7;

//                 color: #fff;

//                 cursor: pointer;

//             }


//             .login-close {

//                 position: absolute;

//                 top: 8px;
//                 right: 14px;

//                 border: none;

//                 background: transparent;

//                 font-size: 28px;

//                 cursor: pointer;

//             }

//         `;


//         document.head.appendChild(style);

//     }


//     // ========================================================
//     // DOM READY + HUB.JS SUPPORT
//     // ========================================================

//     if (document.readyState === "loading") {

//         document.addEventListener(
//             "DOMContentLoaded",
//             initLogin
//         );

//     } else {

//         initLogin();

//     }

// })();


























/* =========================================================
   anti-inspect.js  (v4 - hardened, no-flash version)

   IMPORTANT SETUP - is script ko har protected page ke <head>
   me SABSE PEHLE (upar) rakhein, aur head me ye style bhi daalein
   taaki check poora hone tak page ka content bilkul na dikhe:

   <head>
     <style>html{visibility:hidden}</style>
     <script src="anti-inspect.js"></script>
     ... baaki head content ...
   </head>

   Kaam:
   1. Script sabse pehle chalte hi (body render hone se pehle)
      turant check karta hai - agar devtools khula hai ya lock
      laga hai, to page kabhi dikhta hi nahi, seedha 403 par
      chala jata hai.
   2. Check clean aaye to hi html visible hota hai.
   3. sessionStorage lock - jab tak devtools band na ho, kisi bhi
      tarah (URL edit, back button, refresh) page kholne par
      turant 403 par bhej dega.
   4. pageshow listener - bfcache (back/forward cache) se restore
      hone par bhi turant re-check + force reload.
   5. Har 250ms par continuous monitoring - agar page khula rehte
      hue beech me devtools khola gaya to turant pakda jayega.
   6. Console block - console.log/warn/error/info/debug/table sab
      no-op (khaali) kar diye gaye hain, taaki koi console me kuch
      print ya inspect na kar sake, aur console.clear() se DevTools
      khule hote hi console saaf ho jata hai.
   ========================================================= */
(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html",
        checkInterval: 250,
        sizeThreshold: 160,
        timingThreshold: 100,
        lockKey: "dt_lock"
    };

    let blocked = false;

    function isLocked() {
        try {
            return sessionStorage.getItem(CONFIG.lockKey) === "1";
        } catch (e) {
            return false;
        }
    }

    function setLock() {
        try {
            sessionStorage.setItem(CONFIG.lockKey, "1");
        } catch (e) { /* ignore */ }
    }

    function clearLock() {
        try {
            sessionStorage.removeItem(CONFIG.lockKey);
        } catch (e) { /* ignore */ }
    }

    function go403() {
        setLock();
        /* Jis page se redirect ho raha hai uska URL save karo -
           taaki 403.html ka "Wapas Jayein" button reliably usi
           page par le jaa sake (browser history ke bharose nahi
           rehna, kyunki location.replace history entry ko
           overwrite kar deta hai) */
        try {
            sessionStorage.setItem("dt_return", window.location.href);
        } catch (e) { /* ignore */ }

        if (blocked) return;
        blocked = true;
        window.location.replace(CONFIG.redirectURL);
    }

    function reveal() {
        /* Sirf tabhi page dikhao jab sab kuch clean ho */
        document.documentElement.style.visibility = "visible";
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    /* =========================================
       CONSOLE BLOCK
       Console ke saare common methods ko no-op (khaali function)
       bana diya jata hai, taaki:
       - Koi console.log/error/warn se aapke code ka output na
         dekh sake
       - Koi console me manually kuch print/inspect na kar sake
       ========================================================= */
    function disableConsole() {
        const noop = function () {};
        const methods = [
            "log", "warn", "error", "info", "debug",
            "table", "trace", "dir", "dirxml", "group",
            "groupCollapsed", "groupEnd", "assert", "count",
            "time", "timeEnd", "profile", "profileEnd"
        ];

        methods.forEach((method) => {
            try {
                console[method] = noop;
            } catch (e) { /* ignore agar overridable na ho */ }
        });
    }

    disableConsole();

    /* Method 1: window size difference (docked devtools) */
    function checkBySize() {
        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;
        return widthDiff > CONFIG.sizeThreshold || heightDiff > CONFIG.sizeThreshold;
    }

    /* Method 2: debugger timing trick (undocked devtools) */
    function checkByTiming() {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        return (end - start) > CONFIG.timingThreshold;
    }

    function isDevToolsOpenNow() {
        if (isMobile()) return false;
        return checkBySize() || checkByTiming();
    }

    /* =========================================
       IMMEDIATE GATE CHECK (blocking, sabse pehle chalta hai)
       ========================================= */

    function gateCheck() {
        if (isLocked()) {
            go403();
            return false;
        }
        if (isDevToolsOpenNow()) {
            go403();
            return false;
        }
        return true;
    }

    /* Ye turant, synchronously chalta hai - script load hote hi.
       Agar page HTML abhi tak parse ho raha hai, browser is
       script (non-async/non-defer) ko turant execute karega aur
       tab tak aage ka HTML parse nahi karega, isliye body content
       tab tak render hi nahi hota. */
    const initialResult = gateCheck();
    if (initialResult) {
        /* DOM ready hote hi visible karo */
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", reveal);
        } else {
            reveal();
        }
    }

    /* =========================================
       CONTENT PROTECTION (right-click / copy / keys)
       ========================================= */

    /* =========================================
       CONTENT PROTECTION (selective)
       Text select/copy allow hai. Sirf images, videos, aur links
       (<a> tags) par right-click, drag, aur copy block kiya gaya
       hai - taaki wo save/copy na ho sakein.
       ========================================= */

    /* Kisi element ke andar img/video/a hai ya nahi, ye check karta hai */
    function isProtectedTarget(el) {
        if (!el || !el.closest) return false;
        return !!el.closest("img, video, a, picture, svg");
    }

    /* Right-click block - sirf media/link par, baaki page par
       normal right-click (copy text option ke saath) allow hai */
    document.addEventListener(
        "contextmenu",
        (e) => {
            if (isProtectedTarget(e.target)) {
                e.preventDefault();
            }
        },
        true
    );

    /* Drag block - images/videos/links ko drag karke save/copy
       na kiya ja sake */
    document.addEventListener(
        "dragstart",
        (e) => {
            if (isProtectedTarget(e.target)) {
                e.preventDefault();
            }
        },
        true
    );

    /* Copy event block - agar selection me koi image/video/link
       shamil ho to copy hone se roko. Sirf plain text copy hone
       diya jayega. */
    document.addEventListener(
        "copy",
        (e) => {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);
            const container = range.cloneContents();

            const hasProtectedContent =
                container.querySelector &&
                container.querySelector("img, video, a, picture, svg");

            if (hasProtectedContent) {
                e.preventDefault();
            }
        },
        true
    );

    document.addEventListener(
        "keydown",
        (event) => {
            const key = String(event.key).toLowerCase();
            const restricted =
                event.key === "F12" ||
                event.key === "PrintScreen" ||
                (event.ctrlKey && event.shiftKey && key === "i") ||
                (event.ctrlKey && event.shiftKey && key === "j") ||
                (event.ctrlKey && event.shiftKey && key === "c") ||
                (event.ctrlKey && event.shiftKey && key === "k") ||
                (event.ctrlKey && key === "u") ||
                (event.ctrlKey && key === "s") ||
                (event.ctrlKey && key === "p") ||
                (event.metaKey && event.altKey && key === "i");

            if (restricted) {
                event.preventDefault();
                event.stopImmediatePropagation();
                go403();
            }
        },
        true
    );

    /* =========================================
       IFRAME / VIEW-SOURCE PROTECTION
       ========================================= */

    function checkFrame() {
        if (blocked) return;
        try {
            if (window.top !== window.self) go403();
        } catch (error) {
            go403();
        }
    }

    function checkViewSource() {
        if (blocked) return;
        if (String(window.location.href).startsWith("view-source:")) go403();
    }

    /* =========================================
       BFCACHE / BACK-BUTTON FIX
       ========================================= */

    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            window.location.reload();
        } else {
            gateCheck();
            checkFrame();
            checkViewSource();
        }
    });

    /* Tab dobara active hote hi bhi check karo (alt-tab karke
       kisi ne devtools khola ho to) */
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            gateCheck();
        }
    });

    /* =========================================
       CONTINUOUS MONITORING
       requestAnimationFrame loop use kiya hai (setInterval ke bajaye) -
       ye har browser frame (~16ms, yani 1 second me ~60 baar) check
       karta hai, isliye DevTools jaise hi khulta hai (chahe F12 se,
       right-click se, address-bar-focused F12 se, ya menu se) -
       turant (visually instant) pakda jayega.
       ========================================= */

    checkFrame();
    checkViewSource();

    window.addEventListener("resize", gateCheck);

    function monitorLoop() {
        if (blocked) return;
        gateCheck();
        checkFrame();
        checkViewSource();
        requestAnimationFrame(monitorLoop);
    }
    requestAnimationFrame(monitorLoop);

})();