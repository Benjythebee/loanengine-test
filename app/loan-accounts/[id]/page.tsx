import { LoanInfoCard } from "./_components/loan-info/info.card";
import { LoanTransactionsCard } from "./_components/transactions/transaction.card";


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
  
    return<>
            <LoanInfoCard loanId={id||'1'}/>
    
            <LoanTransactionsCard loanId={id||'1'} searchParams={searchParams}/>
            </> 
}

export default LoanAccounts;