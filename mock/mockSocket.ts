import { generateMockTransaction, generateMockTransactions } from "@/lib/transactions-helper";
import { ColumnFiltersState } from "@tanstack/react-table";
import EventEmitter from 'eventemitter3'; // 👈
import { backendData } from "./data";

export default class MockSocket extends EventEmitter {
  loanId?: string;
  intervalId?: NodeJS.Timeout;
  filterTypes?: string[];
  filterStatus?: string[];
  static instances: number = 0;
  constructor() {
    super();
    MockSocket.instances++;
    console.log(`MockSocket instance created. Total instances: ${MockSocket.instances}`);
  }

  subscribe = (loanId: string,columnFilters?: ColumnFiltersState) => {
    if(!loanId){
      return
    }
    this.loanId = loanId;

    this.filterTypes = columnFilters? columnFilters.length > 0 ? columnFilters.filter(filter => filter.id=='type' ).map(filter => filter.value as string) : undefined : undefined;
    this.filterStatus = columnFilters? columnFilters.length > 0 ? columnFilters.filter(filter => filter.id=='status' ).map(filter => filter.value as string) : undefined : undefined;
    if(backendData.get(this.loanId! )=== undefined) {
      const d= generateMockTransactions(20);
      backendData.set(this.loanId!, {
        rows: d,
        closingBalance: d[d.length -1 ].closingBalance
      });

      for(const tx of d) {
        if(tx.status === 'PENDING') {
          setTimeout(() => {
            tx.status = 'CLEARED';
            console.log('MOCKSOCKET:emit: ',this.loanId);
            if(this.loanId === loanId) {
              this.emit('update', tx);
            }
          }, Math.random() * 8000 + 3000); // between 3s and 11s
        }
      }

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
          if(newTx.status === 'PENDING') {
            setTimeout(() => {
              newTx.status = 'CLEARED';
              if(this.loanId === key) {
                this.emit('update', newTx);
              }
            }, 7000);
          }

          if(this.loanId === key) {
            if(!this.filterTypes || this.filterTypes.includes(newTx.type)) {
              // console.log('MockSocket emitting new transaction for loanId:', this.loanId, newTx);
              this.emit('latestTx', newTx);
            }
            if(!this.filterStatus || this.filterStatus.includes(newTx.status)) {
              this.emit('latestTx', newTx);
            }
          }
      })
    },5000)
  
  }

}
