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













document.addEventListener("DOMContentLoaded", () => {

    const copyHub = document.getElementById("copyhub");

    if (!copyHub) return;

    copyHub
        .querySelectorAll('[data-copy="folder"]')
        .forEach(link => {

            link.addEventListener("click", async (e) => {

                e.preventDefault();

                const oldText = link.textContent.trim();

                try {

                    /* Browser support */
                    if (!window.showDirectoryPicker) {
                        throw new Error(
                            "Folder access is not supported."
                        );
                    }

                    /* JSON file */
                    link.textContent = "Reading Files...";

                    const jsonURL = new URL(
                        link.getAttribute("href"),
                        window.location.href
                    );

                    const response = await fetch(
                        jsonURL.href,
                        { cache: "no-store" }
                    );

                    if (!response.ok) {
                        throw new Error(
                            "JSON file not found."
                        );
                    }

                    const files = await response.json();

                    if (
                        !Array.isArray(files) ||
                        files.length === 0
                    ) {
                        throw new Error(
                            "No files found in JSON."
                        );
                    }

                    /* Destination folder */
                    link.textContent =
                        "Select Destination...";

                    const destination =
                        await window.showDirectoryPicker({
                            mode: "readwrite"
                        });

                    let copied = 0;
                    let failed = 0;

                    /* Copy files */
                    for (const filePath of files) {

                        try {

                            /*
                             * JSON path:
                             * /assets/css/common.css
                             */
                            const fileURL = new URL(
                                filePath,
                                window.location.origin
                            );

                            /* Fetch file */
                            const fileResponse =
                                await fetch(
                                    fileURL.href,
                                    {
                                        cache: "no-store"
                                    }
                                );

                            if (!fileResponse.ok) {
                                failed++;
                                continue;
                            }

                            const blob =
                                await fileResponse.blob();

                            /*
                             * Remove first /
                             *
                             * assets/css/common.css
                             */
                            const cleanPath =
                                fileURL.pathname
                                    .replace(/^\/+/, "");

                            const parts =
                                cleanPath.split("/");

                            const fileName =
                                parts.pop();

                            let currentFolder =
                                destination;

                            /*
                             * Create complete folder structure
                             */
                            for (const folderName of parts) {

                                if (!folderName) continue;

                                currentFolder =
                                    await currentFolder
                                        .getDirectoryHandle(
                                            folderName,
                                            {
                                                create: true
                                            }
                                        );
                            }

                            /*
                             * Create / overwrite file
                             */
                            const fileHandle =
                                await currentFolder
                                    .getFileHandle(
                                        fileName,
                                        {
                                            create: true
                                        }
                                    );

                            const writable =
                                await fileHandle
                                    .createWritable();

                            await writable.write(blob);

                            await writable.close();

                            copied++;

                            link.textContent =
                                `Copying ${copied}/${files.length}...`;

                        } catch (fileError) {

                            console.error(
                                "File failed:",
                                filePath,
                                fileError
                            );

                            failed++;
                        }
                    }

                    /* Result */
                    if (copied === files.length) {

                        link.textContent =
                            `Copied ✓ (${copied} files)`;

                    } else {

                        link.textContent =
                            `Copied ${copied}/${files.length} ⚠`;
                    }

                    setTimeout(() => {
                        link.textContent = oldText;
                    }, 2500);

                } catch (error) {

                    /* User cancelled */
                    if (error.name === "AbortError") {
                        link.textContent = oldText;
                        return;
                    }

                    console.error(
                        "Copy Error:",
                        error
                    );

                    link.textContent =
                        "Copy Failed ✕";

                    setTimeout(() => {
                        link.textContent = oldText;
                    }, 2500);
                }

            });

        });

});

