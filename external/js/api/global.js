/* =========================================================
 *  Haproven Hub Menu Loader
 *  External JSON with Internal JSON fallback support
 * ========================================================= */

(function () {

    "use strict";

    async function loadByHaproven() {

        const container = document.getElementById("by-haproven");

        if (!container) return;

        const JSON_SOURCES = [
            "https://raw.githubusercontent.com/codersusheel/haprobase/main/external/json/hub-menu.json",
            "/external/json/hub-menu.json"
        ];

        try {

            let data = null;

            for (const source of JSON_SOURCES) {

                try {

                    const res = await fetch(source, {
                        cache: "no-cache"
                    });

                    if (!res.ok) continue;

                    const json = await res.json();

                    if (Array.isArray(json["hub-menu"])) {

                        data = json;
                        break;

                    }

                } catch (error) {

                    console.warn(
                        "Failed to load JSON:",
                        source
                    );

                }

            }

            if (!data) {
                throw new Error("All hub-menu JSON sources failed");
            }

            const menu = data["hub-menu"];

            container.innerHTML = "";

            menu.forEach(item => {

                if (!item.name || !item.url) return;

                const li = document.createElement("li");

                const a = document.createElement("a");

                a.className = "member-box";
                a.href = item.url;

                /*
                 * External link
                 * → New tab
                 */
                if (/^https?:\/\//i.test(item.url)) {

                    a.target = "_blank";
                    a.rel = "noopener noreferrer";

                }

                /*
                 * Image
                 */
                if (item.img) {

                    const img = document.createElement("img");

                    img.src = item.img;
                    img.alt = item.name;
                    img.loading = "lazy";

                    a.appendChild(img);

                }

                /*
                 * Name
                 */
                const span = document.createElement("span");

                span.textContent = item.name;

                a.appendChild(span);

                li.appendChild(a);

                container.appendChild(li);

            });

        } catch (err) {

            console.error(
                "Failed to load hub-menu:",
                err
            );

            container.innerHTML = "";

            const li = document.createElement("li");

            const a = document.createElement("a");

            a.className = "member-box";
            a.href = "#";

            const span = document.createElement("span");

            span.textContent = "Unable to load";

            a.appendChild(span);

            li.appendChild(a);

            container.appendChild(li);

        }

    }

    loadByHaproven();

})();









/* =========================================================
 *  Haproven Live Text
 *  Loads and displays the latest live update message
 * ========================================================= */

(function () {

    "use strict";

    async function loadLiveText() {

        const element = document.getElementById("live-text");

        if (!element) return;

        const JSON_SOURCES = [
            "https://raw.githubusercontent.com/codersusheel/haprobase/main/external/json/hub-menu.json",
            "/external/json/hub-menu.json"
        ];

        for (const source of JSON_SOURCES) {

            try {

                const res = await fetch(source, {
                    cache: "no-cache"
                });

                if (!res.ok) continue;

                const data = await res.json();

                if (data.liveText) {

                    element.textContent = data.liveText;
                    return;

                }

            } catch (error) {

                console.warn("Failed to load liveText:", source);

            }

        }

    }

    loadLiveText();

})();













/* =========================================================
 *  Haproven Social Links Loader
 *  Loads active social links for mobile and desktop
 * ========================================================= */

(function () {

    "use strict";

    async function loadSocialLinks() {

        const containers = document.querySelectorAll(
            ".haproven-sosal-links"
        );

        if (!containers.length) return;

        const JSON_SOURCES = [
            "https://raw.githubusercontent.com/codersusheel/haprobase/main/external/json/hub-menu.json",
            "/external/json/hub-menu.json"
        ];

        for (const source of JSON_SOURCES) {

            try {

                const res = await fetch(source, {
                    cache: "no-cache"
                });

                if (!res.ok) continue;

                const data = await res.json();
                const links = data.social_links;

                if (!Array.isArray(links)) continue;

                containers.forEach(container => {

                    container.innerHTML = "";

                    links.forEach(item => {

                        if (
                            !item.platform ||
                            !item.url ||
                            !item.icon ||
                            item.is_active !== true
                        ) return;

                        const isList =
                            container.tagName.toLowerCase() === "ul";

                        const wrapper = isList
                            ? document.createElement("li")
                            : document.createElement("a");

                        const a = isList
                            ? document.createElement("a")
                            : wrapper;

                        a.href = item.url;
                        a.target = "_blank";
                        a.rel = "noopener noreferrer";
                        a.setAttribute(
                            "aria-label",
                            item.platform
                        );
                        a.title = item.platform;

                        const icon = document.createElement("i");

                        icon.className = item.icon;

                        a.appendChild(icon);

                        if (isList) {
                            wrapper.appendChild(a);
                            container.appendChild(wrapper);
                        } else {
                            container.appendChild(a);
                        }

                    });

                });

                return;

            } catch (error) {

                console.warn(
                    "Failed to load social links:",
                    source
                );

            }

        }

    }

    loadSocialLinks();

})();












/* =========================================================
 *  Haproven Navigation Loader
 *  Loads Header, Mobile Sidebar & Dropdown Menus
 * Internal JSON Fallback
 * ========================================================= */


document.addEventListener("DOMContentLoaded", () => {
    fetch("/assets/json/side-link.json")
        .then(response => response.json())
        .then(data => renderNavigation(data.navigation_system))
        .catch(err => console.error("JSON Loading Error:", err));
});

function renderNavigation(navigationSystem) {
    const headerContainer = document.getElementById("header-links");
    const laptopContainer = document.getElementById("laptop-sidebar");
    const mobileContainer = document.getElementById("mobile-sidebar");

    if (headerContainer) headerContainer.innerHTML = "";
    if (laptopContainer) laptopContainer.innerHTML = "";
    if (mobileContainer) mobileContainer.innerHTML = "";

    navigationSystem.forEach(cat => {

        // 1. RENDER HEADER (With Dropdown Support)
        if (headerContainer) {
            cat.items.forEach(item => {
                if (item.placements.includes("header")) {
                    const li = document.createElement("li");

                    if (item.type === "dropdown" && item.dropdown_items) {
                        li.className = "nav-item dropdown";
                        let dropdownHtml = `
                            <a href="${item.url}" class="dropdown-toggle">
                                <i class="fa ${item.icon}"></i> ${item.name} <i class="fa fa-chevron-down"></i>
                            </a>
                            <ul class="dropdown-menu">`;

                        item.dropdown_items.forEach(sub => {
                            dropdownHtml += `
                                <li>
                                    <a href="${sub.url}">
                                        <i class="fa ${sub.icon}"></i> ${sub.name}
                                    </a>
                                </li>`;
                        });
                        dropdownHtml += `</ul>`;
                        li.innerHTML = dropdownHtml;
                    } else {
                        li.innerHTML = `
                            <a href="${item.url}" class="nav-link">
                                <i class="fa ${item.icon}"></i> ${item.name}
                            </a>`;
                    }
                    headerContainer.appendChild(li);
                }
            });
        }

        // 2. RENDER LAPTOP SIDEBAR
        if (laptopContainer) {
            const groupDiv = document.createElement("div");
            groupDiv.className = "nav-group";
            let groupHtml = `<h4 class="nav-title">${cat.category}</h4><ul class="submenu">`;

            cat.items.forEach(item => {
                if (item.placements.includes("sidebar_laptop")) {
                    groupHtml += `
                        <li>
                            <a href="${item.url}">
                                <i class="fa ${item.icon}"></i> <span>${item.name}</span>
                            </a>
                        </li>`;

                    // Render inner items in sidebar too if available
                    if (item.dropdown_items) {
                        item.dropdown_items.forEach(sub => {
                            groupHtml += `
                                <li class="sub-item">
                                    <a href="${sub.url}">
                                        <i class="fa ${sub.icon}"></i> <span>${sub.name}</span>
                                    </a>
                                </li>`;
                        });
                    }
                }
            });
            groupHtml += `</ul>`;
            groupDiv.innerHTML = groupHtml;
            laptopContainer.appendChild(groupDiv);
        }

        // 3. RENDER MOBILE SIDEBAR
        if (mobileContainer) {
            cat.items.forEach(item => {
                if (item.placements.includes("sidebar_mobile")) {
                    const li = document.createElement("li");
                    li.innerHTML = `
                        <a href="${item.url}">
                            <i class="fa ${item.icon}"></i> <span>${item.name}</span>
                        </a>`;
                    mobileContainer.appendChild(li);

                    if (item.dropdown_items) {
                        item.dropdown_items.forEach(sub => {
                            const subLi = document.createElement("li");
                            subLi.className = "mobile-sub-item";
                            subLi.innerHTML = `
                                <a href="${sub.url}">
                                    <i class="fa ${sub.icon}"></i> <span>${sub.name}</span>
                                </a>`;
                            mobileContainer.appendChild(subLi);
                        });
                    }
                }
            });
        }
    });
}
































/* =========================================
     TEAMTRACK DYNAMIC SIDEBAR
     Fast Cache + Fresh JSON + Auto Update
  ========================================= */

/* =========================================================
 * Haproven Page Sidebar Loader
 * Loads Default & Current Page Navigation
 * External JSON Configuration
 * Fast Cache + Fresh JSON Update
 * ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const CONFIG = {
        jsonPath: "/assets/json/page-sidebar.json",
        cacheKey: "page_sidebar_cache_v4",
        cacheTime: 5 * 60 * 1000
    };

    const navContainer = document.getElementById("page-laptop-sidebar");

    if (!navContainer) return;

    /* =====================================================
       1. PATH HELPERS
    ===================================================== */

    function normalizePath(path) {
        if (!path) return "/";

        let cleanPath = path.split("?")[0].split("#")[0];
        cleanPath = cleanPath.replace(/\/+/g, "/");

        if (cleanPath.length > 1) {
            cleanPath = cleanPath.replace(/\/+$/, "");
        }

        return cleanPath || "/";
    }

    function getCurrentPath() {
        return normalizePath(window.location.pathname);
    }

    /* =====================================================
       2. GET DEFAULT + PAGE NAVIGATION
    ===================================================== */

    function getPageNavigation(data) {
        const pages = data.pages || {};
        const currentPath = getCurrentPath();

        const matchedPath = Object.keys(pages).find(
            path => normalizePath(path) === currentPath
        );

        const defaultNavigation =
            Array.isArray(data.default?.navigation)
                ? data.default.navigation
                : [];

        const pageNavigation =
            matchedPath &&
            Array.isArray(pages[matchedPath]?.navigation)
                ? pages[matchedPath].navigation
                : [];

        return [...defaultNavigation, ...pageNavigation];
    }

    /* =====================================================
       3. CREATE ICON
    ===================================================== */

    function createIcon(iconClass) {
        const icon = document.createElement("i");

        if (iconClass) {
            icon.className = iconClass;
            icon.setAttribute("aria-hidden", "true");
        }

        return icon;
    }

    /* =====================================================
       4. CHECK ACTIVE LINK
    ===================================================== */

    function isCurrentLink(href) {
        if (!href || href === "#") return false;

        try {
            const target = new URL(href, window.location.href);
            const current = new URL(window.location.href);

            if (
                normalizePath(target.pathname) !==
                normalizePath(current.pathname)
            ) {
                return false;
            }

            if (target.hash) {
                return target.hash === current.hash;
            }

            return !current.hash;
        } catch (error) {
            return false;
        }
    }

    /* =====================================================
       5. CREATE NAVIGATION LINK
    ===================================================== */

    function createLink(item) {
        const link = document.createElement("a");

        link.href = item.href || "#";

        if (item.icon) {
            link.appendChild(createIcon(item.icon));
        }

        const title = document.createElement("span");
        title.textContent = item.title || "Untitled";

        link.appendChild(title);

        if (item.disabled === true) {
            link.removeAttribute("href");
            link.setAttribute("aria-disabled", "true");
            link.classList.add("page-link-disabled");
        }

        if (
            item.disabled !== true &&
            isCurrentLink(item.href)
        ) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

        return link;
    }

    /* =====================================================
       6. CREATE SIDEBAR ITEM + SUBMENU
    ===================================================== */

    function createNavigationItem(item) {
        const li = document.createElement("li");
        li.className = "page-nav-item";

        const link = createLink(item);
        li.appendChild(link);

        const children = Array.isArray(item.children)
            ? item.children
            : [];

        if (children.length > 0) {
            li.classList.add("page-has-submenu");

            const submenu = document.createElement("ul");
            submenu.className = "page-submenu";

            let childIsActive = false;

            children.forEach(child => {
                const childItem = createNavigationItem(child);

                if (
                    childItem.classList.contains("page-item-active")
                ) {
                    childIsActive = true;
                }

                submenu.appendChild(childItem);
            });

            if (
                childIsActive ||
                link.classList.contains("active")
            ) {
                li.classList.add("page-item-active");
            }

            li.appendChild(submenu);
        } else if (link.classList.contains("active")) {
            li.classList.add("page-item-active");
        }

        return li;
    }

    /* =====================================================
       7. RENDER NAVIGATION
    ===================================================== */

    function renderNavigation(navigation) {
        if (!Array.isArray(navigation) || !navigation.length) {
            showError("No navigation configured for this page.");
            return;
        }

        const fragment = document.createDocumentFragment();

        navigation.forEach(item => {
            if (item && typeof item === "object") {
                fragment.appendChild(createNavigationItem(item));
            }
        });

        navContainer.replaceChildren(fragment);
    }

    /* =====================================================
       8. LOADING & ERROR
    ===================================================== */

    function showLoading() {
        const li = document.createElement("li");
        li.className = "page-sidebar-loading";

        li.appendChild(createIcon("fas fa-spinner fa-spin"));

        const text = document.createElement("span");
        text.textContent = " Loading...";

        li.appendChild(text);
        navContainer.replaceChildren(li);
    }

    function showError(message) {
        const li = document.createElement("li");
        li.className = "page-sidebar-error";
        li.textContent = message || "Navigation could not be loaded.";

        navContainer.replaceChildren(li);
    }

    /* =====================================================
       9. LOCAL STORAGE CACHE
    ===================================================== */

    function readCache() {
        try {
            const cached = JSON.parse(
                localStorage.getItem(CONFIG.cacheKey)
            );

            if (
                cached &&
                cached.data &&
                typeof cached.timestamp === "number"
            ) {
                return cached;
            }
        } catch (error) {
            console.warn("Sidebar cache error:", error);
        }

        return null;
    }

    function saveCache(data) {
        try {
            localStorage.setItem(
                CONFIG.cacheKey,
                JSON.stringify({
                    data: data,
                    timestamp: Date.now()
                })
            );
        } catch (error) {
            console.warn("Sidebar cache could not be saved:", error);
        }
    }

    /* =====================================================
       10. FETCH JSON
    ===================================================== */

    async function fetchNavigation() {
        const url = CONFIG.jsonPath +
            (CONFIG.jsonPath.includes("?") ? "&" : "?") +
            "_=" + Date.now();

        const response = await fetch(url, {
            method: "GET",
            cache: "no-store",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();

        if (
            !data ||
            typeof data !== "object" ||
            !data.pages ||
            typeof data.pages !== "object"
        ) {
            throw new Error("Invalid sidebar JSON format");
        }

        return data;
    }

    /* =====================================================
       11. LOAD NAVIGATION
    ===================================================== */

    async function loadNavigation() {
        const cached = readCache();

        // Display cached navigation instantly.
        if (cached) {
            renderNavigation(getPageNavigation(cached.data));
        } else {
            showLoading();
        }

        // Use cache while it is fresh.
        if (
            cached &&
            Date.now() - cached.timestamp < CONFIG.cacheTime
        ) {
            return;
        }

        try {
            const data = await fetchNavigation();

            const navigation = getPageNavigation(data);

            // Render and update cache with fresh JSON.
            renderNavigation(navigation);
            saveCache(data);

        } catch (error) {
            console.error("Sidebar JSON Loading Error:", error);

            // Keep old cached navigation if request fails.
            if (!cached) {
                showError("Navigation could not be loaded.");
            }
        }
    }

    /* =====================================================
       12. HASH CHANGE
    ===================================================== */

    window.addEventListener("hashchange", () => {
        const cached = readCache();

        if (cached) {
            renderNavigation(getPageNavigation(cached.data));
        }
    });

    /* =====================================================
       13. INITIALIZE
    ===================================================== */

    loadNavigation();
});