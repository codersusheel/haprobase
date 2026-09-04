


(function () {

    const MIN_WIDTH = screen.width - 100;
    const MIN_HEIGHT = screen.height - 100;

    function isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    if (!isMobile() && (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT)) {
        blockPage();
    }

    function blockPage() {
        document.body.innerHTML = "";
        document.body.style.background = "#1d0101e0";
        document.body.style.minHeight = "100vh";
        document.body.style.margin = "0";

        document.body.style.display = "grid";
        document.body.style.placeItems = "center";

        document.body.style.color = "#ffffff";
        document.body.style.fontSize = "40px";
        document.body.style.fontWeight = "bold";
        document.body.style.fontFamily = "Arial, sans-serif";
        document.body.style.textAlign = "center";

        document.body.innerHTML = `
            🚨 Security Alert:
          
    
        `;
        // <br><br>
        // <span style="font-size:18px; position: fixed; bottom: 10px; right: 10px;">
        //     Redirecting to Home...
        // </span>

        setTimeout(function () {
            window.location.href = "/";
        }, 500);
    }

    function detectDevTools() {
        if (isMobile()) return; // mobile skip

        const widthDiff = window.outerWidth - window.innerWidth;
        const heightDiff = window.outerHeight - window.innerHeight;

        if (widthDiff > 160 || heightDiff > 160) {
            blockPage();
        }

        if (window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT) {
            blockPage();
        }
    }

    // Disable right click
    document.addEventListener("contextmenu", e => e.preventDefault());

    // Disable common inspect shortcuts
    document.addEventListener("keydown", function (e) {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) ||
            (e.ctrlKey && e.key.toUpperCase() === "U")
        ) {
            e.preventDefault();
            blockPage();
        }
    });

    // Check repeatedly
    setInterval(detectDevTools, 100);

})();


// normal function
function calculate(a, b) {
    return a + b;
}

// obfuscated wala fix
var _0x23fa = ['return'];
function _0x1a2b(_0xa, _0xb) {
    return _0xa + _0xb;
}

























// IF WEBSITE OPENED INSIDE FRAME / WRAP
if (window.top !== window.self) {

    // BREAK OUT
    window.top.location = window.location;

}



if (window.top !== window.self) {

    window.top.location =
        "https://susheelcoder.netlify.app/Assetes/IMG/A/image.png";

}




(function () {

    // Block view-source
    if (window.location.href.startsWith("view-source:")) {
        window.location.href = "about:blank";
    }

    // Detect source/opened raw page
    setTimeout(() => {
        if (document.documentElement.innerHTML.length < 50) {
            location.reload();
        }
    }, 100);

})();




if (window.location.href.includes("view-source:https://susheelcoder.netlify.app")) {
    window.location.href =
        "https://susheelcoder.netlify.app/Assetes/IMG/A/image.png";
}









/* =========================================
   DISABLE RIGHT CLICK
========================================= */

document.addEventListener("contextmenu", e => e.preventDefault());



/* =========================================
   DISABLE INSPECT SHORTCUTS
========================================= */

document.addEventListener("keydown", function (e) {

    if (

        e.key === "F12" ||

        (e.ctrlKey && e.shiftKey &&
            ["I", "J", "C", "K"].includes(e.key))

        ||

        (e.ctrlKey &&
            ["u", "s", "p"].includes(e.key.toLowerCase()))

    ) {

        e.preventDefault();

        document.body.innerHTML = `
        <style>
            body{
                margin:0;
                background:#000;
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                color:#fff;
                font-family:sans-serif;
                font-size:30px;
            }
        </style>

        Access Denied
        `;

        setTimeout(() => {
            location.href = "about:blank";
        }, 1000);

    }

});



/* =========================================
   DEVTOOLS DETECT
========================================= */

setInterval(() => {

    if (

        window.outerWidth - window.innerWidth > 160 ||

        window.outerHeight - window.innerHeight > 160

    ) {

        document.body.innerHTML = "";

        location.href =
            "https://susheelcoder.netlify.app/Assetes/IMG/A/image.png";

    }

}, 1000);



/* =========================================
   DISABLE TEXT SELECT
========================================= */

document.onselectstart = () => false;



/* =========================================
   DISABLE DRAG
========================================= */

document.ondragstart = () => false;



/* =========================================
   ANTI DEBUGGER
========================================= */

setInterval(function () {
    debugger;
}, 200);



/* =========================================
   CLEAR CONSOLE
========================================= */

setInterval(function () {
    console.clear();
}, 1000);



/* =========================================
   FAKE CONSOLE MESSAGE
========================================= */

console.log("%cSTOP!",
    "color:red;font-size:50px;font-weight:bold;");

console.log(
    "%cThis is a protected website.",
    "font-size:20px;"
);

