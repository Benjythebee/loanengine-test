import { createContext, ReactNode, useContext, useState } from 'react';


interface ColumnFilter {
    id: string;
    value: string;
}

interface PaginationState {
    pageIndex: number;
    pageSize: number;
}

interface TransactionsContextValue {
    // Pagination
    pagination: PaginationState;
    setPagination: (pagination: PaginationState) => void;
    
    // Column filtering
    columnFilters: ColumnFilter[];
    setColumnFilters: (filters: ColumnFilter[]) => void;
    
    // Sorting
    sorting: { id: string; desc: boolean }[];
    setSorting: (sorting: { id: string; desc: boolean }[]) => void;

}

const TransactionsContext = createContext<TransactionsContextValue | undefined>(undefined);

interface TransactionsProviderProps {
    children: ReactNode;
}

export function TransactionsFilterProvider({ children }: TransactionsProviderProps) {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    
    const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

    const value: TransactionsContextValue = {
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
        sorting,
        setSorting
    };

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactionsFilters() {
    const context = useContext(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactionsFilters must be used within a TransactionsProvider');
    }
    return context;
}