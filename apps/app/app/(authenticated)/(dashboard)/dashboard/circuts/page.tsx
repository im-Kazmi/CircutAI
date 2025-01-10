"use client";

import { circutTableColumns } from "@/app/(authenticated)/components/circuts/columns";
import { CreateCircutButton } from "@/app/(authenticated)/components/circuts/create-circut-button";
import DashboardHeader from "@/app/(authenticated)/components/dashboard/dashboard-header";
import { DataTable } from "@repo/design-system/components/data-table";

const Page = () => {
  return (
    <div className="">
      <DashboardHeader title="Circuts">
        <CreateCircutButton />
      </DashboardHeader>
      <DataTable columns={circutTableColumns} data={[]} />
    </div>
  );
};

export default Page;
