"use client";
import { Sidebar } from "./_components/sidebar";
import { HeaderActions } from "./_components/header-actions";
import { EnvSelector } from "./_components/env-selector";
import { PromptEditor } from "./_components/prompt-editor";
import { SettingsPanel } from "./_components/settings-panel";
import { Playground } from "./_components/playground";

import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { useGetCircut } from "@repo/features/circut";

type Props = {
  params: {
    id: string;
  };
};
const Page = ({ params }: Props) => {
  const { data, isLoading, isPending } = useGetCircut(params.id);

  return (
    <div className="flex min-h-screen">
      <ShadowWrapper>
        <div className="flex-1">
          <HeaderActions />
          <EnvSelector />
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-3 gap-8 p-8">
              <div className="col-span-2">
                <PromptEditor />
                <Playground />
              </div>
              <div className="col-span-1">
                <SettingsPanel />
              </div>
            </div>
          </div>
        </div>
      </ShadowWrapper>
    </div>
  );
};

export default Page;
