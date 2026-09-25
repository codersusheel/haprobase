


document.addEventListener("DOMContentLoaded", () => {

    const copyHub = document.getElementById("copyhub");
    const searchInput = document.getElementById("linkSearch");
    const searchCount = document.getElementById("searchCount");
    const clearSearch = document.getElementById("clearSearch");
    const noResult = document.getElementById("noResult");

    if (!copyHub || !searchInput) return;

    const items = Array.from(
        copyHub.querySelectorAll("li")
    );


    /* =========================
       SEARCH
    ========================== */

    function updateSearch() {

        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCount = 0;


        items.forEach(item => {

            const text =
                item.textContent
                    .trim()
                    .toLowerCase();

            const matched =
                searchText === "" ||
                text.includes(searchText);

            item.style.display =
                matched ? "" : "none";

            if (matched) {
                visibleCount++;
            }

        });


        /* =========================
           COUNT
        ========================== */

        if (searchCount) {

            searchCount.textContent =
                `${visibleCount} ${visibleCount === 1
                    ? "item"
                    : "items"
                }`;

        }


        /* =========================
           NO RESULT
        ========================== */

        if (noResult) {

            noResult.style.display =
                visibleCount === 0
                    ? "block"
                    : "none";

        }

    }


    /* =========================
       SEARCH INPUT
    ========================== */

    searchInput.addEventListener(
        "input",
        updateSearch
    );


    /* =========================
       CLEAR SEARCH
    ========================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                updateSearch();

                searchInput.focus();

            }
        );

    }


    /* =========================
       INITIAL LOAD
       SHOW ALL ITEMS
    ========================== */

    updateSearch();

});




