import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

// routers start
import webhooks from "./routers/webhooks";
import circut from "./routers/circut";
import memory from "./routers/memory";
// routers end

const app = new Hono().basePath("/api").use(prettyJSON());

const routes = app
  .route("/webhooks", webhooks)
  .route("/memory", memory)
  .route("/circut", circut);

export type AppType = typeof routes;

export { app };
export * from "hono/client";
