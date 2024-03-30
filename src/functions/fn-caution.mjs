import { app } from "@azure/functions";
import { sendHtml, sendErr } from "../lib/response.mjs";
import useragent from "useragent";
import { formatCaution } from "../lib/format.mjs";

async function caution(req, context) {
  try {
    let headers = {};
    let query = {};

    req.headers.forEach((v, k) => (headers[k] = v));
    req.query.forEach((v, k) => (query[k] = v));

    let params = {
      action: req.query.get("action"),
      cat: req.query.get("cat"),
      kind: req.query.get("kind"),
      reason: req.query.get("reason").replace(/\+/g, " "),
      reasoncode: req.query.get("reasoncode"),
      referer: req.query.get("referer"),
      rule: req.query.get("rule"),
      timebound: req.query.get("timebound"),
      url: req.query.get("url"),
      user: req.query.get("user"),
      locid: req.query.get("locid"),
      lang: req.query.get("lang").split("_")[0].toLowerCase(),
      zsq: req.query.get("zsq").split("zsq")[0],
      useragent: useragent.parse(req.headers.get("user-agent")),
      headers: headers,
      query: query,
    };

    let content = await formatCaution(params);

    return sendHtml(content);
  } catch (err) {
    sendErr(err);
  }
}

app.http("fn-caution", {
  methods: ["GET"],
  route: "caution",
  handler: caution,
});
