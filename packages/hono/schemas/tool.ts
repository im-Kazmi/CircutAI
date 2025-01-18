import { z } from "zod";

export const createToolForm = z.object({
  name: z.string().min(1, "Name is required"),
  config: z.record(z.unknown()).default({}),
  circutId: z.string().min(1, "Circut ID is required"),
});

export type CreateToolForm = z.infer<typeof createToolForm>;
