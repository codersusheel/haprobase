const paths = [
    "/assets/api/global.js",
    "/assets/api/side-link.js",
    atob("L2Fzc2V0cy9hcGkvZ2xvYmFsLmpz")
];

paths.forEach(path => {
    console.log(path);
    console.log(btoa(path));
    console.log("");
});