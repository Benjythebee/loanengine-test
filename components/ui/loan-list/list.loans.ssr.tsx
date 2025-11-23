import { Skeleton } from "@/components/primitives/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/primitives/table";
import { getAllMockDataMetadata } from "@/mock/data";
import { LucideTriangleAlert } from "lucide-react";
import { Suspense } from "react";
import { LoansListTableBodyClient } from "./list.loans.client";

const getData = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = getAllMockDataMetadata();

  return {data, error: null};
};


const LoanTableRows = async () => {
  const {data,error} = await getData();

  return (
    <TableBody>
      {!error && <LoansListTableBodyClient loanIds={data} />}
      {error && (
        <TableRow>
          <TableCell colSpan={3} className="w-full text-center p-4 text-red-500">
            <div className="flex justify-center items-center">
              <LucideTriangleAlert className="mr-2" />{error}
            </div>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export const LoansListTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Loan ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Transactions</TableHead>
        </TableRow>
      </TableHeader>
      <Suspense fallback={<SkeletonLoansList />}>
        <LoanTableRows />
      </Suspense>
    </Table>
  );
};

export const SkeletonLoansList = () => {
  return (
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="w-64 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-8 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-8 h-4" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
