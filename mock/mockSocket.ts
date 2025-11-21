import type { TransactionRow } from "@/types";
import { generateMockTransaction } from "../lib/transactions-helper";
import { addMockDataTx } from "@/mock/data";

function mockWebSocket() {
  let interval: NodeJS.Timeout;
  let loanbalance = 1000000;
  let currentLoanId: string | undefined;
  let connected = false;

  return {
    connected,
    currentLoanId,
    connect() {
      connected = true;
      console.log("Mock WebSocket connected");
    },
    /**
     * A fake "send" method, that could represent sending a message to the server to say we're interested in a particular loanId
     */
    send(loanId: string) {
      currentLoanId = loanId;
      loanbalance = Number((Math.random() * 1000000).toFixed(2));
      if (interval) {
        clearInterval(interval);
      }
      interval = setInterval(() => {

        const response = addMockDataTx(loanId,true)

        loanbalance = response.closingBalance;

        this.onMessage && this.onMessage(response.rows)
      }, 2000);
    },

    onMessage: (message: TransactionRow[]) => {
      // Placeholder to be replaced by user
    },

    disconnect() {
      clearInterval(interval);
    },
  };
}

export const ws = mockWebSocket(); // <-- only created ONCE
