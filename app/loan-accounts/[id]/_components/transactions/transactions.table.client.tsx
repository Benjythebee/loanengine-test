"use client";
import { type TransactionQueryData, useTransactionsData } from "@/hooks/useTransactionQuery";
import { useQueryClient } from "@tanstack/react-query";
import { type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { useLiveUpdates } from "../../../../../hooks/useLiveUpdates";
import { TransactionsTable } from "./transactions.table";


function TransactionsDataTable({
  loanId,
  initialData,
  pagination: initialPagination,
  error: serverError,
}: {
  loanId: string;
  initialData?: TransactionQueryData;
  error?: string;
  pagination: { pageIndex: number; pageSize: number };
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
  const queryClient = useQueryClient();
  const {data, error: clientError, isLoading, isFetching, isPending, dataUpdatedAt} = useTransactionsData(loanId, initialData, pagination, columnFilters, sorting);

  const loading = isLoading || isPending;
  const error = clientError ? String(clientError) : serverError;

  const {newElements} = useLiveUpdates(loanId, columnFilters, dataUpdatedAt);
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
      onRefresh={()=>queryClient.invalidateQueries({queryKey:['transactions', loanId],refetchType:'all'})}
      refreshDisabled={loading}
      newElementsCount={newElements}
    />
  );
}
export { TransactionsDataTable };

