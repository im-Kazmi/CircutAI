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
import { ShadowWrapper } from "../shadow-wrapper";
import { FormPrivacyInput } from "./form-privacy-input";
import { useRouter } from "next/navigation";
export const createCircutForm = z.object({
  name: z.string().min(2, {
    message: "circut name must be at least 2 characters.",
  }),
  description: z.string(),
  privacy: z.enum(["PRIVATE", "PUBLIC"]),
});

type CircutFormValues = z.infer<typeof createCircutForm>;

export function CreateCircutForm() {
  const mutation = useCreateCircut();
  const router = useRouter();
  const form = useForm<CircutFormValues>({
    resolver: zodResolver(createCircutForm),
    defaultValues: {
      name: "",
      description: "",
      privacy: "PRIVATE",
    },
  });

  function onSubmit(data: CircutFormValues) {
    mutation.mutate(data, {
      onSuccess: (data, vars) => {
        toast({ title: "circut created successfully" });
        router.push(data.id);
      },
      onError: () => {
        toast({ title: "cannot create circut" });
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
                  <FormLabel>Circut/Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="my-chatbot" {...field} />
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
                      placeholder="this is circut/chatbot for my xyz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Privacy</FormLabel>
                  <FormPrivacyInput
                    type="PRIVATE"
                    onChange={field.onChange}
                    value={field.value}
                  />
                  <FormPrivacyInput
                    type="PUBLIC"
                    onChange={field.onChange}
                    value={field.value}
                  />
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
