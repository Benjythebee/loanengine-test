import { Skeleton } from "@/components/primitives/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/primitives/table";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LucideTriangleAlert } from "lucide-react";
import { Suspense } from 'react';
import { expect, within } from 'storybook/test';
import { LoansListTableBodyClient } from "./list.loans.client";
// import { TableRowClientClickable } from "./list.loans.row.client";

// Mock data for stories
const mockLoansData = [
  {
    loanId: 'LOAN-001',
    closingBalance: 15000.50,
    totalTransactions: 12
  },
  {
    loanId: 'LOAN-002', 
    closingBalance: 8750.25,
    totalTransactions: 8
  },
  {
    loanId: 'LOAN-003',
    closingBalance: 22100.00,
    totalTransactions: 24
  },
  {
    loanId: 'LOAN-004',
    closingBalance: 5500.75,
    totalTransactions: 6
  },
  {
    loanId: 'LOAN-005',
    closingBalance: 31250.90,
    totalTransactions: 18
  }
];

// Since the original component is async/server-side, we need client-compatible versions for Storybook
const LoansListClient = ({ data = mockLoansData, isLoading = false, error=null}:{data?: typeof mockLoansData, isLoading?: boolean, error?: string | null}) => {
  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loan ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Transactions</TableHead>
          </TableRow>
        </TableHeader>
        <SkeletonLoansList />
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Loan ID</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Transactions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
       {!error && <LoansListTableBodyClient loanIds={data} />}
       {error && (
        <TableRow>
          <TableCell colSpan={3} className="w-full text-center p-4 text-red-500">
            <div className="flex justify-center items-center">
              <LucideTriangleAlert className="mr-2" />{error}
            </div>
          </TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>
  );
};

// Skeleton component for loading state
const SkeletonLoansList = () => {
  return (
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="w-64 h-4" /></TableCell>
          <TableCell><Skeleton className="w-8 h-4" /></TableCell>
          <TableCell><Skeleton className="w-8 h-4" /></TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

const meta: Meta<typeof LoansListClient> = {
  title: 'UI/Loan List',
  component: LoansListClient,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A table component that displays a list of loans with their basic information including loan ID, closing balance, and transaction count. Features clickable rows that navigate to individual loan details.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of loan data objects',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the component is in loading state',
    },
    error: {
      control: 'text',
      description: 'Error message to display in the table, for example when data fetching fails',
    },
  },
}  satisfies Meta<typeof LoansListClient>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with sample data
export const Default: Story = {
  args: {
    data: mockLoansData,
    isLoading: false,
    error: null
  },
    play: async ({ canvasElement,userEvent, parameters }) => {
    const canvas = within(canvasElement);
    const mockRouterPush = parameters.nextjs.router.push; 

    // Simulate user interaction that triggers a router event
    const link = canvas.getByText('LOAN-001'); // Assuming your component has a link with this text
    await userEvent.click(link);

    // Assert that the router method was called
    await expect(mockRouterPush).toHaveBeenCalledWith(
      "/loan-accounts/LOAN-001" // The expected path
    );
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
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
    error: "Something went wrong: could not retrieve loan accounts. Please try again."
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
    data: [],
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the table when no loan data is available.',
      },
    },
  },
};

// Large amounts
export const LargeAmounts: Story = {
  args: {
    data: [
      {
        loanId: 'LOAN-LARGE-001',
        closingBalance: 1234567.89,
        totalTransactions: 150
      },
      {
        loanId: 'LOAN-LARGE-002',
        closingBalance: 987654.32,
        totalTransactions: 200
      },
      {
        loanId: 'LOAN-LARGE-003',
        closingBalance: 5432109.87,
        totalTransactions: 350
      }
    ],
    isLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the table with large loan amounts to test number formatting.',
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
        <Suspense fallback={
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Transactions</TableHead>
              </TableRow>
            </TableHeader>
            <SkeletonLoansList />
          </Table>
        }>
          <LoansListClient data={mockLoansData} isLoading={false} />
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

// Interactive demo showing different states
export const InteractiveStates: Story = {
  render: () => {
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Default State</h3>
          <LoansListClient data={mockLoansData.slice(0, 3)} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Loading State</h3>
          <LoansListClient isLoading={true} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Empty State</h3>
          <LoansListClient data={[]} />
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Shows all different states of the loans list component in one view for comparison.',
      },
    },
  },
};
