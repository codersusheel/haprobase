const paths = [
    "https://ha-api.netlify.app/assets/js/global.js",
    "/external/js/security/content-protect.js",
    atob("L2Fzc2V0cy9hcGkvZ2xvYmFsLmpz")
];

paths.forEach(path => {
    console.log(path);
    console.log(btoa(path));
    console.log("");
});