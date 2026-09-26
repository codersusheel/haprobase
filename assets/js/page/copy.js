document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // COPYHUB - COMPLETE SCRIPT
    // Local + GitHub Files Support
    // =========================================================


    const copyHub = document.getElementById("copyhub");

    if (!copyHub) return;


    // =========================================================
    // ICON
    // =========================================================

    function getIcon(type) {

        if (type === "link") {
            return "🔗";
        }

        if (type === "code") {
            return "💱";
        }

        if (type === "folder") {
            return "📁";
        }

        return "📋";
    }


    // =========================================================
    // GITHUB URL -> RAW URL
    // =========================================================

    function getRawGitHubURL(url) {

        try {

            const parsed = new URL(url);

            // ---------------------------------------------
            // Already raw.githubusercontent.com
            // ---------------------------------------------

            if (
                parsed.hostname ===
                "raw.githubusercontent.com"
            ) {

                return parsed.href;

            }


            // ---------------------------------------------
            // github.com/user/repo/blob/branch/file
            // ---------------------------------------------

            if (
                parsed.hostname === "github.com" &&
                parsed.pathname.includes("/blob/")
            ) {

                const parts =
                    parsed.pathname
                        .split("/")
                        .filter(Boolean);


                /*
                    parts example:

                    [
                        "codersusheel",
                        "Haproven-Ecosystem-Files",
                        "blob",
                        "main",
                        "assets",
                        "json",
                        "file.json"
                    ]
                */


                if (parts.length >= 5) {

                    const owner = parts[0];

                    const repo = parts[1];

                    const branch = parts[3];

                    const filePath =
                        parts
                            .slice(4)
                            .join("/");


                    return (
                        "https://raw.githubusercontent.com/" +
                        owner +
                        "/" +
                        repo +
                        "/" +
                        branch +
                        "/" +
                        filePath
                    );

                }

            }


            // Not GitHub
            return url;


        } catch (error) {

            console.error(
                "GitHub URL conversion failed:",
                error
            );

            return url;

        }

    }


    // =========================================================
    // GET FILE URL
    // =========================================================

    function getFileURL(filePath) {

        // ---------------------------------------------
        // Absolute URL
        // ---------------------------------------------

        if (
            filePath.startsWith("http://") ||
            filePath.startsWith("https://")
        ) {

            return getRawGitHubURL(filePath);

        }


        // ---------------------------------------------
        // Local file
        // ---------------------------------------------

        return new URL(
            filePath,
            window.location.origin
        ).href;

    }


    // =========================================================
    // GET FILE SAVE PATH
    // =========================================================

    function getSavePath(filePath) {

        try {

            const url = new URL(
                filePath,
                window.location.origin
            );


            // =================================================
            // GITHUB FILE
            // =================================================

            if (
                url.hostname === "github.com" &&
                url.pathname.includes("/blob/")
            ) {

                const parts =
                    url.pathname
                        .split("/")
                        .filter(Boolean);


                /*
                    Example:

                    /codersusheel/
                    Haproven-Ecosystem-Files/
                    blob/
                    main/
                    assets/
                    json/
                    file.json
                */


                if (parts.length >= 5) {

                    return parts
                        .slice(4)
                        .join("/");

                }

            }


            // =================================================
            // RAW GITHUB FILE
            // =================================================

            if (
                url.hostname ===
                "raw.githubusercontent.com"
            ) {

                const parts =
                    url.pathname
                        .split("/")
                        .filter(Boolean);


                /*
                    Example:

                    /codersusheel/
                    Haproven-Ecosystem-Files/
                    main/
                    assets/
                    json/
                    file.json
                */


                if (parts.length >= 4) {

                    return parts
                        .slice(3)
                        .join("/");

                }

            }


            // =================================================
            // LOCAL FILE
            // =================================================

            return url.pathname
                .replace(/^\/+/, "");


        } catch (error) {

            console.error(
                "Save path error:",
                error
            );

            return filePath
                .replace(/^\/+/, "");

        }

    }


    // =========================================================
    // CREATE COPY BUTTON
    // =========================================================

    function addCopyButton(li) {

        const link =
            li.querySelector("a");

        if (!link) return;


        // Prevent duplicate buttons

        if (
            li.querySelector(".copy-btn")
        ) {
            return;
        }


        const type =
            link.dataset.copy;


        const btn =
            document.createElement("button");


        btn.className =
            "copy-btn";


        btn.type =
            "button";


        btn.textContent =
            getIcon(type);


        btn.title =
            type === "link"
                ? "Copy Link"
                : type === "code"
                ? "Copy Code"
                : type === "folder"
                ? "Copy Folder"
                : "Copy Name";


        // =====================================================
        // COPY NAME
        // =====================================================

        btn.onclick = async () => {

            try {

                await navigator.clipboard.writeText(
                    link.textContent.trim()
                );


                btn.textContent = "✓";

                btn.classList.add(
                    "copied"
                );


                setTimeout(() => {

                    btn.textContent =
                        getIcon(type);

                    btn.classList.remove(
                        "copied"
                    );

                }, 1000);


            } catch (error) {

                console.error(
                    "Copy failed:",
                    error
                );

            }

        };


        li.appendChild(btn);

    }


    // =========================================================
    // ADD BUTTONS TO ALL ITEMS
    // =========================================================

    copyHub
        .querySelectorAll("li")
        .forEach(addCopyButton);


    // =========================================================
    // NORMAL LINK + CODE COPY
    // =========================================================

    copyHub
        .querySelectorAll("a")
        .forEach(link => {


            // Folder handled separately

            if (
                link.dataset.copy === "folder"
            ) {

                return;

            }


            link.addEventListener(
                "click",
                async event => {

                    event.preventDefault();


                    const oldText =
                        link.textContent;


                    try {

                        // -------------------------------------
                        // NORMAL LINK
                        // -------------------------------------

                        let text =
                            link.href;


                        // -------------------------------------
                        // CODE FILE
                        // -------------------------------------

                        if (
                            link.dataset.copy === "code"
                        ) {

                            const fileURL =
                                getFileURL(
                                    link.href
                                );


                            const response =
                                await fetch(
                                    fileURL,
                                    {
                                        cache:
                                            "no-store"
                                    }
                                );


                            if (!response.ok) {

                                throw new Error(
                                    "File not found"
                                );

                            }


                            text =
                                await response.text();

                        }


                        // -------------------------------------
                        // COPY
                        // -------------------------------------

                        await navigator.clipboard
                            .writeText(text);


                        link.textContent =
                            "Copied ✓";


                        setTimeout(() => {

                            link.textContent =
                                oldText;

                        }, 1000);


                    } catch (error) {

                        console.error(
                            "Copy error:",
                            error
                        );


                        link.textContent =
                            "Failed ✕";


                        setTimeout(() => {

                            link.textContent =
                                oldText;

                        }, 1500);

                    }

                }
            );

        });


    // =========================================================
    // FOLDER COPY
    // =========================================================

    copyHub
        .querySelectorAll(
            '[data-copy="folder"]'
        )
        .forEach(link => {


            link.addEventListener(
                "click",
                async event => {

                    event.preventDefault();


                    const oldText =
                        link.textContent.trim();


                    try {

                        // -------------------------------------
                        // BROWSER SUPPORT
                        // -------------------------------------

                        if (
                            !window.showDirectoryPicker
                        ) {

                            throw new Error(
                                "Folder access is not supported."
                            );

                        }


                        // -------------------------------------
                        // READ JSON
                        // -------------------------------------

                        link.textContent =
                            "Reading Files...";


                        const jsonURL =
                            new URL(
                                link.getAttribute(
                                    "href"
                                ),
                                window.location.href
                            );


                        const response =
                            await fetch(
                                jsonURL.href,
                                {
                                    cache:
                                        "no-store"
                                }
                            );


                        if (!response.ok) {

                            throw new Error(
                                "JSON file not found."
                            );

                        }


                        const files =
                            await response.json();


                        // -------------------------------------
                        // CHECK JSON
                        // -------------------------------------

                        if (
                            !Array.isArray(files) ||
                            files.length === 0
                        ) {

                            throw new Error(
                                "No files found in JSON."
                            );

                        }


                        // -------------------------------------
                        // SELECT DESTINATION
                        // -------------------------------------

                        link.textContent =
                            "Select Destination...";


                        const destination =
                            await window
                                .showDirectoryPicker({
                                    mode: "readwrite"
                                });


                        let copied = 0;

                        let failed = 0;


                        // =================================================
                        // COPY EACH FILE
                        // =================================================

                        for (
                            const filePath of files
                        ) {

                            try {

                                // -----------------------------------------
                                // FILE URL
                                // -----------------------------------------

                                const fileURL =
                                    getFileURL(
                                        filePath
                                    );


                                // -----------------------------------------
                                // FETCH FILE
                                // -----------------------------------------

                                const fileResponse =
                                    await fetch(
                                        fileURL,
                                        {
                                            cache:
                                                "no-store"
                                        }
                                    );


                                if (
                                    !fileResponse.ok
                                ) {

                                    throw new Error(
                                        "File not found"
                                    );

                                }


                                const blob =
                                    await fileResponse
                                        .blob();


                                // -----------------------------------------
                                // SAVE PATH
                                // -----------------------------------------

                                const savePath =
                                    getSavePath(
                                        filePath
                                    );


                                const parts =
                                    savePath
                                        .split("/")
                                        .filter(Boolean);


                                const fileName =
                                    parts.pop();


                                if (!fileName) {

                                    throw new Error(
                                        "Invalid file name"
                                    );

                                }


                                // -----------------------------------------
                                // CURRENT FOLDER
                                // -----------------------------------------

                                let currentFolder =
                                    destination;


                                // -----------------------------------------
                                // CREATE FOLDERS
                                // -----------------------------------------

                                for (
                                    const folderName
                                    of parts
                                ) {

                                    currentFolder =
                                        await currentFolder
                                            .getDirectoryHandle(
                                                folderName,
                                                {
                                                    create:
                                                        true
                                                }
                                            );

                                }


                                // -----------------------------------------
                                // CREATE FILE
                                // -----------------------------------------

                                const fileHandle =
                                    await currentFolder
                                        .getFileHandle(
                                            fileName,
                                            {
                                                create:
                                                    true
                                            }
                                        );


                                // -----------------------------------------
                                // WRITE FILE
                                // -----------------------------------------

                                const writable =
                                    await fileHandle
                                        .createWritable();


                                await writable.write(
                                    blob
                                );


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


                        // =================================================
                        // RESULT
                        // =================================================

                        if (
                            copied === files.length
                        ) {

                            link.textContent =
                                `Copied ✓ (${copied} files)`;


                        } else {

                            link.textContent =
                                `Copied ${copied}/${files.length} ⚠`;

                        }


                        setTimeout(() => {

                            link.textContent =
                                oldText;

                        }, 2500);


                    } catch (error) {


                        // -------------------------------------
                        // USER CANCELLED
                        // -------------------------------------

                        if (
                            error.name ===
                            "AbortError"
                        ) {

                            link.textContent =
                                oldText;

                            return;

                        }


                        console.error(
                            "Copy Error:",
                            error
                        );


                        link.textContent =
                            "Copy Failed ✕";


                        setTimeout(() => {

                            link.textContent =
                                oldText;

                        }, 2500);

                    }

                }
            );

        });

});