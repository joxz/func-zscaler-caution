import { app } from "@azure/functions";

async function debug(req, context) {
  try {
    let headers = {};
    let query = {};

    req.headers.forEach((v, k) => (headers[k] = v));
    req.query.forEach((v, k) => (query[k] = v));

    let content = {
      request: {
        headers: headers,
        query: query,
        method: req.method,
        url: req.url,
        body: req.body,
      },
      context: context,
    };

    return {
      status: 200,
      body: JSON.stringify(content, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (err) {
    return "problem";
  }
}

app.http("ebug", {
  methods: ["GET"],
  route: "debug",
  handler: debug,
});
