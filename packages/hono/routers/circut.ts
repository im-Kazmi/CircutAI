import { sortingAndPaginationSchema } from "../schemas/sorting";
import { circutHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Circut, CircutPrivacy } from "@repo/database";
import { prisma, Prisma } from "@repo/database";
import { Hono } from "hono";
import { circutUpdateInputSchema, createCircutForm } from "../schemas/circut";
import { z } from "zod";

const app = new Hono()
  .use(clerkMiddleware())
  .use(circutHonoService.middleware("circutService"))
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

    const circutService = c.var.circutService;

    const { page, sortBy, pageSize, sortOrder } = c.req.valid("query");

    const circuts = await circutService.list(
      {
        page: page ? Number.parseInt(page, 10) : 1,
        pageSize: pageSize ? Number.parseInt(pageSize, 10) : 10,
        sortBy: sortBy ? (sortBy as keyof Circut) : "name",
        sortOrder: sortOrder ? sortOrder : "desc",
      },
      auth.orgId!,
    );

    return c.json(circuts, 200);
  })
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const circutService = c.var.circutService;

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const circut = await circutService.getCircutByIdandOrg(id, auth.orgId!);
    return c.json(circut, 200);
  })
  .post("/", zValidator("json", createCircutForm), async (c) => {
    const circutService = c.get("circutService");

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

    const circut = await circutService.createCircut(auth.orgId!, {
      ...values,
      user: {
        connect: {
          clerkId: auth.userId,
        },
      },
    });

    return c.json(circut, 200);
  })
  .put(
    "/:id",
    zValidator("json", circutUpdateInputSchema),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const circutService = c.get("circutService");

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
      const { id } = c.req.valid("param");

      const circut = await circutService.updateCircut(id, auth.orgId!, {
        ...values,
      });

      return c.json(circut, 200);
    },
  );

export default app;
