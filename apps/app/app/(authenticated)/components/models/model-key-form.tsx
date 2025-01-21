"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@repo/design-system/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/design-system/components/ui/form";
import { Input } from "@repo/design-system/components/ui/input";
import { Trash } from "lucide-react";

const formSchema = z.object({
  key: z.string().min(10, {
    message: "key must be at least 10 characters.",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  defaultValues?: FormValues;
  disabled: boolean;
};

export function ModelKeyForm({
  id,
  onSubmit,
  onDelete,
  defaultValues,
  disabled,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  function handleDelete() {
    onDelete?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input placeholder="pc23*************************" {...field} />
              </FormControl>
              <FormDescription>Keys will be encrypted.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-2">
          <Button
            disabled={disabled}
            type="submit"
            className="w-full"
            variant={"circut"}
          >
            {id ? "Save changes" : "Create Key"}
          </Button>
          {!!id && (
            <Button
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              variant={"destructive"}
            >
              <Trash className=" size-4 mr-2 " />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
