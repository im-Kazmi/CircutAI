"use client";

import DashboardHeader from "@/app/(authenticated)/components/dashboard/dashboard-header";
import { memoryTableColumns } from "@/app/(authenticated)/components/memory/columns";
import { CreateMemoryButton } from "@/app/(authenticated)/components/memory/create-memory-button";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { DataTable } from "@repo/design-system/components/data-table";
import { useGetMemories } from "@repo/features/memory";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, isLoading, isPending } = useGetMemories();

  const router = useRouter();
  return (
    <div className="">
      <ShadowWrapper>
        <DashboardHeader title="Memory">
          <CreateMemoryButton />
        </DashboardHeader>
        <DataTable
          columns={memoryTableColumns}
          data={data?.data ?? []}
          isLoading={isLoading || isPending}
          onItemClick={(row) =>
            router.push(`/dashboard/memory/${row.original.id}`)
          }
        />
      </ShadowWrapper>
    </div>
  );
};

export default Page;
