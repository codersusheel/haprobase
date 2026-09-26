(() => {

    "use strict";

    // ==========================================
    // PROTECTED PAGES
    // ==========================================

    const PROTECTED_PAGES = [
        "/pages/",
        "/pages/admin.html",
        "/pages/dashboard.html"
    ];

    // ==========================================
    // 5 PASSWORDS
    // ==========================================

    const PASSWORDS = [
        "haproven",
        "etnar",
        "haproid",
        "gitprohub",
        "proaccess"
    ];

    // ==========================================
    // STORAGE KEYS
    // ==========================================

    const ACCESS_KEY = "page_access_granted";
    const ACCESS_TIME_KEY = "page_access_time";

    // ==========================================
    // ACCESS DURATION
    // 24 HOURS
    // ==========================================

    const ACCESS_DURATION = 24 * 60 * 60 * 1000;

    // ==========================================
    // PASSWORD PAGE
    // ==========================================

    const PASSWORD_PAGE = "/password.html";

    // ==========================================
    // CURRENT PATH
    // ==========================================

    const currentPath =
        window.location.pathname.replace(/\/+$/, "") || "/";

    // ==========================================
    // CHECK PROTECTED PAGE
    // ==========================================

    const isProtectedPage = PROTECTED_PAGES.some(page => {

        const cleanPage =
            page.replace(/\/+$/, "");

        return currentPath === cleanPage;

    });

    // ==========================================
    // CHECK SAVED ACCESS
    // ==========================================

    const accessGranted =
        sessionStorage.getItem(ACCESS_KEY) === "true";

    const accessTime =
        Number(
            sessionStorage.getItem(
                ACCESS_TIME_KEY
            )
        );

    const currentTime = Date.now();

    // ==========================================
    // CHECK 24-HOUR VALIDITY
    // ==========================================

    let hasAccess = false;

    if (
        accessGranted &&
        accessTime &&
        (currentTime - accessTime) < ACCESS_DURATION
    ) {

        hasAccess = true;

    } else {

        // ======================================
        // ACCESS EXPIRED
        // ======================================

        sessionStorage.removeItem(
            ACCESS_KEY
        );

        sessionStorage.removeItem(
            ACCESS_TIME_KEY
        );

        hasAccess = false;
    }

    // ==========================================
    // PROTECTED PAGE REDIRECT
    // ==========================================

    if (isProtectedPage && !hasAccess) {

        const returnUrl =
            window.location.pathname +
            window.location.search +
            window.location.hash;

        window.location.replace(
            PASSWORD_PAGE +
            "?return=" +
            encodeURIComponent(returnUrl)
        );

        return;
    }

    // ==========================================
    // PASSWORD PAGE LOGIC
    // ==========================================

    if (currentPath === PASSWORD_PAGE) {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const returnUrl =
            params.get("return");

        const form =
            document.getElementById(
                "passwordForm"
            );

        const input =
            document.getElementById(
                "passwordInput"
            );

        const error =
            document.getElementById(
                "passwordError"
            );

        if (!form || !input) return;

        // ======================================
        // PASSWORD SUBMIT
        // ======================================

        form.addEventListener(
            "submit",
            function (e) {

                e.preventDefault();

                const enteredPassword =
                    input.value.trim();

                // ==================================
                // CHECK 5 PASSWORDS
                // ==================================

                if (
                    PASSWORDS.includes(
                        enteredPassword
                    )
                ) {

                    // ==============================
                    // SAVE ACCESS
                    // ==============================

                    sessionStorage.setItem(
                        ACCESS_KEY,
                        "true"
                    );

                    sessionStorage.setItem(
                        ACCESS_TIME_KEY,
                        Date.now().toString()
                    );

                    // ==============================
                    // RETURN TO REQUESTED PAGE
                    // ==============================

                    if (returnUrl) {

                        window.location.replace(
                            returnUrl
                        );

                    } else {

                        window.location.replace(
                            "/"
                        );

                    }

                } else {

                    // ==============================
                    // WRONG PASSWORD
                    // ==============================

                    error.textContent =
                        "Incorrect password. Please try again.";

                    input.value = "";

                    input.focus();
                }

            }
        );

        // ======================================
        // PAGE SHOW / BACK BUTTON
        // ======================================

        window.addEventListener(
            "pageshow",
            function () {

                const savedTime =
                    Number(
                        sessionStorage.getItem(
                            ACCESS_TIME_KEY
                        )
                    );

                const validAccess =
                    sessionStorage.getItem(
                        ACCESS_KEY
                    ) === "true" &&
                    savedTime &&
                    (Date.now() - savedTime) <
                    ACCESS_DURATION;

                // ==============================
                // ACCESS EXPIRED
                // ==============================

                if (!validAccess) {

                    sessionStorage.removeItem(
                        ACCESS_KEY
                    );

                    sessionStorage.removeItem(
                        ACCESS_TIME_KEY
                    );

                    input.focus();
                }

            }
        );
    }

})();