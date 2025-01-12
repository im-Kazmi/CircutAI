import { sortingAndPaginationSchema } from "../schemas/sorting";
import { circutHonoService, memoryHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Memory, MemoryPrivacy } from "@repo/database";
import { Hono } from "hono";
import { z } from "zod";

export const createMemoryForm = z.object({
  name: z.string().min(2, {
    message: "memroy name must be at least 2 characters.",
  }),
  description: z.string(),
});

const app = new Hono()
  .use(clerkMiddleware())
  .use(memoryHonoService.middleware("memoryService"))
  .get("/list", zValidator("query", sortingAndPaginationSchema), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const memoryService = c.var.memoryService;

    const { page, sortBy, pageSize, sortOrder } = c.req.valid("query");

    const circuts = await memoryService.list(
      {
        page: page ? Number.parseInt(page, 10) : 1,
        pageSize: pageSize ? Number.parseInt(pageSize, 10) : 10,
        sortBy: sortBy ? (sortBy as keyof Memory) : "name",
        sortOrder: sortOrder ? sortOrder : "desc",
      },
      auth.orgId!,
    );

    return c.json(circuts, 200);
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const memoryService = c.var.memoryService;

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const circut = await memoryService.getMemoryByIdandOrg(id, auth.orgId!);
    return c.json(circut, 200);
  })
  .post("/", zValidator("json", createMemoryForm), async (c) => {
    const memoryService = c.get("memoryService");

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const values = c.req.valid("json");

    const circut = await memoryService.createMemory(auth.orgId!, {
      ...values,
      user: {
        connect: {
          clerkId: auth.userId,
        },
      },
    });

    return c.json(circut, 200);
  });

export default app;
