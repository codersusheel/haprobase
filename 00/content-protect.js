/* =========================================================
   content-protect.js
   Kaam: Right-click, text-select, copy/cut, drag, print-screen
   attempt aur keyboard shortcuts (F12, Ctrl+U, Ctrl+S, etc) block
   karna. DevTools khulte hi ye 403.html par bhi redirect karega.
   ========================================================= */
(() => {
    "use strict";

    const CONFIG = {
        redirectURL: "/403.html"
    };

    let blocked = false;

    function go403() {
        if (blocked) return;
        blocked = true;
        window.location.replace(CONFIG.redirectURL);
    }

    /* Right click disable */
    document.addEventListener("contextmenu", (e) => e.preventDefault(), true);

    /* Text selection disable */
    document.addEventListener("selectstart", (e) => e.preventDefault(), true);

    /* Drag disable (images/links drag-out rokta hai) */
    document.addEventListener("dragstart", (e) => e.preventDefault(), true);

    /* Copy / Cut disable */
    document.addEventListener("copy", (e) => e.preventDefault(), true);
    document.addEventListener("cut", (e) => e.preventDefault(), true);

    /* Keyboard shortcuts block */
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
                (event.metaKey && event.altKey && key === "i"); // Mac Cmd+Opt+I

            if (restricted) {
                event.preventDefault();
                event.stopImmediatePropagation();
                go403();
            }
        },
        true
    );

    /* Long-press context menu block (mobile) */
    document.addEventListener(
        "touchstart",
        () => {
            /* placeholder: long-press menu ko rokne ke liye CSS
               user-select/touch-callout ka use content ke sath karein */
        },
        { passive: true }
    );

})();