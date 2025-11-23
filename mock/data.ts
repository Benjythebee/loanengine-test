import { TransactionQueryData } from "@/hooks/useTransactionQuery";
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

const getAllMockDataMetadata = () => {
    return Array.from(backendData.entries()).map(([loanId, data]) => ({loanId, closingBalance: data.closingBalance, totalTransactions: data.rows.length}));
}

const getMockDataMetadata = (loanId:string) => {
    const data = backendData.get(loanId);
    if(!data){
        return {loanId, 
            'Principal Balance': 0,
            'Principal NIP Balance': 0,
            'Interest Balance': 0,
            'Fee Balance': 0,
            'Fee NIB Balance': 0,
            'Closing Balance': 0,
            'Principal IB Paid': 0,
            'Principal NIB Paid': 0,
            'Interest Paid': 0,
            'Fees Paid': 0,
            'Fees NIB Paid': 0,
            'Total Paid': 0,
        };
    }
    return {
        loanId, 
        'Total Transactions': data.rows.length,
        'Principal Balance': data.closingBalance,
        'Principal NIP Balance': 0,
        'Interest Balance': 0,
        'Fee Balance': 0,
        'Fee NIB Balance': 0,
        'Closing Balance': data.closingBalance,
        'Principal IB Paid': Math.random() * data.closingBalance *0.1,
        'Principal NIB Paid': Math.random() * data.closingBalance *0.02,
        'Interest Paid': Math.random() * data.closingBalance *0.5,
        'Fees Paid': Math.random() * data.closingBalance *0.3,
        'Fees NIB Paid': Math.random() * data.closingBalance *0.01,
        'Total Paid': Math.random() * data.closingBalance *0.05,
    };
}

const getMockData = (loanId:string,pagination:{page: number,size:number},columnFilters?:{id: string, value: unknown}[],sorting?:{
    desc: boolean;
    id: string;
}[]) => {
    const data = backendData.get(loanId);
    console.log(data?.rows.length)
    let transactions =data?.rows || [];

    /**
     * If no data exists for the loanId, generate some mock data
     * data?.rows.length === 0 is just for adding mock data when all transactions are non existent
     */
    if(transactions.length === 0){
        transactions = generateMockTransactions(Math.random() * 50+10)
        backendData.set(loanId, {
            rows: transactions,
            closingBalance: transactions.length > 0 ? transactions[transactions.length-1].closingBalance : 0
        });
    }
    const closingBalance = transactions.length > 0 ? transactions[transactions.length -1].closingBalance : 0;

    // Apply column filters
    if(columnFilters && columnFilters.length > 0){
        columnFilters.forEach((filter) => {
            transactions = transactions.filter((tx) => {
                const txValue = (tx as any)[filter.id];
                return txValue === filter.value;
            });
        });
    }

    if(sorting && sorting.length > 0){
        sorting.forEach((sort) => {
            transactions = transactions.sort((a,b) => {
                const aValue = sort.id ==='transactionDate'? new Date((a as any)[sort.id]).getTime() : (a as any)[sort.id];
                const bValue = sort.id ==='transactionDate'? new Date((b as any)[sort.id]).getTime() : (b as any)[sort.id];
                if(aValue < bValue) return sort.desc ? 1 : -1;
                if(aValue > bValue) return sort.desc ? -1 : 1;
                return 0;
            });
        });
    }

    // Apply pagination
    let response: TransactionQueryData = {
        rows: transactions.slice(pagination.page * pagination.size, (pagination.page + 1) * pagination.size),
        totalPages: Math.ceil(transactions.length / pagination.size)-1,
        closingBalance: closingBalance,
    }

    return response
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

export { addMockDataTx, backendData, deleteMockDataTx, getAllMockDataMetadata, getMockData, getMockDataMetadata, getMockTotalPages };

