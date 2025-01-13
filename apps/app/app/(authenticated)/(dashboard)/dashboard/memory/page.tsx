"use client";

import { circutTableColumns } from "@/app/(authenticated)/components/circuts/columns";
import DashboardHeader from "@/app/(authenticated)/components/dashboard/dashboard-header";
import { CreateMemoryButton } from "@/app/(authenticated)/components/memory/create-memory-button";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { DataTable } from "@repo/design-system/components/data-table";
import { useGetMemories } from "@repo/features/memory";
import { Brain } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, isLoading, isPending } = useGetMemories();

  return (
    <div className="">
      <ShadowWrapper>
        <DashboardHeader title="Memory">
          <CreateMemoryButton />
        </DashboardHeader>
        {data?.data.map((memory) => {
          return (
            <div className="w-full cursor-pointer h-32 rounded-lg bg-muted p-2 flex items-center">
              <div className="flex flex-col gap-y-3">
                <Brain className=" text-neutral-700" />
                <h1>{memory.name}</h1>
              </div>
            </div>
          );
        })}
      </ShadowWrapper>
    </div>
  );
};

export default Page;
