"use client";
import {
  type Column,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { AlertCircleIcon, LucideRefreshCcw, SearchIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
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


import { Button } from "@/components/primitives/button";
import { RowPerPage } from "@/components/ui/table/footer/row.per.page";
import { type TransactionQueryData, useLiveTransactions } from "@/hooks/useTransactionQuery";
import columns from "./columns";

function TransactionsDataTable({
  loanId,
  initialData,
  totalPages,
  pagination: initialPagination,
  error: serverError,
  enableLiveDataOnMount = true,
}: {
  loanId: string;
  initialData?: TransactionQueryData;
  error?: string;
  totalPages: number;
  pagination: { pageIndex: number; pageSize: number };
  enableLiveDataOnMount?: boolean;
}) {
  const [pagination, setPagination] = useState<{
    pageIndex: number;
    pageSize: number;
  }>(initialPagination);
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([
    {
      id: "transactionDate",
      desc: true
    }
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [rowSelection, setRowSelection] = useState({});
  const [liveDataEnabled, setLiveDataEnabled] = useState(enableLiveDataOnMount);

  const {data:txData,error:clientError,isLoading,isFetching,isPending, refetch,isConnected} = useLiveTransactions(loanId,initialData,pagination,liveDataEnabled);

  const loading = isLoading || isPending || isFetching;

  const error = clientError || serverError;

  // useEffect(() => {
  //   if(rowSelection && Object.keys(rowSelection).length > 0){
  //     console.log("Selected rows:", rowSelection);
  //   }
  // }, [rowSelection]);

  const table = useReactTable({
    data:txData?.rows||[],
    columns,
    pageCount: txData.totalPages,
    state: {
      sorting: sorting,
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
    onSortingChange: setSorting,
    onPaginationChange: (updater) => {
      setPagination(updater);
      refetch();
    },
    // onRowSelectionChange: (updater) => {
    //   setRowSelection(updater);      
    // },
    // enableRowSelection: true,
    enableSortingRemoval: false,
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex items-center pr-2">
            <div className="grow flex flex-wrap gap-3 px-2 py-6">
            <div className="w-44">
              <Filter column={table.getColumn("transactionDate")!} />
            </div>
            <div className="w-36">
              <Filter column={table.getColumn("type")!} />
            </div>
            <div className="w-36">
              <Filter column={table.getColumn("status")!} />
            </div>
          </div>

          <div>
            <Button variant={'orange'} size="sm" onClick={()=>refetch()} disabled={loading}>
             <LucideRefreshCcw /> Refresh
            </Button>
            {/* <LiveDataButton liveDataEnabled={liveDataEnabled} isConnected={isConnected} onClick={() => setLiveDataEnabled(!liveDataEnabled)} /> */}
          </div>

        </div>
       
      <div className="relative">
        {loading && !table.getRowModel().rows.length && (
          <div className="absolute inset-0 z-10 bg-white/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
                  { table.getRowModel().rows.length < pagination.pageSize && (
                    [...Array(pagination.pageSize - table.getRowModel().rows.length)].map((_, index) => (
                      <TableRow key={`empty-${index}`} className="h-10">
                        <TableCell colSpan={columns.length}>&nbsp;</TableCell>
                      </TableRow>
                    ))
                  )
                }</>
              ) :error ?(
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
              ) : !loading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              ):(
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <RowPerPage
            table={table}
            // totalpages={totalPages}
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
