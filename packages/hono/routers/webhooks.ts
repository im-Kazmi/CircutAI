import type { WebhookEvent } from "@repo/auth/server";
import { Hono } from "hono";
import { Webhook } from "svix";

import { orgHonoService, webhookHonoService } from "../services";

const app = new Hono()
  .use(webhookHonoService.middleware("webhookService"))
  .post("/clerk", async (c) => {
    const webhookService = c.var.webhookService;
    webhookService.handleClerk(c);
  });

export default app;
