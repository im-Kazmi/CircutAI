"use client";

import { HeaderActions } from "./_components/header-actions";
import { EnvSelector } from "./_components/env-selector";
import { PromptEditor } from "./_components/prompt-editor";
import { SettingsPanel } from "./_components/settings-panel";
import { Playground } from "./_components/playground";

import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { useGetCircut, useUpdateCircut } from "@repo/features/circut";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { ModelConfigSheet } from "./_components/model-config-sheet";

type Props = {
  id: string;
};

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

export type CircutUpdateInput = z.infer<typeof circutUpdateInputSchema>;

export const ClientPage = ({ id }: Props) => {
  const { data, isLoading, isPending } = useGetCircut(id);
  const mutation = useUpdateCircut(id);

  const methods = useForm<CircutUpdateInput>({
    resolver: zodResolver(circutUpdateInputSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loader2 className="size-4 animate-spin m-auto" />;
  }

  if (!data) {
    return redirect("/circuts");
  }

  const { reset } = methods;

  return (
    <div className="flex min-h-screen">
      <ShadowWrapper>
        <FormProvider {...methods}>
          <ModelConfigSheet />
          <div className="flex-1">
            <HeaderActions circut={data} />
            <EnvSelector />
            <div className="container mx-auto max-w-7xl">
              <div className="grid grid-cols-3 gap-8 p-8">
                <div className="col-span-2">
                  <PromptEditor circut={data} />
                  <Playground circut={data} />
                </div>
                <div className="col-span-1">
                  <SettingsPanel circut={data} />
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </ShadowWrapper>
    </div>
  );
};
