import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
// routers start
import webhooks from "./routers/webhooks";
import circut from "./routers/circut";
import memory from "./routers/memory";
import document from "./routers/document";
import { ourFileRouter } from "../storage/core";
import {} from "../storage";
// routers end

const app = new Hono().basePath("/api").use(prettyJSON());

const routes = app
  .route("/document", document)
  .route("/webhooks", webhooks)
  .route("/memory", memory)
  .route("/circut", circut)
  .route("/uploadthing", ourFileRouter);

export type AppType = typeof routes;

export { app };
export * from "hono/client";
