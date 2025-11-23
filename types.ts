export const TRANSACTION_TYPES = ["ADVANCE", "PRINCIPAL", "FEE", "INTEREST", "PAYMENT", "DEFAULT_INTEREST"] as const;
export type TransactionType = typeof TRANSACTION_TYPES[number];

export const STATUS_TYPES = ["CLEARED", "PENDING", "FAILED"] as const;
export type Status = typeof STATUS_TYPES[number];

export interface TransactionRow {
  id: string;
  transactionDate: string;
  valueDate: string;
  type: TransactionType;
  status: Status;
  description: string;
  debit: number | null;
  credit: number | null;
  closingBalance: number;
}

export type TransactionQueryData={
  rows: TransactionRow[];
  closingBalance: number;
  totalPages: number;
  totalRows: number;
}

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        filterVariant?: 'range' | 'select' | 'text';
        label?: string;
        filterOptions?: string[];
    }
}