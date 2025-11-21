"use client";
import {
  type ColumnFiltersState,
  type SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  flexRender,
  type Column,
  type RowData,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { AlertCircleIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useId, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/primitives/table";
import { Label } from "../../../../../components/primitives/label";
import { Input } from "../../../../../components/primitives/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/primitives/select";

import { type ColumnDef } from "@tanstack/react-table";
import { RowPerPage } from "../../../../../components/ui/table/row.per.page";
import { Alert, AlertDescription, AlertTitle } from "../../../../../components/primitives/alert";
import { type TransactionQueryData, useLiveTransactions } from "@/hooks/useTransactionQuery";
import { TransactionRow } from "@/types";

function TransactionsDataTable({
  loanId,
  columns,
  data,
  totalPages,
  pagination: initialPagination,
  error,
}: {
  loanId: string;
  columns: ColumnDef<TransactionRow>[];
  data: TransactionQueryData;
  error?: string;
  totalPages: number;
  pagination: { pageIndex: number; pageSize: number };
}) {
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>(initialPagination);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const {data:txData,isLoading,isFetching,isPending} = useLiveTransactions(data,loanId,pagination);

  const loading = isLoading || isPending || isFetching;


  const table = useReactTable({
    data:txData?.rows||[],
    columns,
    pageCount: totalPages || 0,
    state: {
      sorting: [{
        id: 'transactionDate',
        desc: true
      }],
      columnFilters,
      pagination,
    },
    manualPagination: true,
    autoResetPageIndex: false,
    getRowId: (row) => row.id.toString(),
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableSortingRemoval: false,
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex flex-wrap gap-3 px-2 py-6">
          <div className="w-44">
            <Filter column={table.getColumn("transactionDate")!} />
          </div>
          <div className="w-36">
            <Filter column={table.getColumn("type")!} />
          </div>
          <div className="w-36">
            <Filter column={table.getColumn("status")!} />
          </div>
        {error && (
        <Alert variant="destructive" borderless className="m-2">
          <AlertCircleIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            <p>{error ? error : "Could not retrieve the data, try again."}</p>
          </AlertDescription>
        </Alert>
      )}
        </div>
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
              <span className="loading animate-spin text-primary">
                <LucideLoader2 />
              </span>
            </div>
          )}
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-muted/50">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="relative h-10 border-t select-none"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="relative">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  ></TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <RowPerPage
            table={table}
            key={table.getState().pagination.pageIndex + totalPages}
          />
        </div>
      </div>
    </div>
  );
}
export { TransactionsDataTable };

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  //@ts-expect-error dw w
  const { filterVariant, label } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : label ?? "";

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return [];

    const values = Array.from(column.getFacetedUniqueValues().keys());

    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr];
      }

      return [...acc, curr];
    }, []);

    return Array.from(new Set(flattenedValues)).sort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column.getFacetedUniqueValues(), filterVariant]);

  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-range-1`}>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-r-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-l-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === "select") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer pl-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}
