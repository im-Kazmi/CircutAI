import { sortingAndPaginationSchema } from "../schemas/sorting";
import { documentHonoService, memoryHonoService } from "../services";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import axios from "axios";
import { uploadAndProcessDocument } from "../trigger/process-docs";
import { v4 as uuid } from "uuid";

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
  .post("/", async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json(
        {
          message: "You are not logged in.",
        },
        400,
      );
    }

    const formData = await c.req.formData();
    const parsedBody = await c.req.parseBody();
    const blob = await c.req.blob();
    console.log("Content-Type:", c.req.header("content-type"));
    const memoryId = formData.get("memoryId") as string;
    const files = formData.getAll("files") as unknown as File[];

    console.log("formData = ", formData);
    console.log("parsedBody = ", parsedBody);
    console.log("blob = ", blob);
    console.log("memoryId = ", memoryId);
    console.log("files = ", files);
    console.log("1st file = ", files[0]);

    if (files.length === 0) {
      return c.json({ error: "No files uploaded" }, 400);
    }

    try {
      const serializedFiles = await Promise.all(
        files.map(async (file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
          content: await file
            .arrayBuffer()
            .then((buffer) => Array.from(new Uint8Array(buffer))),
        })),
      );

      const taskResult = await uploadAndProcessDocument.trigger({
        files: serializedFiles,
        memoryId,
        userId: auth.userId,
        orgId: auth.orgId!,
      });

      console.log("Task is running with handle", taskResult.id);
      return c.json("triggerted");
    } catch (error) {
      console.error("Error uploading file:", error);
      return c.json({ error: "Failed to upload one or more files" }, 500);
    }
  });

export default app;
