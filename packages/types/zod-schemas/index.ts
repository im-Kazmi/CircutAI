import z from "zod";

export const createMemoryForm = z.object({
  name: z.string().min(2, {
    message: "memory name must be at least 2 characters.",
  }),
  description: z.string(),
  embeddingModel: z.enum([
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
});
