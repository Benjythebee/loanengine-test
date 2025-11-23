import { useTransactionWebSocket } from "@/hooks/useWebSocket";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";


export const useLiveUpdates = (loanId:string,columnFilters: ColumnFiltersState,dataUpdatedAt:number) => {

    const [newElements, setNewElements] = useState(0);

  const {latestTransaction} = useTransactionWebSocket({loanId,filterTypes:columnFilters.map((filter) => `${filter.value}`)});

  useEffect(() => {
    if(latestTransaction){
      setNewElements((count) => count + 1);
    }
  }, [latestTransaction]);

  useEffect(() => {
    setNewElements(0);
  },[dataUpdatedAt])


    return { newElements};
    
}