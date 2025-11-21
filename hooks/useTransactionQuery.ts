'use client'
import { ws } from "@/mock/mockSocket";
import { TransactionRow } from "@/types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { sleep } from "@/lib/utils";
import {  getMockData } from "@/mock/data";

export type TransactionQueryData = {
  rows: TransactionRow[];
  closingBalance: number;
  totalPages: number;
}

export function useLiveTransactions(initalData: TransactionQueryData, loanId: string, pagination:{pageIndex:number;pageSize:number}={pageIndex:0,pageSize:10}) {
  const queryClient = useQueryClient();

  const tempData = useRef<TransactionRow[]>([]);
  // Base query: initial state
  const query = useQuery({
    queryKey: ['transactions',loanId],
    refetchOnMount: false,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      await sleep(3000); 

      const requestedDate = getMockData(loanId, {
        page: pagination.pageIndex,
        size: pagination.pageSize
      });
      return {rows: requestedDate.rows, closingBalance: requestedDate.closingBalance, totalPages: requestedDate.totalPages};
    }, // initial placeholder
    initialData: initalData || {
      rows: [],
      closingBalance: 0,
      totalPages: 0
    } as TransactionQueryData,
  });

  useEffect(() => {
    if(loanId){
        ws.send(loanId);
    }
  }, [loanId]);

  useEffect(() => {
    if (query.isFetching) return
    // Wait for initial data to be loaded
    if(!ws.connected){
      ws.connect();
    }

    // Send loanId to subscribe
    if (loanId && ws.currentLoanId !== loanId) {
      ws.send(loanId);
    }

    // Handle incoming messages
    const handleMessage = (message: TransactionRow[]) => {
      
      if(pagination.pageIndex >0){
            // If not on first page, do not update rows and save to tempData ( better UX when navigating around)
            tempData.current = [...tempData.current,...message];
            return 
      }
      
      queryClient.setQueryData(['transactions', loanId], (oldData: {rows: TransactionRow[],closingBalance:number, totalPages: number} = {rows: [], closingBalance: 0, totalPages: 0}) => {
        const oldRows = oldData.rows || [];

        if(tempData.current.length > 0){
            // Prepend any temp data saved while not on first page
            oldRows.push(...tempData.current);
            tempData.current = [];
        }

        // handle pagination (as if it was server side)
        if(oldRows.length >= pagination.pageSize){
          const diff = oldRows.length - pagination.pageSize + 1;
          oldRows.splice(0, diff);
        }

        // Calculate the new total pages based on the given page size
        const totalRows = oldRows.length + message.length+1;
        const newPageCount = Math.ceil(totalRows / pagination.pageSize);
        
        return { rows: [...oldRows, ...message],closingBalance: message[message.length - 1]?.closingBalance || 0, totalPages: newPageCount };
      });
    };

    ws.onMessage = handleMessage

    return () => {
      ws.disconnect();
    };
  }, [query.isFetching,loanId, queryClient,pagination]);


  return query;
}


export function useTransactionsCache(loanId: string) {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<TransactionQueryData>(['transactions', loanId])
}