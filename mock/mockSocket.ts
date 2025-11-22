"use client"
import { addMockDataTx, getMockTotalPages } from "@/mock/data";
import type { TransactionRow } from "@/types";

export function mockWebSocket() {
  let interval: NodeJS.Timeout;
  let loanbalance = 1000000;
  let currentLoanId: string | undefined;
  let connected = false;

  let pageIndex: number = 0;
  let pageSize: number = 10;

  return {
    pageSettings:{pageIndex, pageSize},
    connected,
    currentLoanId,
    loanbalance,
    onopen: () => {
      connected = true;
      console.log("Mock WebSocket connected");
    },
    onclose: () => {
      connected = false;
      console.log("Mock WebSocket disconnected");
    },

    setPageSettings({pageIndex, pageSize}: {pageIndex: number, pageSize: number}) {
      this.pageSettings = {pageIndex, pageSize};
    },
    /**
     * A fake "send" method, that could represent sending a message to the server to say we're interested in a particular loanId
     */
    send(loanId: string) {
      this.currentLoanId = loanId;
      this.loanbalance = Number((Math.random() * 1000000).toFixed(2));
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {

        const response = addMockDataTx(loanId,true)

        this.loanbalance = response.closingBalance;
        const totalPages = getMockTotalPages(this.currentLoanId!, this.pageSettings);

        this.onmessage && this.onmessage({rows:response.rows,closingBalance: response.closingBalance, totalPages})
      }, 1000);
    },

    onmessage: (message: {rows: TransactionRow[], closingBalance: number, totalPages: number}) => {
      // Placeholder to be replaced by user
    },

    disconnect() {
      clearInterval(interval);
      this.connected = false;
      this.currentLoanId = undefined;
      this.loanbalance = 1000000;
    },
  };
}

export const ws = mockWebSocket(); // <-- only created ONCE
