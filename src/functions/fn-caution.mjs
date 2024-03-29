import { app } from "@azure/functions";
import { sendHtml, sendErr } from "../lib/response.mjs";
import useragent from "useragent";
import { formatCaution } from "../lib/format.mjs";

async function caution(req, context) {
  try {
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

// http://localhost:7071/caution?url=https://www.gambling.com/&referer=&reason=Not+allowed+to+browse+Gambling+category&reasoncode=CATEGORY_DENIED&timebound=1&action=deny&kind=category&rule=322760&cat=Gambling&user=user@domain.tld&locid=00000000&lang=fr_FR&zsq=JDspV0Ft81ZLq0j55Z0FsFsL6n0VSDV0F86pDD6zsq
