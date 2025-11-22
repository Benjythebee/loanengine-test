import { Card, CardContent, CardHeader, CardTitle } from "@/components/primitives/card";
import { generateMockTransactions } from "@/lib/transactions-helper";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Suspense } from 'react';
import { expect, within } from 'storybook/test';
import { TransactionsTableSkeleton } from "./transactions.skeleton.table";
import { TransactionsDataTable } from "./transactions.table.client";
// import { TableRowClientClickable } from "./list.loans.row.client";

// Mock data for stories
const mockData = generateMockTransactions(20)

// Since the original component is async/server-side, we need client-compatible versions for Storybook
const TransactionsTableClient = ({ loanId='LOAN_01',hasData=true, page=0,pageSize=10, enableLiveDataOnMount=false,isLoading = false, error=null}:{loanId: string, hasData: boolean, isLoading?: boolean, error?: string | null, page?:number,pageSize?:number, enableLiveDataOnMount?: boolean}) => {
    

    const pageNumber = page || 0;
    const sizeNumber = pageSize || 10;

    const data = hasData ? {
        rows: mockData.slice(pageNumber * sizeNumber, (pageNumber + 1) * sizeNumber),
        totalPages: hasData?Math.ceil(mockData.length / sizeNumber):0,
        closingBalance: mockData[mockData.length -1].closingBalance,
    } : {
        rows: [],
        totalPages: 0,
        closingBalance: 0
    };

    return<Card className='grid grid-cols-1'>
          <CardHeader>
           <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent className='ps-2 relative'>
            {isLoading && <TransactionsTableSkeleton filterCount={3} headerCount={7} rowCount={3} />}
            {!isLoading && (<TransactionsDataTable
                    loanId={loanId}
                    initialData={data} 
                    enableLiveDataOnMount={enableLiveDataOnMount}
                    error={error||undefined}
                    totalPages={data?.totalPages || 0}
                    pagination={{ pageIndex: pageNumber, pageSize: sizeNumber }}
                        />)}
          </CardContent>
        </Card>
    
    return 

}



const meta: Meta<typeof TransactionsTableClient> = {
  title: 'UI/Transactions Table',
  component: TransactionsTableClient,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A table component that displays a list of transactions with their details including transaction ID, amount, date, and type. Features clickable rows that navigate to individual transaction details.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hasData: {
      control: 'boolean',
      description: 'Whether the table has transaction data to display',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the component is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display in the table, for example when data fetching fails',
    },
    page: {
      control: 'number',
      description: 'Current page index for pagination',
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page for pagination',
    },
    enableLiveDataOnMount:{
      control: 'boolean',
      description: 'Whether to enable live data updates when the component mounts (simulated)',
    }
  },
}  satisfies Meta<typeof TransactionsTableClient>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with sample data
export const Default: Story = {
  args: {
    hasData: true,
    isLoading: false,
    error: null,
    enableLiveDataOnMount:true,
    page: 0,
    pageSize: 10
  },
};

// Loading state
export const Loading: Story = {
  args: {
    hasData: false,
    isLoading: true,
    enableLiveDataOnMount:false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the skeleton loading state while data is being fetched.',
      },
    },
  },
};

export const Errored: Story = {
  args: {
    hasData: false,
    enableLiveDataOnMount:false,
    error: "Something went wrong: could not retrieve transaction data. Please try again."
  },
  play: async (
    {
      canvasElement,
    }
  ) => {
    const canvas = within(canvasElement);

    const errorText = canvas.getByText("Something went wrong:",{
        exact: false
    });

    await expect(errorText).toBeInTheDocument();
  }
};
// Empty state
export const Empty: Story = {
  args: {
    hasData: false,
    isLoading: false,
    enableLiveDataOnMount:false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the table when no transaction data is available.',
      },
    },
  },
};


// Comprehensive demo with suspense simulation
export const WithSuspenseDemo: Story = {
  render: () => {
    const LoadingDemo = () => (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading State (with Suspense)</h3>
        <Suspense fallback={<TransactionsTableSkeleton filterCount={3} headerCount={7} rowCount={3} />}>
          <TransactionsTableClient loanId="LOAN_01" hasData={true} isLoading={false} />
        </Suspense>
      </div>
    );
    
    return <LoadingDemo />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component works with React Suspense, showing the skeleton fallback before rendering the actual data.',
      },
    },
  },
};
