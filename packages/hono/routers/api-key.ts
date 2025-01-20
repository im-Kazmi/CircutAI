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

const app = new Hono()
  .use(clerkMiddleware())
  .use(apiKeyHonoService.middleware("apiKeyService"))
  .get("/list", zValidator("query", sortingAndPaginationSchema), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId || !auth?.orgId) {
      return c.json(
        {
          message: "You are not logged in or not part of an organization.",
        },
        401,
      );
    }

    const apiKeyService = c.var.apiKeyService;

    const { page, sortBy, pageSize, sortOrder } = c.req.valid("query");

    const apiKeys = await apiKeyService.list(
      {
        page: page ? Number.parseInt(page, 10) : 1,
        pageSize: pageSize ? Number.parseInt(pageSize, 10) : 10,
        sortBy: sortBy ? (sortBy as keyof APIKey) : "createdAt",
        sortOrder: sortOrder ? sortOrder : "desc",
      },
      auth.orgId,
    );

    return c.json(apiKeys, 200);
  })
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
      return c.json(apiKey ? { exists: true } : { exists: false }, 200);
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
  );

export default app;
