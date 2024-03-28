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
              display: none;
              text-align: left;
              margin-top: 20px;
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
          <h1>Caution!</h1>
          <p>Hello, <span class="emphasis">${params.user}</span>.</p>
          <p>You are about to access a website categorized as <span class="emphasis">${
            params.cat
          }</span>, which is blocked for the following reason: <span class="emphasis">${
    params.reason
  }</span>.</p>
          <p>The website you tried to visit is: <span class="emphasis">${
            params.url
          }</span>.</p>
          <p>Proceed at your own risk.</p>
          <button onclick="continueToWebsite()">Continue</button>
          <br><br>
          <div class="debug-info" id="debugInfo">
              <h2>Debug Information</h2>
              <pre>
${JSON.stringify(params, null, 2)}
              </pre>
          </div>
          <button onclick="toggleDebugInfo()">Debug Info</button>
      </div>

      <script>
          function continueToWebsite() {
              // Redirect to the requested website
              window.location.href = "${`https://gateway.zscaler.net:443/_sm_ctn?_sm_url=${params.url}&_sm_rid=${params.zsq}&_sm_cat=${params.cat}`}"; // Replace [WEBSITE_URL] with the actual URL
          }

          function toggleDebugInfo() {
              var debugInfo = document.getElementById("debugInfo");
              if (debugInfo.style.display === "none") {
                  debugInfo.style.display = "block";
              } else {
                  debugInfo.style.display = "none";
              }
          }
      </script>
  </body>
  </html>
`;
};
