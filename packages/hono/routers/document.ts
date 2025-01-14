import { sortingAndPaginationSchema } from "../schemas/sorting";
import { documentHonoService, memoryHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

export const createDocumentSchema = z.object({
  memoryId: z.string(),
  files: z.array(
    z.object({
      fileName: z.string(),
      fileType: z.string(),
      fileSize: z.number().optional(),
      filePath: z.string(),
    }),
  ),
});

const app = new Hono()
  .use(clerkMiddleware())
  .use(documentHonoService.middleware("documentService"))
  .get(
    "/:memoryId/list",
    zValidator("query", sortingAndPaginationSchema),
    zValidator("param", z.object({ memoryId: z.string() })),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json(
          {
            message: "You are not logged in.",
          },
          400,
        );
      }

      const documentService = c.var.documentService;
      const { memoryId } = c.req.valid("param");
      const { page, sortBy, pageSize, sortOrder } = c.req.valid("query");

      const memories = await documentService.list(memoryId, auth.orgId!, {
        page: page ? Number.parseInt(page, 10) : 1,
        pageSize: pageSize ? Number.parseInt(pageSize, 10) : 10,
        sortBy: sortBy ? (sortBy as keyof Document) : "fileType",
        sortOrder: sortOrder ? sortOrder : "desc",
      });

      return c.json(memories, 200);
    },
  )
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");
    const documentService = c.var.documentService;

    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const memory = await documentService.getDocumentByIdandMemory(
      id,
      auth.orgId!,
    );
    return c.json(memory, 200);
  })
  .post("/", zValidator("json", createDocumentSchema), async (c) => {
    const documentService = c.var.documentService;
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

    let uploadedDocuments: any = [];

    for (const doc of values.files) {
      const uploaded = await documentService.createDocument(
        auth.orgId!,
        values.memoryId,
        {
          ...doc,
          memory: {
            connect: {
              id: values.memoryId,
            },
          },
        },
      );
      uploadedDocuments.push(uploaded);
    }

    return c.json(uploadedDocuments, 200);
  });

export default app;
