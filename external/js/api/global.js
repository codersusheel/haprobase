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
            "/assets/json/hub-menu.json"
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
            "/assets/json/hub-menu.json"
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
            "/assets/json/hub-menu.json"
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
    fetch("Assets/json/side-link.json")
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







