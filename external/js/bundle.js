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

        // external/js/api/global.js ==============
        "aHR0cHM6Ly9jb2RlcnN1c2hlZWwuZ2l0aHViLmlvL2hhcHJvYmFzZS9leHRlcm5hbC9qcy9hcGkvZ2xvYmFsLmpz",
        // "L2V4dGVybmFsL2pzL2FwaS9nbG9iYWwuanM=",


        // auth/auth.js      =================
        "aHR0cHM6Ly9jb2RlcnN1c2hlZWwuZ2l0aHViLmlvL2hhcHJvYmFzZS9leHRlcm5hbC9qcy9hdXRoL2F1dGguanM=",
        // "L2V4dGVybmFsL2pzL2F1dGgvYXV0aC5qcw==",


        // external/js/main/page-loader.js   ================
        "aHR0cHM6Ly9jb2RlcnN1c2hlZWwuZ2l0aHViLmlvL2hhcHJvYmFzZS9leHRlcm5hbC9qcy9tYWluL3BhZ2UtbG9hZGVyLmpz",
        // "L2V4dGVybmFsL2pzL21haW4vcGFnZS1sb2FkZXIuanM=",



        // external/js/main/script.js   ================
        "aHR0cHM6Ly9jb2RlcnN1c2hlZWwuZ2l0aHViLmlvL2hhcHJvYmFzZS9leHRlcm5hbC9qcy9tYWluL3NjcmlwdC5qcw==",
        // "L2V4dGVybmFsL2pzL21haW4vc2NyaXB0Lmpz",



        // security/anti-inspect.js    =========================
        // "aHR0cHM6Ly9jb2RlcnN1c2hlZWwuZ2l0aHViLmlvL2hhcHJvYmFzZS9leHRlcm5hbC9qcy9zZWN1cml0eS9hbnRpLWluc3BlY3QuanM=",
        // "L2V4dGVybmFsL2pzL3NlY3VyaXR5L2FudGktaW5zcGVjdC5qcw==",


        /////////////////// page end ////////////////////



        // ==========================================================================
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


