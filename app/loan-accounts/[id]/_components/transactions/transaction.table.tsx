import columns from "@/app/loan-accounts/[id]/_components/transactions/columns"
import { TransactionsDataTable } from "@/app/loan-accounts/[id]/_components/transactions/transaction.dynamic.table"
import { sleep } from "@/lib/utils"
import { backendData, getMockData } from "@/mock/data";

const getData = async (loanId:string, pagination:{page:number, size:number}, sorting:any) => {
    // Simulate network delay
    await sleep(3000);

    return getMockData(loanId, pagination);
}

export const TransactionTable = async ({loanId,searchParams}:{loanId:string, searchParams:{
    page?: string;
    size?: string;
    sort?: string;
}}) => {

    const pageIndex = searchParams.page ? parseInt(searchParams.page) - 1 : 0;
    const pageSize = searchParams.size ? parseInt(searchParams.size) : 10;

    const data  = await getData(loanId, {
        page: pageIndex,
        size: pageSize
    }, {});

    return <TransactionsDataTable
        loanId={loanId}
        columns={columns} 
        data={data} 
        totalPages={data?.totalPages || 0}
        pagination={{pageIndex, pageSize}}
            />
}