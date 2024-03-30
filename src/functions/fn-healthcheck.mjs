import { app } from "@azure/functions";
import { sendErr, sendNoContent } from "../lib/response.mjs";

async function healthcheck(req, context) {
  try {
    return sendNoContent();
  } catch (err) {
    return sendErr(err);
  }
}

app.http("fn-healthcheck", {
  methods: ["GET"],
  route: "healthcheck",
  handler: healthcheck,
});
