

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
        const href = link.getAttribute("href");

        if (!href) return;

        // HaproBase path automatically add
        const baseURL = "https://codersusheel.github.io/haprobase/";

        const cleanPath = href
            .replace(/^https?:\/\/[^/]+/i, "")
            .replace(/^\/+/, "");

        const copyURL = baseURL + cleanPath;

        try {

            await navigator.clipboard.writeText(copyURL);

            link.textContent = "Link Copied!";

            setTimeout(() => {
                link.textContent = originalText;
            }, 1500);

        } catch (error) {

            // Fallback
            const textarea = document.createElement("textarea");

            textarea.value = copyURL;
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";

            document.body.appendChild(textarea);

            textarea.select();

            try {
                document.execCommand("copy");

                link.textContent = "Link Copied!";

                setTimeout(() => {
                    link.textContent = originalText;
                }, 1500);

            } catch (fallbackError) {
                console.error("Copy failed:", fallbackError);
            }

            textarea.remove();
        }

    });

})();