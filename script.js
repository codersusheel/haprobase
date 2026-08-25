

// document.querySelectorAll(".copy-link").forEach(link => {

//     link.addEventListener("click", async function (event) {

//         event.preventDefault();

//         const originalText = this.textContent;

//         try {

//             await navigator.clipboard.writeText(this.href);

//             this.textContent = "Link Copied!";

//             setTimeout(() => {
//                 this.textContent = originalText;
//             }, 1500);

//         } catch (error) {

//             console.error("Copy failed:", error);

//         }

//     });

// });
















(function () {
    "use strict";

    document.addEventListener("click", async function (event) {

        const link = event.target.closest(".copy-link");

        if (!link) return;

        event.preventDefault();

        const originalText = link.textContent;

        // href ko complete URL mein convert karo
        const href = link.getAttribute("href");

        if (!href) return;

        const copyURL = new URL(href, window.location.href).href;

        try {

            // Modern Clipboard API
            if (navigator.clipboard && window.isSecureContext) {

                await navigator.clipboard.writeText(copyURL);

            } else {

                // Fallback
                const textarea = document.createElement("textarea");

                textarea.value = copyURL;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                textarea.style.top = "-9999px";

                document.body.appendChild(textarea);

                textarea.focus();
                textarea.select();

                document.execCommand("copy");

                textarea.remove();
            }

            link.textContent = "Link Copied!";

            setTimeout(() => {
                link.textContent = originalText;
            }, 1500);

        } catch (error) {

            console.error("Copy failed:", error);

            link.textContent = "Copy Failed!";

            setTimeout(() => {
                link.textContent = originalText;
            }, 1500);
        }

    });

})();