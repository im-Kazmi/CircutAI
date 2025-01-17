import { z } from "zod";

export const createDocumentSchema = z.object({
  memoryId: z.string(),
  files: z.array(z.instanceof(File)),
});
