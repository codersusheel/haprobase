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

        // page-protection.js
        "L2V4dGVybmFsL2pzL3NlY3VyaXR5L3BhZ2UtcHJvdGVjdGlvbi5qcw==",

        // global.js
        "L2Fzc2V0cy9hcGkvZ2xvYmFsLmpz"



    ];

    files.forEach(function (encoded) {

        const src = decode(encoded);

        document.write(
            '<script src="' + src + '"><\/script>'
        );

    });

})();