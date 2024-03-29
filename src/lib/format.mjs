import i18n from "i18n";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const formatCaution = async (params) => {
  i18n.configure({
    locales: ["en", "fr", "de"], // Supported languages
    directory: path.join(__dirname, "locales"), // Path to translation files
    defaultLocale: "en", // Default language
    autoReload: true, // watch for changes in JSON files to reload locale on updates - defaults to false
    objectNotation: true, // Allows for nested translations
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Caution: Potentially Malicious Website</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css" rel="stylesheet">
  <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f1f1f1;
        margin: 0;
        padding: 0;
    }
    .container {
        max-width: 600px;
        margin: 100px auto;
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    h1 {
        color: #ff0000;
    }
    p {
        margin-bottom: 20px;
        color: #333;
    }
    .emphasis {
        font-weight: bold;
        color: #ff0000;
    }
    .copy-button {
      position: relative;
      float: right;
      margin-top: -32px;
      margin-right: 8px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 4px 8px;
      font-size: 14px;
    }
    pre {
      white-space: pre-wrap;
      text-align: left;
    }
    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      font-size: 80%;
    }
    .expandable-section {
      display: none;
    }
    .expandable-button {
        cursor: pointer;
        color: #007bff;
        text-decoration: underline;
    }
    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${i18n.__({ phrase: "title", locale: `${params.lang}` })}</h1>
    <p>${i18n.__({
      phrase: "greeting",
      locale: `${params.lang}`,
    })}, <span class="emphasis">${params.user}</span></p>
    <p>${i18n
      .__({ phrase: "msg", locale: params.lang })
      .replace("%s", `<span class="emphasis">${params.cat}</span>`)
      .replace("%s", `<span class="emphasis">${params.reason}</span>`)}.</p>
    <p>${i18n.__({
      phrase: "website",
      locale: `${params.lang}`,
    })} <span class="emphasis">${params.url}</span></p>
    <p>${i18n.__({ phrase: "proceed", locale: `${params.lang}` })}</p>
    <button onclick="continueToWebsite()">${i18n.__({
      phrase: "continue",
      locale: `${params.lang}`,
    })}</button>
    <br><br><br>
    <p class="expandable-button" onclick="toggleExpand()">Show Debug Information</p>
    <div class="expandable-section" id="debugInfo">
      <button class="copy-button" onclick="copyCode(this)">Copy</button>
      <pre><code class="language-json">
${JSON.stringify(
  {
    ...params,
    forward_url: `https://gateway.zscaler.net:443/_sm_ctn?_sm_url=${params.url}&_sm_rid=${params.zsq}&_sm_cat=${params.cat}`,
  },
  null,
  2
)}
      </code></pre>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/plugins/autoloader/prism-autoloader.min.js"></script>
  <script>
    function continueToWebsite() {
        // Redirect to the requested website
        window.location.href = "${`https://gateway.zscaler.net:443/_sm_ctn?_sm_url=${params.url}&_sm_rid=${params.zsq}&_sm_cat=${params.cat}`}";
    }
    function copyCode(button) {
      var code = button.nextElementSibling.textContent;
      navigator.clipboard.writeText(code).then(function() {
          button.textContent = 'Copied!';
          setTimeout(function() {
              button.textContent = 'Copy';
          }, 1500);
      }, function(err) {
          console.error('Failed to copy: ', err);
      });
    }
    function toggleExpand() {
      var section = document.querySelector('.expandable-section');
      var button = document.querySelector('.expandable-button');
      if (section.style.display === 'none') {
          section.style.display = 'block';
          button.textContent = 'Hide Debug Information';
      } else {
          section.style.display = 'none';
          button.textContent = 'Show Debug Information';
      }
    }
  </script>
</body>
</html>`;
};
