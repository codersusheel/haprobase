


const searchInput = document.getElementById("linkSearch");
const linkList = document.getElementById("linkList");
const links = linkList.querySelectorAll("li");

const clearButton = document.getElementById("clearSearch");
const searchCount = document.getElementById("searchCount");
const noResult = document.getElementById("noResult");


function searchLinks() {

    const searchValue = searchInput.value
        .trim()
        .toLowerCase();

    let visibleCount = 0;

    links.forEach(function (li) {

        const text = li.textContent.toLowerCase();

        if (searchValue === "") {

            li.style.display = "";
            li.classList.remove("search-highlight");

            visibleCount++;

        } else if (text.includes(searchValue)) {

            li.style.display = "";
            li.classList.add("search-highlight");

            visibleCount++;

        } else {

            li.style.display = "none";
            li.classList.remove("search-highlight");

        }

    });


    /* Search Count */

    if (searchValue === "") {

        searchCount.textContent =
            links.length + " links";

    } else {

        searchCount.textContent =
            visibleCount + " result" +
            (visibleCount !== 1 ? "s" : "");

    }


    /* Clear Button */

    clearButton.style.display =
        searchValue ? "block" : "none";


    /* No Result */

    noResult.style.display =
        visibleCount === 0 ? "block" : "none";

}


/* Search */

searchInput.addEventListener(
    "input",
    searchLinks
);


/* Clear */

clearButton.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        searchLinks();

        searchInput.focus();

    }
);


/* Initial Count */

searchLinks();



















// ---------------------------------------------

/* Auto add copy icon */
document.querySelectorAll("#linkList li").forEach(li => {

    const link = li.querySelector("a");
    if (!link) return;

    const btn = document.createElement("button");

    btn.className = "copy-btn";
    btn.type = "button";
    btn.title = "Copy name";
    btn.textContent = "📋";

    btn.onclick = async () => {

        await navigator.clipboard.writeText(
            link.textContent.trim()
        );

        btn.textContent = "✓";
        btn.classList.add("copied");

        setTimeout(() => {
            btn.textContent = "📋";
            btn.classList.remove("copied");
        }, 1000);
    };

    li.appendChild(btn);
});








