import { sortingAndPaginationSchema } from "../schemas/sorting";
import { apiKeyHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const createAPIKeySchema = z.object({
  type: z.enum([
    "ANTHROPIC",
    "OPENAI",
    "MISTRAL",
    "TOGETHER",
    "GROQ",
    "GOOGLE",
    "COHERE",
    "FIREWORKS",
    "PERPLEXITY",
    "DEEPSEEK",
    "XAI",
  ]),
  key: z.string().min(1),
});

const updateAPIKeySchema = z.object({
  key: z.string().min(1),
});

const app = new Hono()
  .use(clerkMiddleware())
  .use(apiKeyHonoService.middleware("apiKeyService"))
  .get(
    "/:type",
    zValidator("param", z.object({ type: z.string() })),
    async (c) => {
      const { type } = c.req.valid("param");
      const apiKeyService = c.var.apiKeyService;

      const auth = getAuth(c);

      if (!auth?.userId || !auth?.orgId) {
        return c.json(
          {
            message: "You are not logged in or not part of an organization.",
          },
          401,
        );
      }

      const apiKey = await apiKeyService.getAPIKeyByType(auth.orgId, type);
      return c.json(
        apiKey ? { exists: true, apiKey } : { exists: false, apiKey: null },
        200,
      );
    },
  )
  .post("/", zValidator("json", createAPIKeySchema), async (c) => {
    const apiKeyService = c.var.apiKeyService;

    const auth = getAuth(c);

    if (!auth?.userId || !auth?.orgId) {
      return c.json(
        {
          message: "You are not logged in or not part of an organization.",
        },
        401,
      );
    }

    const values = c.req.valid("json");

    const apiKey = await apiKeyService.createAPIKey(auth.orgId, values);

    return c.json("key created", 201);
  })
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const apiKeyService = c.var.apiKeyService;

      const auth = getAuth(c);

      if (!auth?.userId || !auth?.orgId) {
        return c.json(
          {
            message: "You are not logged in or not part of an organization.",
          },
          401,
        );
      }

      const result = await apiKeyService.revokeAPIKey(auth.orgId, id);
      return c.json(result, 200);
    },
  )
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", updateAPIKeySchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      const apiKeyService = c.var.apiKeyService;

      const auth = getAuth(c);

      if (!auth?.userId || !auth?.orgId) {
        return c.json(
          {
            message: "You are not logged in or not part of an organization.",
          },
          401,
        );
      }

      try {
        const updatedApiKey = await apiKeyService.updateAPIKey(
          auth.orgId,
          id,
          values,
        );
        return c.json({ message: "API key updated successfully" }, 200);
      } catch (error) {
        return c.json({ message: (error as Error).message }, 400);
      }
    },
  );

export default app;
