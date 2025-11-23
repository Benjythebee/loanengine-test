"use client";

import { type TransactionQueryData } from "@/hooks/useTransactionQuery";
import { TransactionsDataTable } from "./transactions.table.client";

interface TransactionsClientWrapperProps {
  loanId: string;
  initialData?: TransactionQueryData;
  pagination: { pageIndex: number; pageSize: number };
  error?: string;
}
/**
 * Transaction Table Client Wrapper to force client-side rendering
 * attempts solve https://github.com/Benjythebee/loanengine-test/issues/1
 */
export function TransactionsClientWrapper(props: TransactionsClientWrapperProps) {
  return <TransactionsDataTable {...props} />;
}