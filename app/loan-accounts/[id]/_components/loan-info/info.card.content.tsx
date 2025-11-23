"use client";
import { useLoanBasicInformation } from "@/hooks/useTransactionQuery";
import { useMemo } from "react";

export const LoanInfoCardContent = ({ loanId }: { loanId: string }) => {
  const {data} = useLoanBasicInformation(loanId);

  const processed = useMemo(() => {
    return Object.entries(data || {}).filter(([key]) => key !== 'loanId' && key !== 'Total Transactions').map(([key, value]) => ({ key, value }));
  }, [data]);

  return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="flex flex-col gap-2">
            {processed.slice(0,6).map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center"
              >
                <h3 className="text-sm font-medium">{item.key}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {processed.slice(6,11).map((item) => (
              <div
                key={item.key}
                className="flex justify-between items-center"
              >
                <h3 className="text-sm font-medium">{item.key}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
  );
};
