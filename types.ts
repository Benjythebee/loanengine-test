export type TransactionType =
  | "ADVANCE"
  | "PRINCIPAL"
  | "FEE"
  | "INTEREST"
  | "PAYMENT"
  | "DEFAULT_INTEREST";

export type Status = "CLEARED" | "PENDING";

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