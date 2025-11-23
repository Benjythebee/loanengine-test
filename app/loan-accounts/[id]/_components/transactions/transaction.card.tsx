import { Button } from "@/components/primitives/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/primitives/card"
import { Suspense } from "react"
import { TransactionsTableSkeleton } from "./transactions.skeleton.table"
import { TransactionTable } from "./transactions.table.ssr"

type LoanTransactionsCardProps = {
    loanId: string;
    searchParams: {
        page?: string;
        size?: string;
        /**
         * This is just to trigger SSR with fake data for demo purposes
         */
        withFakeSSR?: string;
    };
}

export const LoanTransactionsCard = ({loanId,searchParams}:LoanTransactionsCardProps) => {

    return<Card className='grid grid-cols-1'>
          <CardHeader>
           <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent className='ps-2 relative'>
            <Suspense fallback={<TransactionsTableSkeleton filterCount={3} headerCount={7} rowCount={9} />}>
                <TransactionTable loanId={loanId} searchParams={searchParams}/>
            </Suspense>
          </CardContent>
          <CardFooter >
            <div className="w-full flex gap-4 items-end justify-end">
                <Button variant={'secondary'} size={'sm'}>Statements</Button>
                <Button variant={'secondary'} size={'sm'}>Accruals</Button>
                <Button variant={'secondary'} size={'sm'}>Details</Button>
            </div>
          </CardFooter>
        </Card>
}
