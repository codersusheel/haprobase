document.addEventListener("DOMContentLoaded", () => {

    const copyHub = document.getElementById("copyhub");

    if (!copyHub) return;

    copyHub.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", async (e) => {

            e.preventDefault();

            const oldText = link.textContent;

            try {

                let text = link.href;

                if (link.dataset.copy === "code") {

                    const response = await fetch(link.href, {
                        mode: "cors"
                    });

                    if (!response.ok) {
                        throw new Error("File not found");
                    }

                    text = await response.text();
                }

                await navigator.clipboard.writeText(text);

                link.textContent = "Copied ✓";

                setTimeout(() => {
                    link.textContent = oldText;
                }, 1000);

            } catch (error) {

                console.error("Copy error:", error);

                link.textContent = "Failed ✕";

                setTimeout(() => {
                    link.textContent = oldText;
                }, 1500);
            }

        });

    });

});