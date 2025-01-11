"use client";

import { circutTableColumns } from "@/app/(authenticated)/components/circuts/columns";
import { CreateCircutButton } from "@/app/(authenticated)/components/circuts/create-circut-button";
import DashboardHeader from "@/app/(authenticated)/components/dashboard/dashboard-header";
import { ShadowWrapper } from "@/app/(authenticated)/components/shadow-wrapper";
import { DataTable } from "@repo/design-system/components/data-table";
import { useGetCircuts } from "@repo/features/circut";

const Page = () => {
  const { data, isLoading } = useGetCircuts();

  console.log(data);
  return (
    <div className="">
      <ShadowWrapper>
        <DashboardHeader title="Circuts">
          <CreateCircutButton />
        </DashboardHeader>
        <DataTable
          columns={circutTableColumns}
          data={data?.data ?? []}
          isLoading={isLoading}
        />
      </ShadowWrapper>
    </div>
  );
};

export default Page;
