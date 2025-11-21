import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card"
import { TableSkeleton } from "@/components/ui/table/skeleton.table"
import { Suspense } from "react"
import { TransactionTable } from "./transaction.table"
import { TableCell, TableRow } from "@/components/primitives/table"
import { Skeleton } from "@/components/primitives/skeleton"
import { cn } from "@/lib/utils"

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
            <Suspense fallback={<TableSkeleton filterHeader={filterSkeleton} childrenHeader={headerSkeleton} childrenBody={rowSkeleton} />}>
                <TransactionTable loanId={loanId} searchParams={searchParams}/>
            </Suspense>
          </CardContent>
        </Card>
}

const filterSkeleton = [...Array(3)].map((_, i) =><Skeleton key={i} className="h-6 w-32" />)

const headerSkeleton = [...Array(6)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-5" />
              </TableCell>
          ))
const rowSkeleton = [...Array(7)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton className={cn("h-4",i==5?"w-8":"h-4")} />
              </TableCell>
          ))