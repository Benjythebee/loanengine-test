import { Skeleton } from "@/components/primitives/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/primitives/table"
import { getMockDataMetadata } from "@/mock/data";
import { Suspense } from "react";
import { TableRowClientClickable } from "./list.loans.row.client";


const getData = async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const d = getMockDataMetadata();

    return d;
}

export const LoansList = () => {

    return <Table>
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
}

const LoanTableRows = async () => {
    const loanIds = await getData();
    
    return   <TableBody>
                {loanIds.map((loan) => (
                    <TableRowClientClickable key={loan.loanId} href={`/loan-accounts/${loan.loanId}`}>
                        <TableCell className="p-2">{loan.loanId}</TableCell>
                        <TableCell className="p-2">${loan.closingBalance.toLocaleString()}</TableCell>
                        <TableCell className="p-2">{loan.totalTransactions}</TableCell>
                    </TableRowClientClickable>
                ))}
            </TableBody>
}

export const SkeletonLoansList = () => {
    return <TableBody>
        {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="w-64 h-4" /></TableCell>
                <TableCell><Skeleton className="w-8 h-4" /></TableCell>
                <TableCell><Skeleton className="w-8 h-4" /></TableCell>
            </TableRow>
        ))}
    </TableBody>
}