import type { Status, TransactionRow, TransactionType } from "@/types";

// Some random date
let currentDate = new Date(2025, 5, 1); // Start date: June 1, 2025

function randomDate() {
  // Add 1-7 days to the current date
  const daysToAdd = Math.floor(Math.random() * 7) + 1;
  currentDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  return currentDate.toISOString()
}

function now() {
  return new Date().toISOString()
}

const transactionDescriptions: Record<TransactionType, () => string> = {
  ADVANCE: () => "Loan Disbursement",
  PRINCIPAL: () => "Delivery Fee",
  FEE: () => ["Admin Fee", "Establishment Fee"][Math.floor(Math.random() * 2)],
  INTEREST: () =>
    `Interest posting for period ${randomDate().split("T")[0]} to ${randomDate().split("T")[0]}`,
  PAYMENT: () => "Bank payment received.",
  DEFAULT_INTEREST: () =>
    `Default Interest posting for period ${randomDate().split("T")[0]} to ${randomDate().split("T")[0]}`,
};

function randomAmount(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getDebitCredit(type: TransactionType,max: number): { debit: number | null; credit: number | null } {
  switch (type) {
    case "ADVANCE":
    case "PRINCIPAL":
    case "FEE":
    case "INTEREST":
    case "DEFAULT_INTEREST":
      return { debit: randomAmount(1, max/100), credit: null };
    case "PAYMENT":
      return { debit: null, credit: randomAmount(1, max/10) };
  }
}


export function generateMockTransaction(max: number = 1000000, isNow?: boolean): TransactionRow {
    const type: TransactionType = (
      ["ADVANCE", "PRINCIPAL", "FEE", "INTEREST", "PAYMENT", "DEFAULT_INTEREST"] as TransactionType[]
    )[Math.floor(Math.random() * 6)];

    const { debit, credit } = getDebitCredit(type,max);

    const row = {
      id: crypto.randomUUID(),
      transactionDate: isNow ? now() : randomDate(),
      valueDate: isNow ? now() : randomDate(),
      type,
      status: "CLEARED" as Status,
      description: transactionDescriptions[type](),
      debit,
      credit,
      closingBalance: 0, // to be calculated externally
    };
    return row;
}


export const generateMockTransactions = (count:number=Math.floor(Math.random() * 20) + 10)=>{
  const transactions: TransactionRow[] = [];
  const numberOfTransactions = count
  let startingBalance = 120000; // starting balance
  for (let i = 0; i < numberOfTransactions; i++) {
    let d = generateMockTransaction(startingBalance)
    d.closingBalance = startingBalance + (d.credit ?? 0) - (d.debit ?? 0);
    startingBalance = d.closingBalance;
    transactions.push(d);
  }
  return transactions;
}