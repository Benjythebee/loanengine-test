import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import { LoansListTable } from "@/components/ui/loan-list/list.loans.ssr";
import { LucideList } from "lucide-react";

export const HomePage = () => { 

    return<>
    <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>

        </div>

        <Card className='grid grid-cols-1'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LucideList className="h-4 w-4 text-muted-foreground" /> Loan accounts</CardTitle>
          </CardHeader>
          <CardContent className='p-2'>
            <LoansListTable />
          </CardContent>
        </Card>

        </>
}

export default HomePage;