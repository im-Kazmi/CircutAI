"use client";

import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { useGetMemory } from "@repo/features/memory";
import { HeaderActions } from "./_components/header-actions";
import { useUrlState } from "@/app/hooks/use-url-state";
import { MemoryTestingPage } from "@/app/(authenticated)/components/memory/memory-testing-page";
import { MemorySettingsPage } from "@/app/(authenticated)/components/memory/memory-setttings-page";
import { MemoryPage } from "@/app/(authenticated)/components/memory/memory-page";

type Props = {
  id: string;
};

export const ClientPage = ({ id }: Props) => {
  const { data, isLoading, isPending } = useGetMemory(id);
  const [view] = useUrlState("view", {});

  return (
    <div className="flex min-h-screen w-full ">
      <ShadowWrapper>
        <HeaderActions />
        {(view === "memory" || !view) && <MemoryPage memoryId={id} />}
        {view === "testing" && <MemoryTestingPage />}
        {view === "settings" && <MemorySettingsPage />}
      </ShadowWrapper>
    </div>
  );
};
