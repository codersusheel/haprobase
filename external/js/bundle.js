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

        // api/global.js
        "L2V4dGVybmFsL2pzL2FwaS9nbG9iYWwuanM=",

        // auth/auth.js
        "L2V4dGVybmFsL2pzL2F1dGgvYXV0aC5qcw==",

        // main/page-loader.js
        "L2V4dGVybmFsL2pzL21haW4vcGFnZS1sb2FkZXIuanM=",

        // main/script.js
        "L2V4dGVybmFsL2pzL21haW4vc2NyaXB0Lmpz",

        // security/anti-inspect.js
        // "L2V4dGVybmFsL2pzL3NlY3VyaXR5L2FudGktaW5zcGVjdC5qcw==",









        // page-protection.js
        // "L2V4dGVybmFsL2pzL3NlY3VyaXR5L2FudGktaW5zcGVjdC5qcw==",

        // global.js
        // "L2Fzc2V0cy9hcGkvZ2xvYmFsLmpz",


        // "L2V4dGVybmFsL2pzL3NlY3VyaXR5L3BhZ2UtcHJvdGVjdGlvbi5qcw=="



    ];

    files.forEach(function (encoded) {

        const src = decode(encoded);

        document.write(
            '<script src="' + src + '"><\/script>'
        );

    });

})();

