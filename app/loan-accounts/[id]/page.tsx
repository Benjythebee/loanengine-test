import { LoanInfoCard } from "./_components/loan-info/info.card";
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
    
            <LoanTransactionsCard loanId={id||'1'} searchParams={searchParams}/>
          </LoanIDProvider>
}

export default LoanAccounts;