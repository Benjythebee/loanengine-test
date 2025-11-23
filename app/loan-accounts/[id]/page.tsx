import { Alert, AlertTitle } from "@/components/primitives/alert";
import { Button } from "@/components/primitives/button";
import { Skeleton } from "@/components/primitives/skeleton";
import { LucideTriangleAlert } from "lucide-react";
import { LoanInfoCard } from "./_components/loan-info/info.card";
import { PlaceholderCard } from "./_components/placeholder/card";
import { DisbursementTablePlaceholder } from "./_components/placeholder/disbusrsement-table";
import { LoanTransactionsCard } from "./_components/transactions/transaction.card";
import { LoanIDProvider } from "./id-provider";


type LoanAccountPage = {
  params: Promise<{
    id?: string;
  }>;
  searchParams: Promise<{
    page?: string;
    size?: string;
    sort?: string;
  }>
};

export const LoanAccounts = async (props: LoanAccountPage) => { 
  const { id } = await props.params;
  const searchParams = await props.searchParams;
  
    return<LoanIDProvider loanID={id||'1'}>
            <LoanInfoCard loanId={id||'1'}/>
              <PlaceholderCard title="Entities" actionButton={<Button>Manage</Button>}>
                <Skeleton className="h-24 w-full"/>
              </PlaceholderCard>

              <PlaceholderCard title="Payment Settings" actionButton={<Button>Manage</Button>}>
                <Alert variant="default" className="bg-white/30">
                  <AlertTitle className="text-xl flex gap-8"><LucideTriangleAlert className="w-8 h-8" /> No Payment Settings</AlertTitle>
                </Alert>
              </PlaceholderCard>
              <DisbursementTablePlaceholder />
            <LoanTransactionsCard loanId={id||'1'} searchParams={searchParams}/>
          </LoanIDProvider>
}

export default LoanAccounts;