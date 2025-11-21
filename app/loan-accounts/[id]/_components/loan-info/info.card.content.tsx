"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { useTransactionsCache } from "@/hooks/useTransactionQuery";

export const LoanInfoCardContent = ({ loanId }: { loanId: string }) => {
  const data = useTransactionsCache(loanId);

  return (
    <Card className="grid grid-cols-1 my-2">
      <CardHeader>
        <CardTitle>Loan Info</CardTitle>
      </CardHeader>
      <CardContent className="ps-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Principal (IB) balance:",
                value: 5000000,
              },
              {
                label: "Principal (NIB) balance:",
                value: 0.0,
              },
              {
                label: "Interest balance:",
                value: 0.0,
              },
              {
                label: "Fee (IB) balance:",
                value: 0.0,
              },
              {
                label: "Fee (NIB) balance:",
                value: 0.0,
              },
              {
                label: "Closing balance",
                value: (data?.closingBalance || 0).toLocaleString(),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <h3 className="text-sm font-medium">{item.label}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {[
              {
                label: "Principal (18) paid:",
                value: 0.0,
              },
              {
                label: "Principal (NIB) paid:",
                value: 0.0,
              },
              {
                label: "Interest paid:",
                value: 0.0,
              },
              {
                label: "Fees (IB) paid:",
                value: 0.0,
              },
              {
                label: "Fees (NIB) paid:",
                value: 0.0,
              },
              {
                label: "Total Paid:",
                value: 0.0,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center"
              >
                <h3 className="text-sm font-medium">{item.label}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
