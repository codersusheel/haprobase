document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // ELEMENTS
  // =========================================================

  const encodeModeBtn = document.getElementById("encodeModeBtn");
  const decodeModeBtn = document.getElementById("decodeModeBtn");

  const fileType = document.getElementById("fileType");
  const fileInput = document.getElementById("fileInput");
  const encodeMethod = document.getElementById("encodeMethod");
  const encodingOptions = document.getElementById("encodingOptions");
  const methodInfo = document.getElementById("methodInfo");

  const encodeBtn = document.getElementById("encodeBtn");
  const decodeBtn = document.getElementById("decodeBtn");
  const swapBtn = document.getElementById("swapBtn");
  const clearBtn = document.getElementById("clearBtn");

  const status = document.getElementById("status");
  const outputGroup = document.getElementById("outputGroup");
  const outputCode = document.getElementById("outputCode");

  const resultType = document.getElementById("resultType");
  const resultMethod = document.getElementById("resultMethod");
  const resultSize = document.getElementById("resultSize");

  const copyBtn = document.getElementById("copyBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const useOutputBtn = document.getElementById("useOutputBtn");


  // =========================================================
  // METHODS
  // =========================================================

  const methods = {

    base64: {
      name: "Base64 Loader",
      description:
        "Encodes a CSS or JavaScript file URL using Base64 and loads it at runtime."
    },

    dynamic: {
      name: "Dynamic Loader",
      description:
        "Creates the CSS or JavaScript element dynamically at runtime."
    },

    src: {
      name: "Encoded Script / Link",
      description:
        "Hides the resource URL and restores it when the browser loads the page."
    },

    fast: {
      name: "Fast Loader",
      description:
        "Uses document.write for parser-time CSS or JavaScript loading."
    },

    document: {
      name: "Document Loader",
      description:
        "Loads an encoded CSS or JavaScript resource through document.write."
    },

    runtime: {
      name: "Runtime Decoder",
      description:
        "Decodes the hidden URL only when the resource is required."
    },

    compact: {
      name: "Compact Loader",
      description:
        "Generates a shorter runtime loader with reduced output."
    },

    minimal: {
      name: "Minimal Loader",
      description:
        "Generates a minimal CSS or JavaScript loader."
    },

    content: {
      name: "Document Write Base64",
      description:
        "Encodes any text or code and restores it instantly using document.write(atob())."
    }

  };


  // =========================================================
  // STATE
  // =========================================================

  let currentMode = "encode";


  // =========================================================
  // BASE64 ENCODE
  // =========================================================

  function encodeBase64(value) {

    return btoa(
      unescape(
        encodeURIComponent(value)
      )
    );

  }


  // =========================================================
  // BASE64 DECODE
  // =========================================================

  function decodeBase64(value) {

    return decodeURIComponent(
      escape(
        atob(value)
      )
    );

  }


  // =========================================================
  // FILE TYPE DETECTION
  // =========================================================

  function detectFileType(value) {

    const text = value.trim().toLowerCase();

    if (
      text.includes(".css") ||
      text.includes("text/css")
    ) {

      return "css";

    }

    if (
      text.includes(".js") ||
      text.includes("javascript")
    ) {

      return "js";

    }

    return "js";

  }


  function getFileType() {

    if (fileType.value !== "auto") {

      return fileType.value;

    }

    return detectFileType(fileInput.value);

  }


  function getTypeName(type) {

    return type === "css"
      ? "CSS"
      : "JavaScript";

  }


  // =========================================================
  // METHOD INFORMATION
  // =========================================================

  function updateMethodInfo() {

    const method = methods[encodeMethod.value];

    if (!method) return;

    methodInfo.innerHTML = `
      <strong>${method.name}</strong>
      <span>${method.description}</span>
    `;

  }


  encodeMethod.addEventListener(
    "change",
    updateMethodInfo
  );


  // =========================================================
  // 1. BASE64 LOADER
  // =========================================================

  function generateBase64Loader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
(()=>{const u=atob("${encoded}"),l=document.createElement("link");l.rel="stylesheet";l.href=u;document.head.appendChild(l)})();
<\/script>`;

    }

    return `<script>
(()=>{const u=atob("${encoded}"),s=document.createElement("script");s.src=u;document.head.appendChild(s)})();
<\/script>`;

  }


  // =========================================================
  // 2. DYNAMIC LOADER
  // =========================================================

  function generateDynamicLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
(()=>{const u=atob("${encoded}"),l=document.createElement("link");l.rel="stylesheet";l.href=u;document.head.appendChild(l)})();
<\/script>`;

    }

    return `<script>
(()=>{const u=atob("${encoded}"),s=document.createElement("script");s.src=u;s.async=false;document.head.appendChild(s)})();
<\/script>`;

  }


  // =========================================================
  // 3. ENCODED SCRIPT / LINK
  // =========================================================

  function generateSrcLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
(()=>{const l=document.createElement("link");l.rel="stylesheet";l.href=atob("${encoded}");document.head.appendChild(l)})();
<\/script>`;

    }

    return `<script>
(()=>{const s=document.createElement("script");s.src=atob("${encoded}");document.head.appendChild(s)})();
<\/script>`;

  }


  // =========================================================
  // 4. FAST LOADER
  // =========================================================

  function generateFastLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
document.write('<link rel="stylesheet" href="'+atob("${encoded}")+'">');
<\/script>`;

    }

    return `<script>
document.write('<script src="'+atob("${encoded}")+'"><\/script>');
<\/script>`;

  }


  // =========================================================
  // 5. DOCUMENT LOADER
  // =========================================================

  function generateDocumentLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
document.write('<link rel="stylesheet" href="'+atob("${encoded}")+'">');
<\/script>`;

    }

    return `<script>
document.write('<script src="'+atob("${encoded}")+'"><\/script>');
<\/script>`;

  }


  // =========================================================
  // 6. RUNTIME DECODER
  // =========================================================

  function generateRuntimeLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>
(function(){
  const u=atob("${encoded}");
  const l=document.createElement("link");
  l.rel="stylesheet";
  l.href=u;
  document.head.appendChild(l);
})();
<\/script>`;

    }

    return `<script>
(function(){
  const u=atob("${encoded}");
  const s=document.createElement("script");
  s.src=u;
  document.head.appendChild(s);
})();
<\/script>`;

  }


  // =========================================================
  // 7. COMPACT LOADER
  // =========================================================

  function generateCompactLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>(()=>{let l=document.createElement("link");l.rel="stylesheet";l.href=atob("${encoded}");document.head.append(l)})();<\/script>`;

    }

    return `<script>document.head.append(Object.assign(document.createElement("script"),{src:atob("${encoded}")}));<\/script>`;

  }


  // =========================================================
  // 8. MINIMAL LOADER
  // =========================================================

  function generateMinimalLoader(url, type) {

    const encoded = encodeBase64(url);

    if (type === "css") {

      return `<script>document.write('<link rel="stylesheet" href="'+atob("${encoded}")+'">')<\/script>`;

    }

    return `<script>document.write('<script src="'+atob("${encoded}")+'"><\/script>')<\/script>`;

  }


  // =========================================================
  // 9. DOCUMENT WRITE BASE64
  // =========================================================
  // EXACT METHOD REQUESTED BY USER
  //
  // Input:
  // Hello World
  //
  // Output:
  // <script>
  // document.write(atob("SGVsbG8gV29ybGQ="));
  // </script>
  // =========================================================

  function generateContentEncoder(input) {

    const encoded =
      encodeBase64(input);

    return `<script>
  document.write(atob("${encoded}"));
<\/script>`;

  }


  // =========================================================
  // ENCODE
  // =========================================================

  function encodeInput() {

    const input =
      fileInput.value;

    if (!input.trim()) {

      showStatus(
        "Please enter some text, code or a file URL.",
        "error"
      );

      return;

    }


    const method =
      encodeMethod.value;


    let result;
    let type;


    // -------------------------------------------------------
    // CONTENT BASE64 METHOD
    // -------------------------------------------------------

    if (method === "content") {

      type = detectFileType(input);

      result =
        generateContentEncoder(input);

    }


    // -------------------------------------------------------
    // URL / FILE METHODS
    // -------------------------------------------------------

    else {

      type =
        getFileType();


      switch (method) {

        case "base64":

          result =
            generateBase64Loader(
              input,
              type
            );

          break;


        case "dynamic":

          result =
            generateDynamicLoader(
              input,
              type
            );

          break;


        case "src":

          result =
            generateSrcLoader(
              input,
              type
            );

          break;


        case "fast":

          result =
            generateFastLoader(
              input,
              type
            );

          break;


        case "document":

          result =
            generateDocumentLoader(
              input,
              type
            );

          break;


        case "runtime":

          result =
            generateRuntimeLoader(
              input,
              type
            );

          break;


        case "compact":

          result =
            generateCompactLoader(
              input,
              type
            );

          break;


        case "minimal":

          result =
            generateMinimalLoader(
              input,
              type
            );

          break;


        default:

          result =
            generateBase64Loader(
              input,
              type
            );

      }

    }


    showResult(
      result,
      type,
      methods[method].name
    );


    showStatus(
      `${methods[method].name} generated successfully.`,
      "success"
    );

  }


  // =========================================================
  // EXTRACT BASE64
  // =========================================================

  function extractBase64(value) {

    const patterns = [

      /atob\(\s*["']([^"']+)["']\s*\)/i,

      /atob\(\s*`([^`]+)`\s*\)/i

    ];


    for (const pattern of patterns) {

      const match =
        value.match(pattern);


      if (
        match &&
        match[1]
      ) {

        return match[1];

      }

    }


    return null;

  }


  // =========================================================
  // DECODE
  // =========================================================

  function decodeInput() {

    const input =
      fileInput.value.trim();


    if (!input) {

      showStatus(
        "Please enter encoded output or Base64 data.",
        "error"
      );

      return;

    }


    try {

      let encoded =
        extractBase64(input);


      // -----------------------------------------------------
      // RAW BASE64
      // -----------------------------------------------------

      if (!encoded) {

        const clean =
          input
            .replace(/\s+/g, "")
            .replace(/-/g, "+")
            .replace(/_/g, "/");


        if (
          clean.length >= 4 &&
          /^[A-Za-z0-9+/]+=*$/.test(clean)
        ) {

          encoded =
            clean;

        }

      }


      if (!encoded) {

        showStatus(
          "No supported Base64 data was detected.",
          "error"
        );

        return;

      }


      const decoded =
        decodeBase64(encoded);


      const type =
        detectFileType(decoded);


      showResult(
        decoded,
        type,
        "Decoded"
      );


      showStatus(
        "Base64 decoded successfully.",
        "success"
      );

    }


    catch (error) {

      showStatus(
        "Invalid or unsupported Base64 data.",
        "error"
      );

    }

  }


  // =========================================================
  // SHOW RESULT
  // =========================================================

  function showResult(
    result,
    type,
    method
  ) {

    outputCode.value =
      result;


    resultType.textContent =
      getTypeName(type);


    resultMethod.textContent =
      method;


    resultSize.textContent =
      formatSize(
        new Blob([result]).size
      );


    outputGroup.classList.add(
      "show"
    );

  }


  // =========================================================
  // FORMAT SIZE
  // =========================================================

  function formatSize(bytes) {

    if (bytes < 1024) {

      return `${bytes} B`;

    }


    if (
      bytes <
      1024 * 1024
    ) {

      return `${(
        bytes / 1024
      ).toFixed(2)} KB`;

    }


    return `${(
      bytes /
      (1024 * 1024)
    ).toFixed(2)} MB`;

  }


  // =========================================================
  // STATUS
  // =========================================================

  function showStatus(
    message,
    type = ""
  ) {

    status.textContent =
      message;


    status.className =
      "status show";


    if (type) {

      status.classList.add(
        type
      );

    }


    if (
      type === "success"
    ) {

      setTimeout(() => {

        status.classList.remove(
          "show",
          "success",
          "error",
          "loading"
        );

      }, 3500);

    }

  }


  // =========================================================
  // MODE
  // =========================================================

  function setMode(mode) {

    currentMode =
      mode;


    if (
      mode === "encode"
    ) {

      encodeModeBtn.classList.add(
        "active"
      );

      decodeModeBtn.classList.remove(
        "active"
      );


      encodingOptions.style.display =
        "";


      encodeBtn.style.display =
        "";


      decodeBtn.style.display =
        "none";


      fileInput.placeholder =
        "e.g. /assets/js/index.js or enter code";

    }


    else {

      decodeModeBtn.classList.add(
        "active"
      );

      encodeModeBtn.classList.remove(
        "active"
      );


      encodingOptions.style.display =
        "none";


      encodeBtn.style.display =
        "none";


      decodeBtn.style.display =
        "";


      fileInput.placeholder =
        "Paste encoded output or Base64 data";

    }

  }


  // =========================================================
  // MODE BUTTONS
  // =========================================================

  encodeModeBtn.addEventListener(
    "click",
    () => setMode("encode")
  );


  decodeModeBtn.addEventListener(
    "click",
    () => setMode("decode")
  );


  // =========================================================
  // SWAP
  // =========================================================

  swapBtn.addEventListener(
    "click",
    () => {

      if (
        !outputCode.value.trim()
      ) {

        showStatus(
          "No result available to swap.",
          "error"
        );

        return;

      }


      const oldInput =
        fileInput.value;


      fileInput.value =
        outputCode.value;


      outputCode.value =
        oldInput;


      setMode(
        currentMode === "encode"
          ? "decode"
          : "encode"
      );


      showStatus(
        "Input and result swapped.",
        "success"
      );

    }
  );


  // =========================================================
  // CLEAR
  // =========================================================

  clearBtn.addEventListener(
    "click",
    () => {

      fileInput.value =
        "";


      outputCode.value =
        "";


      resultType.textContent =
        "—";


      resultMethod.textContent =
        "—";


      resultSize.textContent =
        "—";


      outputGroup.classList.remove(
        "show"
      );


      status.textContent =
        "";


      status.className =
        "status";


      fileType.value =
        "auto";


      encodeMethod.value =
        "base64";


      updateMethodInfo();


      setMode(
        "encode"
      );


      fileInput.focus();

    }
  );


  // =========================================================
  // COPY
  // =========================================================

  copyBtn.addEventListener(
    "click",
    async () => {

      const value =
        outputCode.value.trim();


      if (!value) {

        showStatus(
          "Nothing to copy.",
          "error"
        );

        return;

      }


      try {

        await navigator.clipboard.writeText(
          value
        );


        showStatus(
          "Result copied to clipboard.",
          "success"
        );

      }


      catch (error) {

        outputCode.select();

        document.execCommand(
          "copy"
        );


        showStatus(
          "Result copied to clipboard.",
          "success"
        );

      }

    }
  );


  // =========================================================
  // DOWNLOAD
  // =========================================================

  downloadBtn.addEventListener(
    "click",
    () => {

      const value =
        outputCode.value.trim();


      if (!value) {

        showStatus(
          "Nothing to download.",
          "error"
        );

        return;

      }


      const blob =
        new Blob(
          [value],
          {
            type:
              "text/html;charset=utf-8"
          }
        );


      const url =
        URL.createObjectURL(
          blob
        );


      const link =
        document.createElement(
          "a"
        );


      link.href =
        url;


      link.download =
        "encoded-loader.html";


      document.body.appendChild(
        link
      );


      link.click();


      link.remove();


      URL.revokeObjectURL(
        url
      );


      showStatus(
        "Encoded loader downloaded.",
        "success"
      );

    }
  );


  // =========================================================
  // USE RESULT
  // =========================================================

  useOutputBtn.addEventListener(
    "click",
    () => {

      const value =
        outputCode.value.trim();


      if (!value) {

        showStatus(
          "No result available.",
          "error"
        );

        return;

      }


      fileInput.value =
        value;


      setMode(
        "decode"
      );


      showStatus(
        "Result moved to decoder input.",
        "success"
      );


      fileInput.focus();

    }
  );


  // =========================================================
  // BUTTON EVENTS
  // =========================================================

  encodeBtn.addEventListener(
    "click",
    encodeInput
  );


  decodeBtn.addEventListener(
    "click",
    decodeInput
  );


  // =========================================================
  // CTRL + ENTER
  // =========================================================

  fileInput.addEventListener(
    "keydown",
    (event) => {

      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key === "Enter"
      ) {

        event.preventDefault();


        if (
          currentMode === "encode"
        ) {

          encodeInput();

        }

        else {

          decodeInput();

        }

      }

    }
  );


  // =========================================================
  // INITIALIZE
  // =========================================================

  updateMethodInfo();

  setMode(
    "encode"
  );

});
