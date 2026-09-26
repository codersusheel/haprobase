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
    // Changes automatically when password list
    // changes.
    // ==========================================

    const PASSWORD_VERSION =
        PASSWORDS.join("|");

    // ==========================================
    // CURRENT PAGE
    // ==========================================

    const currentUrl =
        window.location.pathname +
        window.location.search +
        window.location.hash;

    // ==========================================
    // CHECK SAVED ACCESS
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
    // PASSWORD CHANGED?
    // ==========================================

    const passwordChanged =
        savedVersion !== null &&
        savedVersion !== PASSWORD_VERSION;

    // ==========================================
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
    }

    // ==========================================
    // CHECK 24 HOUR ACCESS
    // ==========================================

    const accessValid =
        !passwordChanged &&
        savedAccess &&
        savedTime &&
        savedVersion === PASSWORD_VERSION &&
        (Date.now() - savedTime) <
        ACCESS_DURATION;

    // ==========================================
    // ALREADY AUTHENTICATED
    // ==========================================

    if (accessValid) {
        return;
    }

    // ==========================================
    // CREATE PASSWORD PAGE
    // ==========================================

    createPasswordPage();

    // ==========================================
    // PASSWORD PAGE FUNCTION
    // ==========================================

    function createPasswordPage() {

        // ======================================
        // STOP PAGE SCROLL
        // ======================================

        document.documentElement.style.overflow =
            "hidden";

        document.body.style.overflow =
            "hidden";

        // ======================================
        // CREATE STYLE
        // ======================================

        const style =
            document.createElement("style");

        style.id =
            "protected-page-style";

        style.textContent = `

            * {
                box-sizing: border-box;
            }

            #protected-page {
                position: fixed;
                inset: 0;
                z-index: 999999999;

                display: flex;
                align-items: center;
                justify-content: center;

                padding: 20px;

                background: #f5f5f5;

                font-family:
                    Arial,
                    Helvetica,
                    sans-serif;

                color: #222;
            }

            #protected-page * {
                box-sizing: border-box;
            }

            .protected-card {
                width: 100%;
                max-width: 420px;

                padding: 35px 30px;

                background: #fff;

                border: 1px solid #ddd;

                border-radius: 12px;

                text-align: center;

                box-shadow:
                    0 10px 35px
                    rgba(0, 0, 0, 0.08);
            }

            .protected-code {
                font-size: 64px;

                line-height: 1;

                font-weight: 700;

                margin-bottom: 15px;
            }

            .protected-title {
                margin: 0 0 10px;

                font-size: 24px;

                font-weight: 600;
            }

            .protected-text {
                margin: 0 0 25px;

                color: #777;

                font-size: 14px;

                line-height: 1.6;
            }

            .protected-form {
                width: 100%;
            }

            .protected-input {
                width: 100%;

                height: 46px;

                padding: 0 14px;

                border: 1px solid #ccc;

                border-radius: 7px;

                outline: none;

                font-size: 15px;

                background: #fff;

                color: #222;

                margin-bottom: 12px;
            }

            .protected-input:focus {
                border-color: #555;
            }

            .protected-button {
                width: 100%;

                height: 46px;

                border: 0;

                border-radius: 7px;

                background: #222;

                color: #fff;

                font-size: 15px;

                cursor: pointer;

                transition: opacity .2s;
            }

            .protected-button:hover {
                opacity: .88;
            }

            .protected-error {
                min-height: 20px;

                margin-top: 12px;

                color: #d33;

                font-size: 13px;
            }

            .protected-footer {
                margin-top: 20px;

                font-size: 12px;

                color: #999;
            }

            @media (max-width: 480px) {

                #protected-page {
                    padding: 15px;
                }

                .protected-card {
                    padding: 30px 22px;
                }

                .protected-code {
                    font-size: 55px;
                }

                .protected-title {
                    font-size: 21px;
                }
            }

        `;

        document.head.appendChild(style);

        // ======================================
        // CREATE HTML
        // ======================================

        const overlay =
            document.createElement("div");

        overlay.id =
            "protected-page";

        overlay.innerHTML = `

            <div class="protected-card">

                <div class="protected-code">
                    403
                </div>

                <h1 class="protected-title">
                    Restricted Access
                </h1>

                <p class="protected-text">
                    This page is protected.
                    Enter the password to continue.
                </p>

                <form
                    class="protected-form"
                    id="protectedForm"
                >

                    <input
                        type="password"
                        id="protectedPassword"
                        class="protected-input"
                        placeholder="Enter password"
                        autocomplete="off"
                        required
                    >

                    <button
                        type="submit"
                        class="protected-button"
                    >
                        Continue
                    </button>

                </form>

                <div
                    id="protectedError"
                    class="protected-error"
                ></div>

                <div class="protected-footer">
                    Protected Area
                </div>

            </div>

        `;

        document.body.appendChild(
            overlay
        );

        // ======================================
        // ELEMENTS
        // ======================================

        const form =
            document.getElementById(
                "protectedForm"
            );

        const input =
            document.getElementById(
                "protectedPassword"
            );

        const error =
            document.getElementById(
                "protectedError"
            );

        // ======================================
        // AUTO FOCUS
        // ======================================

        setTimeout(() => {
            input.focus();
        }, 100);

        // ======================================
        // PASSWORD SUBMIT
        // ======================================

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const enteredPassword =
                    input.value.trim();

                // ==================================
                // CHECK PASSWORD
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
                    // REMOVE PROTECTION
                    // ==============================

                    overlay.remove();

                    style.remove();

                    document.documentElement
                        .style
                        .overflow = "";

                    document.body
                        .style
                        .overflow = "";

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