import { TransactionsDataTable } from "@/app/loan-accounts/[id]/_components/transactions/transactions.table.client";
import { sleep } from "@/lib/utils";
import { getMockData } from "@/mock/data";

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
        initialData={undefined} 
        totalPages={data?.totalPages || 0}
        pagination={{pageIndex, pageSize}}
            />
}