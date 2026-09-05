/* =========================================================
   frame-guard.js
   Kaam: Page ko iframe me load hone se rokna (clickjacking guard),
   view-source: URL block karna, aur console me warning dikhana.
   Note: Iframe protection ke liye server-side header
   "X-Frame-Options: DENY" ya "Content-Security-Policy: frame-ancestors 'none'"
   lagana zyada reliable hai — ye script sirf backup layer hai.
   ========================================================= */
(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html",
        checkInterval: 500
    };

    let blocked = false;

    function go403() {
        if (blocked) return;
        blocked = true;
        window.location.replace(CONFIG.redirectURL);
    }

    /* Iframe / clickjacking check */
    function checkFrame() {
        if (blocked) return;
        try {
            if (window.top !== window.self) {
                go403();
            }
        } catch (error) {
            /* Cross-origin frame se access blocked - matlab bhi iframe me hai */
            go403();
        }
    }

    /* view-source: URL check */
    function checkViewSource() {
        if (blocked) return;
        const url = String(window.location.href);
        if (url.startsWith("view-source:")) {
            go403();
        }
    }

    /* Console warning - social engineering attacks (self-XSS) se bachne ke liye */
    function showConsoleWarning() {
        const style = "color:red; font-size:28px; font-weight:bold;";
        console.log("%cRuko!", style);
        console.log(
            "%cYe browser feature developers ke liye hai. Agar kisi ne aapko yahan " +
            "code paste karne ko kaha hai, to ho sakta hai wo aapke account/data " +
            "churane ki koshish kar raha ho.",
            "font-size:16px;"
        );
    }

    checkFrame();
    checkViewSource();
    showConsoleWarning();

    setInterval(() => {
        if (blocked) return;
        checkFrame();
        checkViewSource();
    }, CONFIG.checkInterval);

})();