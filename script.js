

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

    document.querySelectorAll(".copy-link").forEach(function (link) {

        link.addEventListener("click", async function (event) {

            event.preventDefault();

            const originalText = this.textContent;
            const url = this.href;

            try {
                await navigator.clipboard.writeText(url);

                this.textContent = "Link Copied!";

                setTimeout(() => {
                    this.textContent = originalText;
                }, 1500);

            } catch (error) {
                console.error("Copy failed:", error);

                // Fallback for browsers where Clipboard API is unavailable
                const textarea = document.createElement("textarea");
                textarea.value = url;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";

                document.body.appendChild(textarea);
                textarea.select();

                try {
                    document.execCommand("copy");
                    this.textContent = "Link Copied!";

                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 1500);
                } catch (fallbackError) {
                    console.error("Fallback copy failed:", fallbackError);
                }

                document.body.removeChild(textarea);
            }
        });

    });

})();