(function () {

    "use strict";

    /* =========================================================
       AUTH CONFIG
    ========================================================= */

    const AUTH_API =
        "https://sheetdb.io/api/v1/hkcn87h4yp47t";

    const AUTH_STORAGE =
        "haproven_auth_user";


    /* =========================================================
       LOGIN ACTION
    ========================================================= */

    const loginAction =
        document.getElementById("login-action");

    if (!loginAction) return;


    /* =========================================================
       LOGIN BUTTON CLICK
    ========================================================= */

    loginAction.addEventListener(
        "click",
        function (e) {

            e.preventDefault();

            const loggedUser =
                getLoggedUser();

            if (loggedUser) {

                openProfileCard(
                    loggedUser
                );

            } else {

                openLoginPage();

            }

        }
    );


    /* =========================================================
       GET LOGGED USER
    ========================================================= */

    function getLoggedUser() {

        try {

            const user =
                localStorage.getItem(
                    AUTH_STORAGE
                );

            if (!user) {
                return null;
            }

            return JSON.parse(user);

        } catch {

            localStorage.removeItem(
                AUTH_STORAGE
            );

            return null;

        }

    }


    /* =========================================================
       UPDATE LOGIN BUTTON
    ========================================================= */

    function updateLoginButton() {

        const user =
            getLoggedUser();

        const text =
            loginAction.querySelector(
                "span"
            );

        const icon =
            loginAction.querySelector(
                "i"
            );

        if (!text) return;


        if (user) {

            text.textContent =
                user.name || "Account";

            if (icon) {

                icon.className =
                    "ri-user-line";

            }

        } else {

            text.textContent =
                "Login";

            if (icon) {

                icon.className =
                    "ri-login-circle-line";

            }

        }

    }


    /* =========================================================
       LOAD USERS FROM SHEETDB
    ========================================================= */

    async function loadUsers() {

        try {

            const response =
                await fetch(
                    AUTH_API,
                    {
                        method: "GET",
                        cache: "no-store"
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "Unable to load users."
                );

            }

            const data =
                await response.json();

            if (!Array.isArray(data)) {

                throw new Error(
                    "Invalid SheetDB response."
                );

            }

            return data;

        } catch (error) {

            console.error(
                "Haproven Auth:",
                error
            );

            return null;

        }

    }


    /* =========================================================
       OPEN LOGIN PAGE
    ========================================================= */

    function openLoginPage() {

        removeAuthPage();

        const page =
            createAuthPage();

        page.innerHTML = `

            <div class="haproven-auth-overlay">

                <div class="haproven-auth-box">

                    <button
                        type="button"
                        class="haproven-auth-close"
                        data-auth-close>
                        ×
                    </button>


                    <div class="haproven-auth-logo">

                        <img
                            src="https://haproven.netlify.app/assets/img/haproven-logo.png"
                            alt="Haproven">

                    </div>


                    <div class="haproven-auth-header">

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Login to your account
                        </p>

                    </div>


                    <div
                        class="haproven-auth-message"
                        id="auth-message">
                    </div>


                    <form id="haproven-login-form">


                        <!-- USERNAME -->

                        <div class="haproven-auth-field">

                            <label>
                                Username or Email
                            </label>

                            <input
                                type="text"
                                id="login-username"
                                placeholder="Enter username or email"
                                autocomplete="username"
                                required>

                        </div>


                        <!-- PASSWORD -->

                        <div class="haproven-auth-field">

                            <label>
                                Password
                            </label>

                            <div class="haproven-password-box">

                                <input
                                    type="password"
                                    id="login-password"
                                    placeholder="Enter password"
                                    autocomplete="current-password"
                                    required>

                                <button
                                    type="button"
                                    class="haproven-password-toggle"
                                    id="password-toggle">

                                    <i class="ri-eye-line"></i>

                                </button>

                            </div>

                        </div>


                        <!-- FORGOT -->

                        <div class="haproven-auth-options">

                            <a
                                href="#"
                                id="forgot-password">

                                Forgot Password?

                            </a>

                        </div>


                        <!-- LOGIN -->

                        <button
                            type="submit"
                            class="haproven-auth-button"
                            id="login-submit">

                            Login

                        </button>


                        <!-- SIGN UP -->

                        <div class="haproven-auth-signup">

                            <span>
                                Don't have an account?
                            </span>

                            <a
                                href="#"
                                id="signup-action">

                                Sign Up

                            </a>

                        </div>


                    </form>

                </div>

            </div>

        `;

        setupLoginEvents();

    }


    /* =========================================================
       LOGIN EVENTS
    ========================================================= */

    function setupLoginEvents() {

        const form =
            document.getElementById(
                "haproven-login-form"
            );

        const close =
            document.querySelector(
                "[data-auth-close]"
            );

        const password =
            document.getElementById(
                "login-password"
            );

        const toggle =
            document.getElementById(
                "password-toggle"
            );

        const forgot =
            document.getElementById(
                "forgot-password"
            );

        const signup =
            document.getElementById(
                "signup-action"
            );


        /* CLOSE */

        close.addEventListener(
            "click",
            closeAuthPage
        );


        /* PASSWORD SHOW / HIDE */

        toggle.addEventListener(
            "click",
            function () {

                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    toggle.innerHTML =
                        '<i class="ri-eye-off-line"></i>';

                } else {

                    password.type =
                        "password";

                    toggle.innerHTML =
                        '<i class="ri-eye-line"></i>';

                }

            }
        );


        /* FORGOT PASSWORD */

        forgot.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                openForgotPage();

            }
        );


        /* SIGN UP */

        signup.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                openSignupPage();

            }
        );


        /* LOGIN */

        form.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const username =
                    document
                        .getElementById(
                            "login-username"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const passwordValue =
                    password.value;


                if (
                    !username ||
                    !passwordValue
                ) {

                    showMessage(
                        "Please enter username and password.",
                        "error"
                    );

                    return;

                }


                const button =
                    document.getElementById(
                        "login-submit"
                    );


                button.disabled =
                    true;

                button.textContent =
                    "Checking...";


                showMessage(
                    "Checking your account...",
                    "loading"
                );


                const users =
                    await loadUsers();


                if (!users) {

                    showMessage(
                        "Unable to connect to account server.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                /* FIND USER */

                const user =
                    users.find(
                        function (item) {

                            const itemUsername =
                                String(
                                    item.username ||
                                    ""
                                )
                                    .trim()
                                    .toLowerCase();


                            const itemEmail =
                                String(
                                    item.email ||
                                    ""
                                )
                                    .trim()
                                    .toLowerCase();


                            return (

                                itemUsername ===
                                username

                            ) || (

                                itemEmail ===
                                username

                            );

                        }
                    );


                /* INVALID USER */

                if (!user) {

                    showMessage(
                        "Invalid username/email or password.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                /* PASSWORD */

                if (
                    String(
                        user.password || ""
                    ) !==
                    passwordValue
                ) {

                    showMessage(
                        "Invalid username/email or password.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                /* STATUS */

                if (
                    String(
                        user.status || ""
                    ).toLowerCase() !==
                    "active"
                ) {

                    showMessage(
                        "This account is not active.",
                        "error"
                    );

                    resetLoginButton();

                    return;

                }


                /* SAVE LOGIN */

                localStorage.setItem(
                    AUTH_STORAGE,
                    JSON.stringify(user)
                );


                showMessage(
                    "Login successful.",
                    "success"
                );


                setTimeout(
                    function () {

                        closeAuthPage();

                        updateLoginButton();

                    },
                    700
                );

            }
        );


        function resetLoginButton() {

            buttonReset();

        }


        function buttonReset() {

            const button =
                document.getElementById(
                    "login-submit"
                );

            if (!button) return;

            button.disabled =
                false;

            button.textContent =
                "Login";

        }

    }


    /* =========================================================
       PROFILE CARD
    ========================================================= */

    function openProfileCard(user) {

        removeAuthPage();

        const page =
            createAuthPage();


        const avatar =
            user.avatar ||
            "ri-user-3-line";


        page.innerHTML = `

            <div class="haproven-auth-overlay">

                <div
                    class="haproven-profile-card">


                    <button
                        type="button"
                        class="haproven-auth-close"
                        data-auth-close>

                        ×

                    </button>


                    <!-- AVATAR -->

                    <div class="haproven-profile-avatar">

                        <i
                            class="${escapeHTML(avatar)}">
                        </i>

                    </div>


                    <!-- NAME -->

                    <h2>

                        ${escapeHTML(
                            user.name ||
                            "User"
                        )}

                    </h2>


                    <!-- USERNAME -->

                    <p class="profile-username">

                        @${escapeHTML(
                            user.username ||
                            ""
                        )}

                    </p>


                    <!-- INFO -->

                    <div class="profile-info">


                        <div>

                            <span>
                                Name
                            </span>

                            <strong>
                                ${escapeHTML(
                                    user.name ||
                                    "-"
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Username
                            </span>

                            <strong>
                                @${escapeHTML(
                                    user.username ||
                                    "-"
                                )}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Role
                            </span>

                            <strong>
                                ${escapeHTML(
                                    user.role ||
                                    "Member"
                                )}
                            </strong>

                        </div>


                    </div>


                    <!-- LOGOUT -->

                    <button
                        type="button"
                        id="logout-button"
                        class="haproven-logout-button">

                        <i class="ri-logout-box-r-line"></i>

                        Logout

                    </button>


                </div>

            </div>

        `;


        document
            .querySelector(
                "[data-auth-close]"
            )
            .addEventListener(
                "click",
                closeAuthPage
            );


        document
            .getElementById(
                "logout-button"
            )
            .addEventListener(
                "click",
                logout
            );

    }


    /* =========================================================
       LOGOUT
    ========================================================= */

    function logout() {

        localStorage.removeItem(
            AUTH_STORAGE
        );

        closeAuthPage();

        updateLoginButton();

        openLoginPage();

    }


    /* =========================================================
       FORGOT PASSWORD
    ========================================================= */

    function openForgotPage() {

        removeAuthPage();

        const page =
            createAuthPage();


        page.innerHTML = `

            <div class="haproven-auth-overlay">

                <div class="haproven-auth-box">


                    <button
                        class="haproven-auth-close"
                        data-auth-close>

                        ×

                    </button>


                    <div class="haproven-auth-header">

                        <h2>
                            Forgot Password?
                        </h2>

                        <p>
                            Enter your email to reset your password.
                        </p>

                    </div>


                    <div
                        class="haproven-auth-message"
                        id="auth-message">
                    </div>


                    <form id="forgot-form">


                        <div class="haproven-auth-field">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                id="forgot-email"
                                placeholder="Enter your email"
                                required>

                        </div>


                        <button
                            type="submit"
                            class="haproven-auth-button">

                            Continue

                        </button>


                        <div class="haproven-auth-signup">

                            <a
                                href="#"
                                id="back-login">

                                ← Back to Login

                            </a>

                        </div>


                    </form>

                </div>

            </div>

        `;


        document
            .querySelector(
                "[data-auth-close]"
            )
            .addEventListener(
                "click",
                closeAuthPage
            );


        document
            .getElementById(
                "back-login"
            )
            .addEventListener(
                "click",
                function (e) {

                    e.preventDefault();

                    openLoginPage();

                }
            );


        document
            .getElementById(
                "forgot-form"
            )
            .addEventListener(
                "submit",
                async function (e) {

                    e.preventDefault();


                    const email =
                        document
                            .getElementById(
                                "forgot-email"
                            )
                            .value
                            .trim()
                            .toLowerCase();


                    showMessage(
                        "Password recovery will be connected later.",
                        "info"
                    );

                }
            );

    }


    /* =========================================================
       SIGN UP PAGE
    ========================================================= */

    function openSignupPage() {

        removeAuthPage();

        const page =
            createAuthPage();


        page.innerHTML = `

            <div class="haproven-auth-overlay">

                <div class="haproven-auth-box">


                    <button
                        class="haproven-auth-close"
                        data-auth-close>

                        ×

                    </button>


                    <div class="haproven-auth-header">

                        <h2>
                            Create Account
                        </h2>

                        <p>
                            Join Haproven
                        </p>

                    </div>


                    <div
                        class="haproven-auth-message"
                        id="auth-message">
                    </div>


                    <form id="signup-form">


                        <!-- NAME -->

                        <div class="haproven-auth-field">

                            <label>
                                Full Name
                            </label>

                            <input
                                id="signup-name"
                                type="text"
                                placeholder="Enter your name"
                                autocomplete="name"
                                required>

                        </div>


                        <!-- USERNAME -->

                        <div class="haproven-auth-field">

                            <label>
                                Username
                            </label>

                            <input
                                id="signup-username"
                                type="text"
                                placeholder="Choose username"
                                autocomplete="username"
                                required>

                        </div>


                        <!-- EMAIL -->

                        <div class="haproven-auth-field">

                            <label>
                                Email
                            </label>

                            <input
                                id="signup-email"
                                type="email"
                                placeholder="Enter email"
                                autocomplete="email"
                                required>

                        </div>


                        <!-- PASSWORD -->

                        <div class="haproven-auth-field">

                            <label>
                                Password
                            </label>

                            <div class="haproven-password-box">

                                <input
                                    id="signup-password"
                                    type="password"
                                    placeholder="Create password"
                                    autocomplete="new-password"
                                    required>

                                <button
                                    type="button"
                                    class="haproven-password-toggle"
                                    id="signup-password-toggle">

                                    <i class="ri-eye-line"></i>

                                </button>

                            </div>

                        </div>


                        <!-- SIGN UP -->

                        <button
                            class="haproven-auth-button"
                            id="signup-submit"
                            type="submit">

                            Sign Up

                        </button>


                        <div class="haproven-auth-signup">

                            Already have an account?

                            <a
                                href="#"
                                id="back-login">

                                Login

                            </a>

                        </div>


                    </form>

                </div>

            </div>

        `;


        const close =
            document.querySelector(
                "[data-auth-close]"
            );


        const backLogin =
            document.getElementById(
                "back-login"
            );


        const password =
            document.getElementById(
                "signup-password"
            );


        const passwordToggle =
            document.getElementById(
                "signup-password-toggle"
            );


        const form =
            document.getElementById(
                "signup-form"
            );


        close.addEventListener(
            "click",
            closeAuthPage
        );


        /* PASSWORD */

        passwordToggle.addEventListener(
            "click",
            function () {

                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    passwordToggle.innerHTML =
                        '<i class="ri-eye-off-line"></i>';

                } else {

                    password.type =
                        "password";

                    passwordToggle.innerHTML =
                        '<i class="ri-eye-line"></i>';

                }

            }
        );


        /* BACK */

        backLogin.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                openLoginPage();

            }
        );


        /* SIGN UP */

        form.addEventListener(
            "submit",
            async function (e) {

                e.preventDefault();


                const name =
                    document
                        .getElementById(
                            "signup-name"
                        )
                        .value
                        .trim();


                const username =
                    document
                        .getElementById(
                            "signup-username"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const email =
                    document
                        .getElementById(
                            "signup-email"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const passwordValue =
                    password.value;


                if (
                    !name ||
                    !username ||
                    !email ||
                    !passwordValue
                ) {

                    showMessage(
                        "Please fill all fields.",
                        "error"
                    );

                    return;

                }


                if (
                    username.length < 3
                ) {

                    showMessage(
                        "Username must contain at least 3 characters.",
                        "error"
                    );

                    return;

                }


                if (
                    passwordValue.length < 6
                ) {

                    showMessage(
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;

                }


                const button =
                    document.getElementById(
                        "signup-submit"
                    );


                button.disabled =
                    true;

                button.textContent =
                    "Creating...";


                showMessage(
                    "Checking account availability...",
                    "loading"
                );


                /* GET CURRENT USERS */

                const users =
                    await loadUsers();


                if (!users) {

                    showMessage(
                        "Unable to connect to account server.",
                        "error"
                    );

                    button.disabled =
                        false;

                    button.textContent =
                        "Sign Up";

                    return;

                }


                /* DUPLICATE CHECK */

                const usernameExists =
                    users.some(
                        function (item) {

                            return String(
                                item.username ||
                                ""
                            )
                                .trim()
                                .toLowerCase() ===
                                username;

                        }
                    );


                if (usernameExists) {

                    showMessage(
                        "Username is already taken.",
                        "error"
                    );

                    button.disabled =
                        false;

                    button.textContent =
                        "Sign Up";

                    return;

                }


                const emailExists =
                    users.some(
                        function (item) {

                            return String(
                                item.email ||
                                ""
                            )
                                .trim()
                                .toLowerCase() ===
                                email;

                        }
                    );


                if (emailExists) {

                    showMessage(
                        "Email is already registered.",
                        "error"
                    );

                    button.disabled =
                        false;

                    button.textContent =
                        "Sign Up";

                    return;

                }


                /* CREATE ID */

                const userId =
                    "USR-" +
                    Date.now();


                /* DEFAULT AVATAR */

                const avatar =
                    "ri-user-3-line";


                /* NEW USER */

                const newUser = {

                    id: userId,

                    name: name,

                    username: username,

                    email: email,

                    password: passwordValue,

                    avatar: avatar,

                    role: "Member",

                    status: "active"

                };


                /* SEND TO SHEETDB */

                try {

                    const response =
                        await fetch(
                            AUTH_API,
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        {
                                            data:
                                                newUser
                                        }
                                    )

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Signup failed."
                        );

                    }


                    showMessage(
                        "Account created successfully.",
                        "success"
                    );


                    /* AUTO LOGIN */

                    localStorage.setItem(
                        AUTH_STORAGE,
                        JSON.stringify(
                            newUser
                        )
                    );


                    setTimeout(
                        function () {

                            closeAuthPage();

                            updateLoginButton();

                        },
                        800
                    );


                } catch (error) {

                    console.error(
                        "Haproven Signup:",
                        error
                    );


                    showMessage(
                        "Unable to create account. Please try again.",
                        "error"
                    );


                    button.disabled =
                        false;

                    button.textContent =
                        "Sign Up";

                }

            }
        );

    }


    /* =========================================================
       CREATE AUTH PAGE
    ========================================================= */

    function createAuthPage() {

        const page =
            document.createElement(
                "div"
            );


        page.id =
            "haproven-auth-page";


        document.body.appendChild(
            page
        );


        document.body.style.overflow =
            "hidden";


        return page;

    }


    /* =========================================================
       REMOVE AUTH PAGE
    ========================================================= */

    function removeAuthPage() {

        const old =
            document.getElementById(
                "haproven-auth-page"
            );


        if (old) {

            old.remove();

        }

    }


    /* =========================================================
       CLOSE AUTH
    ========================================================= */

    function closeAuthPage() {

        removeAuthPage();

        document.body.style.overflow =
            "";

    }


    /* =========================================================
       MESSAGE
    ========================================================= */

    function showMessage(
        message,
        type
    ) {

        const box =
            document.getElementById(
                "auth-message"
            );


        if (!box) return;


        box.textContent =
            message;


        box.className =
            "haproven-auth-message " +
            "message-" +
            type;

    }


    /* =========================================================
       ESCAPE KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (e) {

            if (
                e.key ===
                "Escape"
            ) {

                closeAuthPage();

            }

        }
    );


    /* =========================================================
       ESCAPE HTML
    ========================================================= */

    function escapeHTML(value) {

        return String(value)

            .replace(
                /&/g,
                "&amp;"
            )

            .replace(
                /</g,
                "&lt;"
            )

            .replace(
                />/g,
                "&gt;"
            )

            .replace(
                /"/g,
                "&quot;"
            )

            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* =========================================================
       CSS
    ========================================================= */

    if (
        !document.getElementById(
            "haproven-auth-style"
        )
    ) {

        const style =
            document.createElement(
                "style"
            );


        style.id =
            "haproven-auth-style";


        style.textContent = `

            #login-action span {
                display: inline-block;
                max-width: 6ch;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                vertical-align: middle;
            }


            #haproven-auth-page {
                position: fixed;
                inset: 0;
                z-index: 999999;
            }


            .haproven-auth-overlay {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
                background: rgba(0,0,0,.65);
                backdrop-filter: blur(8px);
            }


            .haproven-auth-box,
            .haproven-profile-card {
                width: 100%;
                max-width: 420px;
                position: relative;
                box-sizing: border-box;
                padding: 32px;
                border-radius: 20px;
                background: #fff;
                box-shadow:
                    0 25px 80px
                    rgba(0,0,0,.25);
            }


            .haproven-profile-card {
                text-align: center;
            }


            .haproven-auth-close {
                position: absolute;
                top: 14px;
                right: 14px;
                width: 36px;
                height: 36px;
                border: 0;
                border-radius: 50%;
                background: #f1f1f1;
                font-size: 24px;
                cursor: pointer;
            }


            .haproven-auth-logo {
                text-align: center;
                margin-bottom: 20px;
            }


            .haproven-auth-logo img {
                width: 60px;
                height: 60px;
                object-fit: contain;
            }


            .haproven-auth-header {
                text-align: center;
                margin-bottom: 24px;
            }


            .haproven-auth-header h2 {
                margin: 0 0 7px;
                color: #000;
                font-size: 26px;
            }


            .haproven-auth-header p {
                margin: 0;
                color: #666;
            }


            .haproven-auth-field {
                margin-bottom: 17px;
            }


            .haproven-auth-field label {
                display: block;
                margin-bottom: 7px;
                color: #000;
                font-size: 14px;
                font-weight: 600;
            }


            .haproven-auth-field input {
                width: 100%;
                box-sizing: border-box;
                padding: 13px 14px;
                border: 1px solid #ddd;
                border-radius: 10px;
                outline: none;
                color: #000;
                font-size: 15px;
            }


            .haproven-auth-field input:focus {
                border-color: #777;
            }


            .haproven-password-box {
                position: relative;
            }


            .haproven-password-box input {
                padding-right: 48px;
            }


            .haproven-password-toggle {
                position: absolute;
                top: 50%;
                right: 8px;
                transform: translateY(-50%);
                border: 0;
                background: transparent;
                cursor: pointer;
                font-size: 18px;
            }


            .haproven-auth-options {
                text-align: right;
                margin: -4px 0 18px;
            }


            .haproven-auth-options a {
                color: #555;
                font-size: 14px;
                text-decoration: none;
            }


            .haproven-auth-button {
                width: 100%;
                padding: 14px;
                border: 0;
                border-radius: 10px;
                background: #111;
                color: #fff;
                font-size: 15px;
                font-weight: 600;
                cursor: pointer;
            }


            .haproven-auth-button:disabled {
                opacity: .6;
                cursor: not-allowed;
            }


            .haproven-auth-signup {
                margin-top: 20px;
                text-align: center;
                color: #777;
                font-size: 14px;
            }


            .haproven-auth-signup a {
                margin-left: 5px;
                color: #111;
                font-weight: 600;
                text-decoration: none;
            }


            .haproven-auth-message {
                display: none;
                margin-bottom: 16px;
                padding: 10px 12px;
                border-radius: 8px;
                font-size: 14px;
            }


            .haproven-auth-message:not(:empty) {
                display: block;
            }


            .message-error {
                background: #ffecec;
                color: #c00;
            }


            .message-success {
                background: #eaf8ed;
                color: #187a35;
            }


            .message-info,
            .message-loading {
                background: #f1f1f1;
                color: #555;
            }


            /* PROFILE AVATAR */

            .haproven-profile-avatar {
                width: 90px;
                height: 90px;
                margin: 5px auto 15px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f1f1f1;
                border: 3px solid #eee;
            }


            .haproven-profile-avatar i {
                font-size: 42px;
                color: #111;
            }


            .haproven-profile-card h2 {
                margin: 0 0 5px;
                color: #000;
                font-size: 24px;
            }


            .profile-username {
                margin: 0 0 22px;
                color: #777;
            }


            .profile-info {
                text-align: left;
                margin-bottom: 22px;
            }


            .profile-info div {
                display: flex;
                justify-content: space-between;
                gap: 15px;
                padding: 10px 0;
                border-bottom: 1px solid #eee;
            }


            .profile-info span {
                color: #777;
                font-size: 14px;
            }


            .profile-info strong {
                color: #111;
                font-size: 14px;
                text-align: right;
            }


            .haproven-logout-button {
                width: 100%;
                padding: 13px;
                border: 0;
                border-radius: 10px;
                background: #111;
                color: #fff;
                cursor: pointer;
                font-size: 15px;
                font-weight: 600;
            }


            .haproven-logout-button i {
                margin-right: 5px;
            }


            @media (max-width: 480px) {

                .haproven-auth-box,
                .haproven-profile-card {
                    padding: 25px 20px;
                    border-radius: 16px;
                }

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    updateLoginButton();

})();