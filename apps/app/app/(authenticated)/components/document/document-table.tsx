import { DataTable } from "@repo/design-system/components/data-table";
import { useGetDocuments } from "@repo/features/document";
import { documentTableColumns } from "./columns";

type Props = {
  memoryId: string;
};

export const DocumentsTable = ({ memoryId }: Props) => {
  const { data, isLoading } = useGetDocuments(memoryId);
  return (
    <DataTable
      isLoading={isLoading}
      data={data?.data || []}
      columns={documentTableColumns}
      columnStyles="h-10 "
      searchableColumnName="fileName"
    />
  );
};
