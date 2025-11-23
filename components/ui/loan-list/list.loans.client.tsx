import { TableCell, TableRow } from "@/components/primitives/table"
import { getAllMockDataMetadata } from "@/mock/data"
import { TableRowClientClickable } from "./list.loans.row.client"


export const LoansListTableBodyClient = ({loanIds}:{loanIds: ReturnType<typeof getAllMockDataMetadata>}) => {

    return <>
                {loanIds.map((loan) => (
                    <TableRowClientClickable key={loan.loanId} href={`/loan-accounts/${loan.loanId}`}>
                        <TableCell className="p-2">{loan.loanId}</TableCell>
                        <TableCell className="p-2">${loan.closingBalance.toLocaleString()}</TableCell>
                        <TableCell className="p-2">{loan.totalTransactions}</TableCell>
                    </TableRowClientClickable>
                ))}
                {loanIds.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center p-4">
                            No loans found.
                        </TableCell>
                    </TableRow>
                )}
                </>
}