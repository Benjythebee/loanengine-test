"use client";
import { type TransactionQueryData, useTransactionsData } from "@/hooks/useTransactionQuery";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useLiveUpdates } from "../../../../../hooks/useLiveUpdates";
import { TransactionsTable } from "./transactions.table";


const TransactionsDataTable=({
  loanId,
  initialData,
  pagination: initialPagination,
  error: serverError,
}: {
  /**
   * Loan ID for which to display transactions
   */
  loanId: string;
  /**
   * Initial data for server-side rendering (optional)
   */
  initialData?: TransactionQueryData;
  /**
   * Error message from server-side rendering (optional)
   */
  error?: string;
  /**
   * Initial pagination settings (from searchParams or similar)
   */
  pagination: { pageIndex: number; pageSize: number };
}) =>{
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

  const key = useMemo(() => [ 'transactions',loanId, 
      pagination.pageIndex,
      pagination.pageSize,
      ...columnFilters.map((filter) => `${filter.id}-${filter.value}`),
      ...sorting.map((sort) => `${sort.id}-${sort.desc}`)],[loanId, pagination, columnFilters, sorting]);

  const {data, error: clientError, isLoading, isFetching, isPending} = useTransactionsData(loanId, initialData, key,pagination, columnFilters, sorting);

  const loading = isLoading || isPending;
  const error = clientError ? String(clientError) : serverError;

  const {newElements, refresh} = useLiveUpdates(loanId,columnFilters,key);
  
  return (
      <TransactionsTable
        data={data?.rows || []}
        totalRows={data?.totalRows || 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        isLoading={loading}
        isFetching={isFetching}
        error={error}
        onRefresh={refresh}
        refreshDisabled={loading}
        newElementsCount={newElements}
      />
  );
}
export { TransactionsDataTable };

