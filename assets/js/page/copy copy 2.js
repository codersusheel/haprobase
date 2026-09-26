



document.addEventListener("DOMContentLoaded", () => {

    // ---------------------------------------------
    // Auto add type icon to all CopyHub items
    // ---------------------------------------------

    document.querySelectorAll("#copyhub li").forEach(li => {

        const link = li.querySelector("a");

        if (!link) return;


        const type = link.dataset.copy;

        const btn = document.createElement("button");

        btn.className = "copy-btn";
        btn.type = "button";


        // ---------------------------------------------
        // Icon according to copy type
        // ---------------------------------------------

        if (type === "link") {

            btn.textContent = "⛓️‍💥";
            btn.title = "Copy Link";

        } else if (type === "code") {

            btn.textContent = "🌐";
            btn.title = "Copy Code";

        } else if (type === "folder") {

            btn.textContent = "📂";
            btn.title = "Copy Folder";

        } else {

            btn.textContent = "📋";
            btn.title = "Copy Name";

        }


        // ---------------------------------------------
        // Copy name
        // ---------------------------------------------

        btn.onclick = async () => {

            try {

                await navigator.clipboard.writeText(
                    link.textContent.trim()
                );

                btn.textContent = "✓";
                btn.classList.add("copied");


                setTimeout(() => {

                    if (type === "link") {
                        btn.textContent = "🔗";
                    } else if (type === "code") {
                        btn.textContent = "💻";
                    } else if (type === "folder") {
                        btn.textContent = "📁";
                    } else {
                        btn.textContent = "📋";
                    }

                    btn.classList.remove("copied");

                }, 1000);


            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        };


        li.appendChild(btn);

    });

});


// -----------------------------------------------------------------------------












document.addEventListener("DOMContentLoaded", () => {

    const copyHub = document.getElementById("copyhub");

    if (!copyHub) return;


    /* ================================
       NORMAL LINK + CODE COPY
    ================================= */

    copyHub.querySelectorAll("a").forEach(link => {

        /* Folder links ko yahan skip karo */
        if (link.dataset.copy === "folder") return;

        link.addEventListener("click", async (e) => {

            e.preventDefault();

            const oldText = link.textContent;

            try {

                let text = link.href;

                /* CODE COPY */
                if (link.dataset.copy === "code") {

                    const response = await fetch(link.href, {
                        mode: "cors"
                    });

                    if (!response.ok) {
                        throw new Error("File not found");
                    }

                    text = await response.text();
                }

                /* COPY */
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


    /* ================================
       FOLDER COPY
    ================================= */

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


                    /* JSON FILE */

                    link.textContent = "Reading Files...";

                    const jsonURL = new URL(
                        link.getAttribute("href"),
                        window.location.href
                    );

                    const response = await fetch(
                        jsonURL.href,
                        {
                            cache: "no-store"
                        }
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


                    /* DESTINATION FOLDER */

                    link.textContent =
                        "Select Destination...";

                    const destination =
                        await window.showDirectoryPicker({
                            mode: "readwrite"
                        });


                    let copied = 0;
                    let failed = 0;


                    /* COPY EACH FILE */

                    for (const filePath of files) {

                        try {

                            /* File URL */

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


                            /* Remove first "/" */

                            const cleanPath =
                                fileURL.pathname
                                    .replace(/^\/+/, "");


                            const parts =
                                cleanPath.split("/");


                            const fileName =
                                parts.pop();


                            let currentFolder =
                                destination;


                            /* CREATE FOLDERS */

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


                            /* CREATE / OVERWRITE FILE */

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


                    /* RESULT */

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















// =========================================================================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("#copyhub li").forEach(li => {

        const link = li.querySelector("a");

        if (!link) return;

        const type = link.dataset.copy;

        const btn = document.createElement("button");

        btn.className = "copy-btn";
        btn.type = "button";


        /* Icon according to type */

        if (type === "link") {

            btn.textContent = "🔗";

        } else if (type === "code") {

            btn.textContent = "💻";

        } else if (type === "folder") {

            btn.textContent = "📁";

        } else {

            btn.textContent = "📋";

        }


        /* Copy name */

        btn.onclick = async () => {

            try {

                await navigator.clipboard.writeText(
                    link.textContent.trim()
                );

                btn.textContent = "✓";
                btn.classList.add("copied");


                setTimeout(() => {

                    if (type === "link") {
                        btn.textContent = "🔗";
                    } else if (type === "code") {
                        btn.textContent = "💻";
                    } else if (type === "folder") {
                        btn.textContent = "📁";
                    } else {
                        btn.textContent = "📋";
                    }

                    btn.classList.remove("copied");

                }, 1000);


            } catch (error) {

                console.error("Copy failed:", error);

            }

        };


        li.appendChild(btn);

    });

});