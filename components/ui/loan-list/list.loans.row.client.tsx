'use client'
import { TableRow } from "@/components/primitives/table"
import { useRouter } from "next/navigation"


export const TableRowClientClickable = ({children, href}: {children: React.ReactNode, href: string}) => {
    const router = useRouter();

    return <TableRow className="cursor-pointer" onClick={() => {
        router.push(href);
    }}>
        {children}
    </TableRow>
}