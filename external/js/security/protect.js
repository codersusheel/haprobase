(() => {

    "use strict";

    // ==========================================
    // PASSWORDS
    // ==========================================

    const PASSWORDS = [
        "haproven",
        "etnar",
        "haproid",
        "gitprohub",
        "proaccess"
    ];

    // ==========================================
    // PASSWORD PAGE
    // ==========================================

    const PASSWORD_PAGE = "/password.html";

    // ==========================================
    // STORAGE
    // ==========================================

    const ACCESS_KEY = "page_access_granted";
    const ACCESS_TIME_KEY = "page_access_time";
    const PASSWORD_VERSION_KEY = "password_version";

    // ==========================================
    // 24 HOURS
    // ==========================================

    const ACCESS_DURATION =
        24 * 60 * 60 * 1000;

    // ==========================================
    // PASSWORD VERSION
    // Automatically changes when PASSWORDS
    // array is changed.
    // ==========================================

    const PASSWORD_VERSION =
        PASSWORDS.join("|");

    // ==========================================
    // CURRENT PAGE
    // ==========================================

    const currentPath =
        window.location.pathname;

    // ==========================================
    // PASSWORD PAGE CHECK
    // ==========================================

    const isPasswordPage =
        currentPath === PASSWORD_PAGE;

    // ==========================================
    // SAVED PASSWORD VERSION
    // ==========================================

    const savedPasswordVersion =
        sessionStorage.getItem(
            PASSWORD_VERSION_KEY
        );

    // ==========================================
    // CHECK PASSWORD CHANGE
    // ==========================================

    const passwordChanged =
        savedPasswordVersion !== null &&
        savedPasswordVersion !== PASSWORD_VERSION;

    // ==========================================
    // IF PASSWORD CHANGED
    // CLEAR OLD ACCESS
    // ==========================================

    if (passwordChanged) {

        sessionStorage.removeItem(
            ACCESS_KEY
        );

        sessionStorage.removeItem(
            ACCESS_TIME_KEY
        );

        sessionStorage.removeItem(
            PASSWORD_VERSION_KEY
        );

        // ======================================
        // IF CURRENT PAGE IS NOT PASSWORD PAGE
        // FORCE PASSWORD PAGE
        // ======================================

        if (!isPasswordPage) {

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
    }

    // ==========================================
    // CHECK ACCESS
    // ==========================================

    const savedAccess =
        sessionStorage.getItem(
            ACCESS_KEY
        ) === "true";

    const savedTime =
        Number(
            sessionStorage.getItem(
                ACCESS_TIME_KEY
            )
        );

    const savedVersion =
        sessionStorage.getItem(
            PASSWORD_VERSION_KEY
        );

    // ==========================================
    // 24-HOUR ACCESS VALIDATION
    // ==========================================

    const accessValid =
        savedAccess &&
        savedTime &&
        savedVersion === PASSWORD_VERSION &&
        (Date.now() - savedTime) <
        ACCESS_DURATION;

    // ==========================================
    // PROTECTED PAGE
    // ==========================================

    if (!isPasswordPage && !accessValid) {

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
    // REMOVE EXPIRED / INVALID ACCESS
    // ==========================================

    if (!accessValid) {

        sessionStorage.removeItem(
            ACCESS_KEY
        );

        sessionStorage.removeItem(
            ACCESS_TIME_KEY
        );

        sessionStorage.removeItem(
            PASSWORD_VERSION_KEY
        );
    }

    // ==========================================
    // PASSWORD PAGE
    // ==========================================

    if (isPasswordPage) {

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
        // SUBMIT PASSWORD
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

                    sessionStorage.setItem(
                        PASSWORD_VERSION_KEY,
                        PASSWORD_VERSION
                    );

                    // ==============================
                    // RETURN TO ORIGINAL PAGE
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
    }

})();