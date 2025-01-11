import { Hono } from "hono";

// routers start
import webhooks from "./routers/webhooks";
import test from "./routers/test";
import circut from "./routers/circut";
// routers end
import { prettyJSON } from "hono/pretty-json";

const app = new Hono().basePath("/api").use(prettyJSON());

const routes = app
  .route("/webhooks", webhooks)
  .route("/test", test)
  .route("/circut", circut);

export type AppType = typeof routes;

export { app };
export * from "hono/client";
