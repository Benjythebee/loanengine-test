import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import { LoansListTable } from "@/components/ui/loan-list/list.loans.ssr";
import { LucideList } from "lucide-react";

export const LoansAccountPage = () => { 

    return<>
    <div className='mb-2 flex items-center justify-between space-y-2'>

        </div>

        <Card className='grid grid-cols-1'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LucideList className="h-4 w-4 text-muted-foreground" /> View Loans</CardTitle>
          </CardHeader>
          <CardContent className='p-2'>
            <LoansListTable />
          </CardContent>
        </Card>

        </>
}

export default LoansAccountPage;