import { useTransactionWebSocket } from "@/hooks/useWebSocket";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";


export const useLiveUpdates = (loanId:string,columnFilters: ColumnFiltersState,dataUpdatedAt:number) => {

    const [newElements, setNewElements] = useState(0);
  const filters = columnFilters.map((filter) => `${filter.value}`)
  const {latestTransaction} = useTransactionWebSocket({loanId,filterTypes:filters.length > 0 ? filters : undefined});

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