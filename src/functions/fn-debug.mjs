import { app } from "@azure/functions";
import { sendErr, sendJson } from "../lib/response.mjs";

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

    return sendJson(content);
  } catch (err) {
    return sendErr(err);
  }
}

app.http("fn-debug", {
  methods: ["GET"],
  route: "debug",
  handler: debug,
});
