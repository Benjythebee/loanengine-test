"use client";
import { Button } from "@/components/primitives/button";
import { Skeleton } from "@/components/primitives/skeleton";
import { type TransactionRow } from "@/types";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";
import { AlertCircleIcon, LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight, SearchIcon } from "lucide-react";
import { useId, useMemo } from "react";
import { Input } from "../../../../../components/primitives/input";
import { Label } from "../../../../../components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/primitives/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/primitives/table";
import { AddTXDialog } from "./add-dialog/add-dialog";
import columns from "./columns";
import { RefreshButton } from "./refresh-button";

export interface TransactionsTableProps {
  data: TransactionRow[];
  totalRows?: number;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (updater: any) => void;
  sorting: SortingState;
  onSortingChange: (updater: any) => void;
  columnFilters: ColumnFiltersState;
  onColumnFiltersChange: (updater: any) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  error?: string;
  onRefresh?: () => void;
  refreshDisabled?: boolean;
  newElementsCount?: number;
  clientSideInteractions?: boolean;
}

function TransactionsTable({
  data = [],
  totalRows = 10,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  columnFilters,
  onColumnFiltersChange,
  isLoading = false,
  isFetching = false,
  error,
  onRefresh,
  refreshDisabled = false,
  newElementsCount = 0,
  clientSideInteractions = false,
}: TransactionsTableProps) {


  const table = useReactTable({
    data,
    columns,
    // pageCount: totalPages,
    rowCount:totalRows,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    manualPagination: true,
    autoResetPageIndex: false,
    manualFiltering: true,
    manualSorting: true,
    getRowId: (row) => row.id.toString(),
    onColumnFiltersChange: onColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: onSortingChange,
    onPaginationChange: onPaginationChange,
    enableSortingRemoval: false,
    ...(clientSideInteractions && {
      manualPagination: false,
      manualFiltering: false,
      manualSorting: false,
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel:getSortedRowModel(),
      getFilteredRowModel:getFilteredRowModel(),
    }),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex items-center pr-2">
          <div className="grow flex flex-wrap gap-3 px-2 py-6">
            {/* <div className="w-44">
              <Filter column={table.getColumn("transactionDate")!} />
            </div> */}
            <div className="w-36">
              <Filter column={table.getColumn("type")!} />
            </div>
            <div className="w-36">
              <Filter column={table.getColumn("status")!} />
            </div>
          </div>

          <div className="flex gap-4 md:gap-2 items-stretch md:items-center flex-col-reverse md:flex-row ">
            <RefreshButton 
              indicator={newElementsCount} 
              onClick={onRefresh || (() => {})} 
              disabled={refreshDisabled} 
              refreshing={isFetching} 
            />
            <AddTXDialog disabled={refreshDisabled}/>
          </div>
        </div>

        <div className="relative">
          {/* {isLoading && table.getRowModel().rows?.length === 0 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="animate-spin"><LucideLoader2 /></div>
            </div>
          )} */}
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
                <>
                  {table.getRowModel().rows.map((row) => (
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
                  ))}
                  {table.getRowModel().rows.length < pagination.pageSize && (
                    [...Array(pagination.pageSize - table.getRowModel().rows.length)].map((_, index) => (
                      <TableRow key={`empty-${index}`} className="h-10">
                        <TableCell colSpan={columns.length}>
                          {isFetching||isLoading ? (
                            <Skeleton className="h-6 w-full" />
                          ) : <>&nbsp;</>}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-red-500"
                  >
                    <div className="flex justify-center items-center">
                      <AlertCircleIcon className="mr-2" />
                      {String(error)}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.length < pagination.pageSize && (
                  [...Array(pagination.pageSize - table.getRowModel().rows.length)].map((_, index) => (
                    <TableRow key={`empty-${index}`} className="h-10 border-0">
                      <TableCell colSpan={columns.length}>
                        {isFetching||isLoading ? (
                            <Skeleton className="h-6 w-full" />
                          ) : <>&nbsp;</>}
                      </TableCell>
                    </TableRow>
                  ))
                )
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">                
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()<table.getState().pagination.pageIndex + 1 ? table.getState().pagination.pageIndex + 1: table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <LucideChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <LucideChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <LucideChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <LucideChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { TransactionsTable };

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();

  const { filterVariant, label } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string"
      ? column.columnDef.header
      : label ?? "";

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return [];

    if (column.columnDef.meta?.filterOptions) {
      return column.columnDef.meta.filterOptions;
    }

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
            className="flex-1 rounded-r-none [-moz-appearance:textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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
            className="-ms-px flex-1 rounded-l-none [-moz-appearance:textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
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