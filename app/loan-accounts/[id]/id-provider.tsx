"use client";
import { createContext, ReactNode, useContext } from "react";



interface LoanIDContextValue {
    loanID: string;
}

const LoanIDContext = createContext<LoanIDContextValue | undefined>(undefined);

interface LoanIDProviderProps {
    loanID: string;
    children: ReactNode;
}

export function LoanIDProvider({ loanID, children }: LoanIDProviderProps) {
    return (
        <LoanIDContext.Provider value={{ loanID }}>
            {children}
        </LoanIDContext.Provider>
    );
}

export function useLoanID() {
    const context = useContext(LoanIDContext);
    if (context === undefined) {
        throw new Error("useLoanID must be used within a LoanIDProvider");
    }
    return context;
}