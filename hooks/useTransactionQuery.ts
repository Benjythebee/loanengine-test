import { sleep } from "@/lib/utils";
import { getMockData, getMockDataMetadata } from "@/mock/data";
import { TransactionQueryData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

export function useTransactionsData(loanId: string,initalData?: TransactionQueryData, key:(number|string)[]=['transactions'],pagination:{pageIndex:number;pageSize:number}={pageIndex:0,pageSize:10},columnFilters:ColumnFiltersState=[],sorting:SortingState=[]) {

  const searchParams = useSearchParams();
  const delay = isNaN(Number(searchParams.get('delay')))?  '1000' : searchParams.get('delay') || '1000';
  const testError = searchParams.get('testError');
  // Base query: initial state
  // console.log("using key:",key)
  const query = useQuery({
    queryKey: key,
    refetchOnMount: false,
    placeholderData: (prev, query) => {
      const q =query as any;
      if(!prev){
        return undefined;
      }
      if(!query){
        return undefined;
      }
      // Keep previous data unless page index changed
      const prevPageIndex = q.state.data ? q.queryKey[2] : null;
      const currentPageIndex = pagination.pageIndex;

      if (prevPageIndex !== null && prevPageIndex !== currentPageIndex) {
        return undefined; // Allow fresh fetch for page changes
      }
      
      return prev; // Keep previous data for filters/sorting changes
    },
    refetchOnWindowFocus: false,
    retry: 1,
    queryFn: async () => {
      // Simulate network delay
      await sleep(Number(delay)); 

      if(testError){
        throw new Error('Simulated network error for testing purposes.');
      }
      
      const requestedDate = getMockData(loanId, {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      },
      columnFilters,
      sorting
    );
      return {rows: requestedDate.rows, closingBalance: requestedDate.closingBalance, totalPages: requestedDate.totalPages,totalRows: requestedDate.totalRows};
    },
     // initial placeholder
    // initialData: {
    //   rows: initalData?.rows || [],
    //   closingBalance: initalData?.closingBalance || 0,
    //   totalPages: initalData?.totalPages || 0,
    // } 
    
  });
  

  return query
}


export function useLoanBasicInformation(loanId: string) {

  const query = useQuery({
    queryKey: ['loanmetadata', loanId],
    refetchOnMount:true,
    refetchInterval:1500,
    refetchOnWindowFocus:true,
    queryFn:()=>{
      return getMockDataMetadata(loanId);
    }
  })

  return query;
}