"use client";

import { circutTableColumns } from "@/app/(authenticated)/components/circuts/columns";
import { CreateCircutButton } from "@/app/(authenticated)/components/circuts/create-circut-button";
import DashboardHeader from "@/app/(authenticated)/components/dashboard/dashboard-header";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { DataTable } from "@repo/design-system/components/data-table";
import { useGetCircuts } from "@repo/features/circut";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data, isLoading, isPending } = useGetCircuts();

  const router = useRouter();
  return (
    <div className="">
      <ShadowWrapper>
        <DashboardHeader title="Circuts">
          <CreateCircutButton />
        </DashboardHeader>
        <DataTable
          columns={circutTableColumns}
          data={data?.data ?? []}
          isLoading={isLoading || isPending}
          onItemClick={(row) =>
            router.push(`/dashboard/circuts/${row.original.id}`)
          }
        />
      </ShadowWrapper>
    </div>
  );
};

export default Page;
