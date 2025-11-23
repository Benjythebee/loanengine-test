"use client";

import { type TransactionQueryData } from "@/hooks/useTransactionQuery";
import { TransactionsDataTable } from "./transactions.table.client";

interface TransactionsClientWrapperProps {
  loanId: string;
  initialData?: TransactionQueryData;
  pagination: { pageIndex: number; pageSize: number };
  error?: string;
}

export function TransactionsClientWrapper(props: TransactionsClientWrapperProps) {
  return <TransactionsDataTable {...props} />;
}