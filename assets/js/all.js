(function () {

    "use strict";

    /* =========================================================
       HAPROVEN CORE LOADER
       Base64 encoded paths
    ========================================================= */

    const decode = function (value) {
        return atob(value);
    };

    const files = [

        // page/script.js
        "L2Fzc2V0cy9qcy9wYWdlL3NjcmlwdC5qcw=="


    ];

    files.forEach(function (encoded) {

        const src = decode(encoded);

        document.write(
            '<script src="' + src + '"><\/script>'
        );

    });

})();