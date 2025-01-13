import { Document as PrismaDoc, Memory } from "@prisma/client";
import { ColumnDef } from "@repo/design-system/components/data-table";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { DataTableColumnHeader } from "@repo/design-system/components/data-table/helpers";

type ColumnTypes = Omit<PrismaDoc, "uploadDate"> & {};

export const documentTableColumns: ColumnDef<ColumnTypes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="filename" />
    ),
  },
  {
    accessorKey: "fileType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="fileType" />
    ),
  },
  {
    accessorKey: "fileSize",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="fileSize" />
    ),
  },
  {
    accessorKey: "processingStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="processingStatus" />
    ),
  },
  // {
  //   accessorKey: "actions",
  //   cell: ({ row }) => {
  //     return <DocumentActions id={row.original.id} />;
  //   },
  // },
];
