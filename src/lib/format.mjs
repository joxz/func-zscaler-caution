import i18n from "i18n";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

i18n.configure({
  locales: ["en", "fr", "de"], // Supported languages
  directory: path.join(__dirname, "locales"), // Path to translation files
  defaultLocale: "en", // Default language
  autoReload: true, // watch for changes in JSON files to reload locale on updates - defaults to false
  objectNotation: true, // Allows for nested translations
});

export const formatCaution = async (params) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Caution: Potentially Malicious Website</title>
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
          .debug-info {
              text-align: left;
              margin-top: 20px;
              background-color: #efefef;
              border-radius: 8px;
              padding: 10px;
          }
          pre {
            white-space: pre-wrap;
            text-align: left;
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
            .replace(
              "%s",
              `<span class="emphasis">${params.reason}</span>`
            )}.</p>
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
          <div class="debug-info" id="debugInfo">
              <h2>Debug Information</h2>
              <pre>
${JSON.stringify(
  {
    ...params,
    forward_url: `https://gateway.zscaler.net:443/_sm_ctn?_sm_url=${params.url}&_sm_rid=${params.zsq}&_sm_cat=${params.cat}`,
  },
  null,
  4
)}
              </pre>
          </div>
      </div>

      <script>
          function continueToWebsite() {
              // Redirect to the requested website
              window.location.href = "${`https://gateway.zscaler.net:443/_sm_ctn?_sm_url=${params.url}&_sm_rid=${params.zsq}&_sm_cat=${params.cat}`}";
          }
      </script>
  </body>
  </html>
`;
};
