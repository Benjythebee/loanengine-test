import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { Suspense } from "react"
import { TransactionsTableSkeleton } from "./transactions.skeleton.table"
import { TransactionTable } from "./transactions.table.ssr"

type LoanTransactionsCardProps = {
    loanId: string;
    searchParams: {
        page?: string;
        size?: string;
        sort?: string;
    };
}

export const LoanTransactionsCard = ({loanId,searchParams}:LoanTransactionsCardProps) => {

    return<Card className='grid grid-cols-1'>
          <CardHeader>
           <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent className='ps-2 relative'>
            <Suspense fallback={<TransactionsTableSkeleton filterCount={3} headerCount={7} rowCount={3} />}>
                <TransactionTable loanId={loanId} searchParams={searchParams}/>
            </Suspense>
          </CardContent>
        </Card>
}
