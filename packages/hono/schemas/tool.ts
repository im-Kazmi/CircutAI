import { z } from "zod";

export const createToolForm = z.object({
  name: z.string().min(1, "Name is required"),
  config: z.record(z.any()).default({}),
});

export type CreateToolForm = z.infer<typeof createToolForm>;
