

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

    document.addEventListener("click", function (event) {

        const link = event.target.closest(".copy-link");

        if (!link) return;

        event.preventDefault();

        const originalText = link.textContent;

        // Current page ke base se URL generate hoga
        const copyURL = new URL(
            link.getAttribute("href"),
            window.location.href
        ).href;

        function showCopied() {
            link.textContent = "Link Copied!";

            setTimeout(function () {
                link.textContent = originalText;
            }, 1500);
        }

        // Clipboard API
        if (navigator.clipboard) {

            navigator.clipboard.writeText(copyURL)
                .then(showCopied)
                .catch(function () {
                    fallbackCopy(copyURL);
                });

        } else {

            fallbackCopy(copyURL);

        }

        function fallbackCopy(text) {

            const textarea = document.createElement("textarea");

            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";

            document.body.appendChild(textarea);

            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            try {
                document.execCommand("copy");
                showCopied();
            } catch (error) {
                console.error("Copy failed:", error);
            }

            textarea.remove();
        }

    });

})();