import { generateMockTransaction, generateMockTransactions } from "@/lib/transactions-helper";
import { EventEmitter } from "events";
import { backendData } from "./data";

export default class MockSocket extends EventEmitter {
  loanId?: string;
  intervalId?: NodeJS.Timeout;
  filterTypes?: string[];
  static instances: number = 0;
  constructor() {
    super();
    MockSocket.instances++;
    console.log(`MockSocket instance created. Total instances: ${MockSocket.instances}`);
  }

  subscribe = (loanId: string,filterTypes?: string[]) => {
    this.loanId = loanId;
    console.log('MockSocket subscribed to loanId:', this.loanId, 'with filters:', filterTypes);
    this.filterTypes = filterTypes? filterTypes.length > 0 ? filterTypes : undefined : undefined;
    if(backendData.get(this.loanId! )=== undefined) {
      const d= generateMockTransactions(20);
      backendData.set(this.loanId!, {
        rows: d,
        closingBalance: d[d.length -1 ].closingBalance
      });
    }
    this.loop();
  }

  unsubscribe = () => {
    this.loanId = undefined;
    this.filterTypes = undefined;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  loop = () => {
    if(this.intervalId) return
    this.intervalId = setInterval(()=>{
      backendData.forEach((value, key) => {
          // if(Math.random() > 0.7) return; // 30% chance no new transaction
          const newTx = generateMockTransaction(value.closingBalance,true);
          newTx.closingBalance = value.closingBalance + (newTx.credit || 0) - (newTx.debit || 0);
          value.rows.push(newTx);
          value.closingBalance = newTx.closingBalance;
          backendData.set(key, value);
          if(this.loanId === key) {
            if(!this.filterTypes || this.filterTypes.includes(newTx.type)) {
              // console.log('MockSocket emitting new transaction for loanId:', this.loanId, newTx);
              this.emit('message', newTx);
            }
          }
      })
    },1200)
  
  }
  
}
