

document.querySelectorAll(".copy-link").forEach(link => {

    link.addEventListener("click", async function (event) {

        event.preventDefault();

        const originalText = this.textContent;

        try {

            await navigator.clipboard.writeText(this.href);

            this.textContent = "Link Copied!";

            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);

        } catch (error) {

            console.error("Copy failed:", error);

        }

    });

});