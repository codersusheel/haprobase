
document.addEventListener("click", function (event) {
    const link = event.target.closest(".tree-item a");

    if (!link) return;

    link.classList.add("clicked");
});





// =====================
// text copy link
// =====================
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








// =====================
// file/code copy link
// =====================

(function () {
    "use strict";

    document.addEventListener("click", async function (event) {

        const link = event.target.closest(".copy-file");

        if (!link) return;

        event.preventDefault();

        const originalText = link.textContent.trim();
        const filePath = link.dataset.file;

        if (!filePath) {
            console.error("data-file missing");
            return;
        }

        try {
            link.textContent = "Copying...";

            // Current website ke same domain se 1.txt load
            const response = await fetch(filePath, {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error(
                    `File not found: ${response.status}`
                );
            }

            const code = await response.text();

            if (!code.trim()) {
                throw new Error("TXT file is empty");
            }

            await navigator.clipboard.writeText(code);

            link.textContent = "✓ Code Copied!";

        } catch (error) {

            console.error("Copy error:", error);

            link.textContent = "✕ Failed";

        }

        setTimeout(() => {
            link.textContent = originalText;
        }, 1800);

    });

})();






