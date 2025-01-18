import { sortingAndPaginationSchema } from "../schemas/sorting";
import { toolHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Tool } from "@repo/database";
import { Hono } from "hono";
import { createToolForm } from "../schemas/tool";
import { z } from "zod";

const app = new Hono()
  .use(clerkMiddleware())
  .use(toolHonoService.middleware("toolService"))
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

    const toolService = c.var.toolService;

    const { page, sortBy, pageSize, sortOrder } = c.req.valid("query");

    const tools = await toolService.list(
      {
        page: page ? Number.parseInt(page, 10) : 1,
        pageSize: pageSize ? Number.parseInt(pageSize, 10) : 10,
        sortBy: sortBy ? (sortBy as keyof Tool) : "name",
        sortOrder: sortOrder ? sortOrder : "desc",
      },
      auth.orgId!,
    );

    return c.json(tools, 200);
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const toolService = c.var.toolService;

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const tool = await toolService.getToolById(id);

    if (
      !tool ||
      !tool.CircutTool.some((ct) => ct.circut.orgId === auth.orgId)
    ) {
      return c.json(
        {
          message: "Tool not found or you don't have permission to access it.",
        },
        404,
      );
    }

    return c.json(tool, 200);
  })
  .post("/", zValidator("json", createToolForm), async (c) => {
    const toolService = c.var.toolService;

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

    const tool = await toolService.createTool({
      ...values,
      CircutTool: {
        create: {
          circut: {
            connect: {
              id: values.circutId,
              orgId: auth.orgId!,
            },
          },
        },
      },
    });

    return c.json(tool, 200);
  })
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", createToolForm),
    async (c) => {
      const { id } = c.req.valid("param");
      const toolService = c.var.toolService;

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

      const existingTool = await toolService.getToolById(id);

      if (
        !existingTool ||
        !existingTool.CircutTool.some((ct) => ct.cirut.orgId === auth.orgId)
      ) {
        return c.json(
          {
            message:
              "Tool not found or you don't have permission to update it.",
          },
          404,
        );
      }

      const updatedTool = await toolService.updateTool(id, values);

      return c.json(updatedTool, 200);
    },
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const toolService = c.var.toolService;

      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400,
        );
      }

      const existingTool = await toolService.getToolById(id);

      if (
        !existingTool ||
        !existingTool.CircutTool.some((ct) => ct.circut.orgId === auth.orgId)
      ) {
        return c.json(
          {
            message:
              "Tool not found or you don't have permission to delete it.",
          },
          404,
        );
      }

      await toolService.deleteTool(id);

      return c.json({ message: "Tool deleted successfully" }, 200);
    },
  );

export default app;
