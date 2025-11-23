import { useTransactionWebSocket, useWebSocket } from "@/hooks/useWebSocket";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { TransactionQueryData } from "./useTransactionQuery";


export const useLiveUpdates = (loanId:string,columnFilters: ColumnFiltersState,queryKey:(string|number)[]) => {
  const queryClient = useQueryClient();
  const [newElements, setNewElements] = useState(0);
  const {latestTransaction} = useTransactionWebSocket({loanId,columnFilters:columnFilters.length > 0 ? columnFilters : undefined});
  const {onUpdate, removeOnUpdate} = useWebSocket(useShallow((state)=>({ onUpdate: state.onUpdate, removeOnUpdate: state.removeOnUpdate })));

  useEffect(() => {
    const callbackKey = onUpdate((tx)=>{
      queryClient.setQueryData(queryKey, (oldData: TransactionQueryData) => {
        if(!oldData) return oldData;
        const newRows = oldData.rows.map((row) => {
          if(row.id === tx.id){
            return { ...row, ...tx };
          }
          return row;
        });
        return {
          ...oldData,
          rows: newRows
        };
      })
    })
    return () => {
      removeOnUpdate(callbackKey)
    }
  },[queryKey])


  useEffect(() => {
    if(latestTransaction){
      setNewElements((count) => count + 1);
    }
  }, [latestTransaction]);
  // console.log('useLiveUpdates newElements count:', dataUpdatedAt);


  const refresh = useCallback(() => {
    if(newElements > 0) {
      queryClient.invalidateQueries({queryKey,refetchType:'all'});
      setNewElements(0);
    }
  }, [newElements, queryClient, queryKey]);

  useEffect(() => {
    // On queryKey change, reset newElements count
    setNewElements(0);
  }, [queryKey]);


    return { newElements, refresh};
    
}