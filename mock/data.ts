import { generateMockTransaction, generateMockTransactions } from "@/lib/transactions-helper";
import { TransactionRow } from "@/types";
import { v7 as uuidv7 } from 'uuid';


/**
 * Fake backend data store
 */
const backendData = new Map<string,{
    closingBalance: number,
    rows:TransactionRow[]
    }>();

let data1 = generateMockTransactions(20)
let data2 = generateMockTransactions(32)

backendData.set(uuidv7(),{closingBalance: data1.length > 0 ? data1[data1.length-1].closingBalance : 0, rows: data1}); // Cache 100 items per loanId
backendData.set(uuidv7(),{closingBalance: data2.length > 0 ? data2[data2.length-1].closingBalance : 0, rows: data2}); // Cache 100 items per loanId

const getMockDataMetadata = () => {
    return Array.from(backendData.entries()).map(([loanId, data]) => ({loanId, closingBalance: data.closingBalance, totalTransactions: data.rows.length}));
}

const getMockData = (loanId:string,pagination:{page: number,size:number}) => {
    const data = backendData.get(loanId);

    if(!data){
        const c= generateMockTransactions(Math.random() * 50+10)
        backendData.set(loanId,{closingBalance: c.length > 0 ? c[c.length-1].closingBalance : 0, rows: c});
        const pages = Math.floor(c.length / pagination.size);
        return {
            rows: c.slice(pagination.page * pagination.size, (pagination.page + 1) * pagination.size),
            totalPages: pages,
            closingBalance: c.length > 0 ? c[c.length -1].closingBalance : 0,
        }
    }

    const dataRows = data.rows.slice(pagination.page * pagination.size, (pagination.page + 1) * pagination.size);
    const totalPages = Math.floor(data.rows.length / pagination.size);

    return {
        rows: dataRows,
        totalPages,
        closingBalance: data.closingBalance,
    }
}

const getMockTotalPages = (id:string,pagination:{pageIndex: number,pageSize:number}) => {
    const data = backendData.get(id);
    if(!data){
        return 0;
    }
    return Math.floor(data.rows.length / pagination.pageSize);
}

const addMockDataTx = (loanId:string,isNow:boolean = false) => {
    const data = backendData.get(loanId);
    if(!data){
        let data = generateMockTransactions(1)
        const tx = {closingBalance: data.length > 0 ? data[data.length-1].closingBalance : 0, rows: data}
        backendData.set(loanId,tx);
        return tx
    }

    let newTx = generateMockTransaction(data.closingBalance,isNow);
    newTx.closingBalance = data.closingBalance + (newTx.credit || 0) - (newTx.debit || 0);
    data.rows.push(newTx);
    data.closingBalance = newTx.closingBalance;
    backendData.set(loanId,data);

    return {
        closingBalance: data.closingBalance,
        rows: [newTx]
    };
}

const deleteMockDataTx = (loanId:string) => {
    const data = backendData.get(loanId);
    if(!data || data.rows.length === 0){
        return backendData.get(loanId);
    }
    const removedTx = data.rows.shift()!;
    data.closingBalance = data.rows.length > 0 ? data.rows[data.rows.length -1].closingBalance : 0;
    backendData.set(loanId,data);
    return {data, removedTx};
}

export { addMockDataTx, backendData, deleteMockDataTx, getMockData, getMockDataMetadata, getMockTotalPages };

