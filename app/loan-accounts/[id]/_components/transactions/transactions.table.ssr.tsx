import { sleep } from "@/lib/utils";
import { getMockData } from "@/mock/data";
import { TransactionsClientWrapper } from "./transactions.client-wrapper";

const getData = async (loanId:string, pagination:{page:number, size:number}) => {
    // Simulate network delay
    await sleep(1500);

    return getMockData(loanId, pagination,undefined,undefined);
}

export const TransactionTable = async ({loanId,searchParams}:{loanId:string, searchParams:{
        page?: string;
        size?: string;
        withFakeSSR?: string;
    }}) => {

    const pageIndex = searchParams.page ? parseInt(searchParams.page) : 0;
    const pageSize = searchParams.size ? parseInt(searchParams.size) : 10;
    const withFakeSSRData = typeof searchParams.withFakeSSR !== 'undefined';


    const data  = await getData(loanId, {
        page: pageIndex,
        size: pageSize
    });

    return <TransactionsClientWrapper
        loanId={loanId}
        initialData={withFakeSSRData?data:undefined} 
        pagination={{pageIndex, pageSize}}
            />
}