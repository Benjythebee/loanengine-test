import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Skeleton } from "@/components/primitives/skeleton";
import { Suspense } from "react";
import { LoanInfoCardContent } from "./info.card.content";

export const LoanInfoCard = ({ loanId }: { loanId: string }) => {
  return (
    <Card className="grid grid-cols-1 my-2">
      <CardHeader>
        <CardTitle>Loan Info</CardTitle>
      </CardHeader>
      <CardContent className="ps-2">
        <Suspense fallback={<ContentSkeleton />}>
          <LoanInfoCardContent loanId={loanId} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

const ContentSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
      <div className="flex flex-col gap-2">
        {[
          {
            label: "Principal (IB) balance:",
          },
          {
            label: "Principal (NIB) balance:",
          },
          {
            label: "Interest balance:",
          },
          {
            label: "Fee (IB) balance:",
          },
          {
            label: "Fee (NIB) balance:",
          },
          {
            label: "Closing balance",
          },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <h3 className="text-sm font-medium">{item.label}</h3>
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[
          {
            label: "Principal (18) paid:",
          },
          {
            label: "Principal (NIB) paid:",
          },
          {
            label: "Interest paid:",
          },
          {
            label: "Fees (IB) paid:",
          },
          {
            label: "Fees (NIB) paid:",
          },
          {
            label: "Total Paid:",
          },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <h3 className="text-sm font-medium">{item.label}</h3>
            <Skeleton className="h-3 w-6" />
          </div>
        ))}
      </div>
    </div>
  );
};
