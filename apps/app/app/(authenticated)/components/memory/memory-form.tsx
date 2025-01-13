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
import { createMemoryForm, FormValues } from "./create-memory-sheet";
import { Trash } from "lucide-react";

type Props = {
  id?: string;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  defaultValues?: FormValues;
  disabled: boolean;
};

export function MemoryForm({
  id,
  onSubmit,
  onDelete,
  defaultValues,
  disabled,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(createMemoryForm),
    defaultValues: defaultValues,
  });

  function handleDelete() {
    onDelete?.();
  }

  return (
    <div className="pt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 min-w-full "
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
                    // i would have created an array but let it go. // might
                    change it later
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
            disabled={disabled}
            variant="secondary"
            type="submit"
            className="w-full"
          >
            {id ? "Save changes" : "Create Circut"}
          </TextureButton>
          {!!id && (
            <TextureButton
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              variant={"destructive"}
            >
              <Trash className=" size-4 mr-2 " /> Delete Circut
            </TextureButton>
          )}
        </form>
      </Form>
    </div>
  );
}
