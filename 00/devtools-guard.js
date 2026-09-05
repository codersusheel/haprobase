/* =========================================================
   devtools-guard.js
   Kaam: DevTools open detect karke 403.html par redirect karna
   Ise har protected page ke <head> me <script src="devtools-guard.js"></script>
   se include karein.
   ========================================================= */
(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html",
        checkInterval: 400,
        sizeThreshold: 160,
        timingThreshold: 100
    };

    let blocked = false;

    function go403() {
        if (blocked) return;
        blocked = true;
        window.location.replace(CONFIG.redirectURL);
    }

    function isMobile() {
        return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
    }

    /* Method 1: outer/inner window size gap (docked devtools) */
    function checkBySize() {
        const widthGap = Math.abs(window.outerWidth - window.innerWidth);
        const heightGap = Math.abs(window.outerHeight - window.innerHeight);
        return widthGap > CONFIG.sizeThreshold || heightGap > CONFIG.sizeThreshold;
    }

    /* Method 2: debugger statement timing trick (undocked / console) */
    function checkByTiming() {
        const start = performance.now();
        // eslint-disable-next-line no-debugger
        debugger;
        const end = performance.now();
        return (end - start) > CONFIG.timingThreshold;
    }

    /* Method 3: console object toString trap
       Jab console panel khula hota hai to console.log ke argument ka
       toString() call hota hai (object inspect karne ke liye) */
    function checkByConsoleTrap() {
        let triggered = false;
        const trap = {};
        Object.defineProperty(trap, "id", {
            get() {
                triggered = true;
                return "trap";
            }
        });
        console.log(trap);
        console.clear();
        return triggered;
    }

    function checkDevTools() {
        if (blocked || isMobile()) return;

        if (checkBySize() || checkByTiming() || checkByConsoleTrap()) {
            go403();
        }
    }

    window.addEventListener("resize", checkDevTools);
    setInterval(checkDevTools, CONFIG.checkInterval);
    checkDevTools();

})();