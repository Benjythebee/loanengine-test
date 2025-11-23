'use client'
import { sleep } from "@/lib/utils";
import { getMockData, getMockDataMetadata } from "@/mock/data";
import { TransactionRow } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export type TransactionQueryData = {
  rows: TransactionRow[];
  closingBalance: number;
  totalPages: number;
}

export function useTransactionsData(loanId: string,initalData?: TransactionQueryData,  pagination:{pageIndex:number;pageSize:number}={pageIndex:0,pageSize:10},columnFilters:ColumnFiltersState=[],sorting:SortingState=[]) {

  // Base query: initial state
  const query = useQuery({
    queryKey: ['transactions',
      loanId, 
      pagination.pageIndex,
      pagination.pageSize,
      ...columnFilters.map((filter) => `${filter.id}-${filter.value}`),
      ...sorting.map((sort) => `${sort.id}-${sort.desc}`)
    ],
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
    queryFn: async () => {
      // Simulate network delay
      await sleep(3000); 

      const requestedDate = getMockData(loanId, {
        page: pagination.pageIndex,
        size: pagination.pageSize,
      },
      columnFilters,
      sorting
    );
      return {rows: requestedDate.rows, closingBalance: requestedDate.closingBalance, totalPages: requestedDate.totalPages};
    }, // initial placeholder
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