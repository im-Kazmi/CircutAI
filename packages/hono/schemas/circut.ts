import { z } from "zod";

export const createCircutForm = z.object({
  name: z.string().min(2, {
    message: "circut name must be at least 2 characters.",
  }),
  description: z.string(),
  privacy: z.enum(["PRIVATE", "PUBLIC"]),
});

export const circutUpdateInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  apiKey: z.string().optional(),
  privacy: z.string().optional(),
  description: z.string().optional().nullable(),
  systemInstructions: z.string().optional(),
  jsonMode: z.boolean().optional(),
  moderation: z.boolean().optional(),
  streamMode: z.boolean().optional(),
  storeMessages: z.boolean().optional(),
  config: z.any().optional(),
});
