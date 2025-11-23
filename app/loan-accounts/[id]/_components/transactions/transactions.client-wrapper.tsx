"use client";

import { ComponentProps } from "react";
import { TransactionsDataTable } from "./transactions.table.client";


/**
 * Transaction Table Client Wrapper to force client-side rendering
 * attempts solve https://github.com/Benjythebee/loanengine-test/issues/1
 */
export function TransactionsClientWrapper(props: ComponentProps<typeof TransactionsDataTable>) {
  return <TransactionsDataTable {...props} />;
}