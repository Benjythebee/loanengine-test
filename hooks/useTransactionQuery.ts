'use client'
import { sleep } from "@/lib/utils";
import { getMockData } from "@/mock/data";
import { TransactionRow } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useWebSocket } from "./useWebSocket";

export type TransactionQueryData = {
  rows: TransactionRow[];
  closingBalance: number;
  totalPages: number;
}

export function useLiveTransactions(loanId: string,initalData?: TransactionQueryData,  pagination:{pageIndex:number;pageSize:number}={pageIndex:0,pageSize:10},liveUpdates=true) {
  const queryClient = useQueryClient();

  const tempData = useRef<TransactionQueryData[]>([]);
  // Base query: initial state
  const query = useQuery({
    queryKey: ['transactions',loanId, pagination.pageIndex],
    refetchOnMount: false,
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      await sleep(300); 

      const requestedDate = getMockData(loanId, {
        page: pagination.pageIndex,
        size: pagination.pageSize
      });
      return {rows: requestedDate.rows, closingBalance: requestedDate.closingBalance, totalPages: requestedDate.totalPages};
    }, // initial placeholder
    initialData: {
      rows: initalData?.rows || [],
      closingBalance: initalData?.closingBalance || 0,
      totalPages: initalData?.totalPages || 0
    } 
    
  });

  const {ws,isConnected,subscribe, unsubscribe} = useWebSocket();

  const addData = useCallback((oldData:TransactionQueryData,newData:TransactionQueryData) => {
      const oldRows = oldData.rows || [];
      if(tempData.current.length > 0){
          // Prepend any temp data saved while not on first page
          oldRows.push(...tempData.current.map((data) => data.rows).flat());
        }
        tempData.current = [];
      // Calculate the new total pages based on the given page size
      
      // Prepend new item, remove last to maintain page size (optional, depends on UX preference)
      const total = [...oldRows, ...newData.rows].filter((row, index, arr) => 
        arr.findIndex(r => r.id === row.id) === index
      );
      const newDataPage = total.slice(-pagination.pageSize);
      
      return { rows:newDataPage,closingBalance: newDataPage[newDataPage.length - 1]?.closingBalance || 0, totalPages: newData.totalPages };
  }, [pagination.pageSize]);

  useEffect(() => {
    if (query.isFetching) return

    // Wait for initial data to be loaded
    if(!ws?.connected){
      // ws?.connect();
    }

    // Send loanId to subscribe
    if (loanId && ws?.currentLoanId !== loanId) {
      ws?.send(loanId);
    }

    // Handle incoming messages
    const handleMessage = (message: TransactionQueryData) => {

      if(!liveUpdates){
            // If not on first page, do not update rows and save to tempData ( better UX when navigating around)
            tempData.current = [...tempData.current,message];
            return 
      }
      console.log(pagination.pageSize,pagination.pageIndex);
      queryClient.setQueryData(['transactions', loanId,0], (oldData: TransactionQueryData = {rows: [], closingBalance: 0, totalPages: 0}) => {
        return addData(oldData, message);
      });
    };
    
    subscribe(handleMessage);

    return () => {
      unsubscribe(handleMessage);
      ws?.disconnect();
    };
  }, [ws,query.isFetching,loanId, queryClient,pagination,liveUpdates]);

  useEffect(() => {
    if(ws?.connected){
      ws.setPageSettings(pagination);
    }
    if(pagination.pageIndex === 0){
      if(tempData.current.length > 0){
        const top = tempData.current.splice(0, 1);
        // Refresh data when pagination changes
        console.log(pagination.pageSize,pagination.pageIndex);
        queryClient.setQueryData(['transactions', loanId,0], (oldData: TransactionQueryData = {rows: [], closingBalance: 0, totalPages: 0}) => {
          return addData(oldData, top[0]);
          });
        
      }
    }

  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    if(liveUpdates){
      if(pagination.pageIndex === 0){
        if(tempData.current.length > 0){
          const top = tempData.current.splice(0, 1);

          queryClient.setQueryData(['transactions', loanId,0], (oldData: TransactionQueryData = {rows: [], closingBalance: 0, totalPages: 0}) => {
            return addData(oldData, top[0]);
            });
          
        }
      }
    }
  }, [liveUpdates]);

  return {...query,isConnected};
}


export function useTransactionsCache(loanId: string) {

  const {data} = useQuery({
    queryKey: ['transactions', loanId,0,10],
    enabled:false,
    refetchOnMount:false,
    refetchOnWindowFocus:false,
    queryFn:()=>{}
  })

  return data as unknown as TransactionQueryData;
}