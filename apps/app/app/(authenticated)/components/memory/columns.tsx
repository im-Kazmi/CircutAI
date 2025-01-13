import { Memory } from "@prisma/client";
import { ColumnDef } from "@repo/design-system/components/data-table";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { DataTableColumnHeader } from "@repo/design-system/components/data-table/helpers";
import { MemoryActions } from "./table-actions";

type ColumnTypes = Pick<Memory, "name" | "id">;

export const memoryTableColumns: ColumnDef<ColumnTypes>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return <MemoryActions id={row.original.id} />;
    },
  },
];
