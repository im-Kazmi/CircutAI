import { Circut } from "@prisma/client";
import { ColumnDef } from "@repo/design-system/components/data-table";
import { Checkbox } from "@repo/design-system/components/ui/checkbox";
import { DataTableColumnHeader } from "@repo/design-system/components/data-table/helpers";
import { CircutActions } from "./table-actions";
import { Badge } from "@repo/design-system/components/ui/badge";

export const circutTableColumns: ColumnDef<Circut>[] = [
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
    accessorKey: "privacy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="privacy" />
    ),
    cell: ({ row }) => {
      const privacyValue = row.original.privacy.toLowerCase();
      const variant: any = {
        private: "destructive",
        public: "secondary",
      };
      return <Badge variant={variant[privacyValue]}>{privacyValue}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      return <CircutActions id={row.original.id} />;
    },
  },
];
