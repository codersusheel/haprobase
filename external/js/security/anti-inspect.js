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

    document.addEventListener("contextmenu", (e) => e.preventDefault(), true);
    document.addEventListener("selectstart", (e) => e.preventDefault(), true);
    document.addEventListener("dragstart", (e) => e.preventDefault(), true);
    document.addEventListener("copy", (e) => e.preventDefault(), true);
    document.addEventListener("cut", (e) => e.preventDefault(), true);

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