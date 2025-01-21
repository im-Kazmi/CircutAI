"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@repo/design-system/components/ui/sheet";
import { z } from "zod";
import { useCreateMemorySheet } from "@/app/store/use-create-memory-sheet";
import { useCreateMemory } from "@repo/features/memory";
import { useRouter } from "next/navigation";
import { Protect, useAuth } from "@repo/auth/client";
import { useModelKeySheet } from "@/app/store/use-model-key-sheet";
import { Keysets } from "./keysets";
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

export type FormValues = z.infer<typeof createMemoryForm>;

export const ModelsKeySheet = () => {
  const { isOpen, onClose } = useModelKeySheet();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[500px]">
        <Keysets />
      </SheetContent>
    </Sheet>
  );
};
