const paths = [
    "/external/js/page-loader.js",
    "/external/js/security/page-protection.js",
    atob("L2Fzc2V0cy9hcGkvZ2xvYmFsLmpz")
];

paths.forEach(path => {
    console.log(path);
    console.log(btoa(path));
    console.log("");
});