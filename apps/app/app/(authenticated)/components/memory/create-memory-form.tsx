"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/design-system/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/design-system/components/ui/form";
import { Input } from "@repo/design-system/components/ui/input";
import { Textarea } from "@repo/design-system/components/ui/textarea";
import { toast, useToast } from "@repo/design-system/components/ui/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import DashboardHeader from "../dashboard/dashboard-header";
import { useCreateCircut } from "@repo/features/circut";
import { TextureButton } from "@repo/design-system/components/ui/texture-button";
import { useRouter } from "next/navigation";
import { useCreateMemory } from "@repo/features/memory";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/design-system/components/ui/select";

type MemoryFormValues = z.infer<typeof createMemoryForm>;

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

export function CreateMemoryForm() {
  const mutation = useCreateMemory();
  const router = useRouter();

  const form = useForm<MemoryFormValues>({
    resolver: zodResolver(createMemoryForm),
    defaultValues: {
      name: "",
      description: "",
      embeddingModel: "OPENAI",
    },
  });

  function onSubmit(data: MemoryFormValues) {
    mutation.mutate(data, {
      onSuccess: (data, vars) => {
        toast({ title: "memory created successfully" });
        router.push(`/dashboard/memory/${data?.id}`);
      },
      onError: () => {
        toast({ title: "cannot create memory" });
      },
      onSettled: () => {},
    });
  }

  return (
    <div className=" mx-auto rounded-2xl ">
      <div className="p-8">
        <DashboardHeader title="Create a new Circut Agent">
          <TextureButton className="w-fit">Go back</TextureButton>
        </DashboardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-transparent"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memory Name</FormLabel>
                  <FormControl>
                    <Input placeholder="anything..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Circut Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g memory for chatWithPDF app."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="embeddingModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embedding Model</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an embedding model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ANTHROPIC">Anthropic</SelectItem>
                      <SelectItem value="OPENAI">OpenAI</SelectItem>
                      <SelectItem value="MISTRAL">Mistral</SelectItem>
                      <SelectItem value="TOGETHER">Together</SelectItem>
                      <SelectItem value="GROQ">Groq</SelectItem>
                      <SelectItem value="GOOGLE">Google</SelectItem>
                      <SelectItem value="COHERE">Cohere</SelectItem>
                      <SelectItem value="FIREWORKS">Fireworks</SelectItem>
                      <SelectItem value="PERPLEXITY">Perplexity</SelectItem>
                      <SelectItem value="DEEPSEEK">DeepSeek</SelectItem>
                      <SelectItem value="XAI">XAI</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TextureButton
              disabled={mutation.isPending}
              variant="secondary"
              type="submit"
              className="w-full"
            >
              Create Circut
            </TextureButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
