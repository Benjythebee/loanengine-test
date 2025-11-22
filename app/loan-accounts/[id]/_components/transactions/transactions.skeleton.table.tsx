import { Skeleton } from "@/components/primitives/skeleton"
import { TableCell, TableRow } from "@/components/primitives/table"
import { TableSkeleton } from "@/components/ui/table/skeleton.table"
import { cn } from "@/lib/utils"


export const TransactionsTableSkeleton = ({filterCount,headerCount,rowCount}: {filterCount: number, headerCount: number, rowCount: number}) => {

const filterSkeleton = [...Array(filterCount)].map((_, i) =><Skeleton key={i} className="h-6 w-32" />)

const headerSkeleton = [...Array(headerCount)].map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-5" />
              </TableCell>
          ))
const rowSkeleton = [...Array(rowCount)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(headerCount)].map((__, j) => (
                <TableCell key={j}>
                  <Skeleton className={cn("h-4")} />
                </TableCell>
                ))}
              </TableRow>
          ))
          
    return <TableSkeleton filterHeader={filterSkeleton} childrenHeader={headerSkeleton} childrenBody={rowSkeleton} />
}
