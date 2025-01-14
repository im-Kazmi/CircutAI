"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  Row,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./pagination";
import { DataTableToolbar } from "./toolbar";
import { cn } from "@repo/design-system/lib/utils";
export * from "@tanstack/react-table";

export type DataTableProps<TData, TValue> = {
  isLoading?: boolean;
  columnStyles?: string;
  onItemClick?: (item: Row<TData>) => void;
  searchableColumnName?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterableColumns?: {
    id: keyof TData;
    title: string;
    options: { label: string; value: string }[];
  }[];
};

export function DataTable<TData, TValue>({
  isLoading = false,
  columns,
  data,
  searchableColumnName,
  filterableColumns = [],
  onItemClick,
  columnStyles,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        searchableColumnName={searchableColumnName}
        table={table}
        filterableColumns={filterableColumns}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody className="w-full">
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`${i}`} className="h-12 min-w-full">
                  <TableCell colSpan={4} className="h-6 text-center m-2">
                    <Skeleton className="w-full h-2 m-1" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn("h-32 cursor-pointer", columnStyles)}
                    onClick={() => onItemClick?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
