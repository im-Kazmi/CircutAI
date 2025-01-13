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
import { MemoryForm } from "./memory-form";
import { useRouter } from "next/navigation";
import { NoPermissionsWrapper } from "../no-permission-wrapper";
import { Protect, useAuth } from "@repo/auth/client";
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

const CreateMemorySheet = () => {
  const { isOpen, onClose } = useCreateMemorySheet();
  const { has } = useAuth();
  const mutation = useCreateMemory();
  const router = useRouter();

  function onSubmit(data: FormValues) {
    mutation.mutate(data, {
      onSuccess: (data, vars) => {
        router.push(`/dashboard/memory/${data?.id}`);
      },
      onError: () => {},
      onSettled: () => {},
    });
  }

  if (!has) return null;

  const havePermissions =
    has({ role: "org:admin" }) || has({ role: "org:member" });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Create Memory</SheetTitle>
          <SheetDescription>
            Create a new memory to attach to a circut
          </SheetDescription>
        </SheetHeader>
        <NoPermissionsWrapper havePermissions={havePermissions}>
          <MemoryForm
            onSubmit={onSubmit}
            defaultValues={{
              name: "",
              description: "",
              embeddingModel: "OPENAI",
            }}
            disabled={mutation.isPending}
            id="asdfsadf"
          />
        </NoPermissionsWrapper>
      </SheetContent>
    </Sheet>
  );
};

export default CreateMemorySheet;
