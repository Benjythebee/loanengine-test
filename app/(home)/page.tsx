import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import {  LucideList } from "lucide-react";
import { LoansList } from "./_components/list.loans";

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
            <LoansList />
          </CardContent>
        </Card>

        </>
}

export default HomePage;