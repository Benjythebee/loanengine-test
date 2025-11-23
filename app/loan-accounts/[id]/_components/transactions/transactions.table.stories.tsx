import { generateMockTransactions } from "@/lib/transactions-helper";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from "storybook/test";
import { LoanIDProvider } from "../../id-provider";
import { TransactionsTable } from "./transactions.table";

// Mock data for stories
const mockData = generateMockTransactions(25);

const TableWithProviders = (args: React.ComponentProps<typeof TransactionsTable>) => {
  return <LoanIDProvider loanID="LOAN_01"><TransactionsTable {...args} /></LoanIDProvider>
}

// === PRESENTATIONAL COMPONENT STORIES ===
const meta: Meta<typeof TransactionsTable> = {
  title: 'UI/Transactions Table',
  component: TableWithProviders,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A presentational table component that displays transaction data. This is the pure component without data fetching logic, making it perfect for Storybook demonstrations and testing different states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of transaction data to display',
    },
    totalRows: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of rows available',
    },
    pagination: {
      control: 'object',
      description: 'Current pagination state',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
    },
    isFetching: {
      control: 'boolean',
      description: 'Whether the table is fetching new data',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    newElementsCount: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Number of new elements available for refresh',
    },
    refreshDisabled: {
      control: 'boolean',
      description: 'Whether the refresh button is disabled',
    },
  },
  args: {
    totalRows: mockData.length,
    // Default props with mock functions
    onPaginationChange: () => {},
    onSortingChange: () => {},
    onColumnFiltersChange: () => {},
    onRefresh: () => {},
  },
} satisfies Meta<typeof TransactionsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state with sample data
export const Default: Story = {
  args: {
    data: mockData.slice(0, 10),
    totalRows: mockData.length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
    clientSideInteractions: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default table state with transaction data and standard pagination.',
      },
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    totalRows: mockData.length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: true,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the loading spinner when no data is present and isLoading is true.',
      },
    },
  },
};

// Fetching state (data exists but new data is being fetched)
export const Fetching: Story = {
  args: {
    data: mockData.slice(0, 10),
    totalRows: mockData.length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: true,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the table with data while new data is being fetched (refresh button shows loading state).',
      },
    },
  },
};

// Error state
export const WithError: Story = {
  args: {
    data: [],
    totalRows: 0,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: "Failed to load transaction data. Try again in a moment.",
    newElementsCount: 0,
    refreshDisabled: false,
  },
  play: async ({ canvasElement }) => {

    const canvas = within(canvasElement);
    // Check that the error message is displayed
    const errorMessage = await canvas.findByText(/Failed to load transaction data/i);
    
    await expect(errorMessage).toBeInTheDocument();

    const addButton = canvas.getByTestId('add-button')
    await expect(addButton).toBeDisabled(); 

  },
  parameters: {
    docs: {
      description: {
        story: 'Shows error state when data fetching fails.',
      },
    },
  },
};

// Empty state (no error, no loading, just no data)
export const Empty: Story = {
  args: {
    data: [],
    totalRows: 0,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows empty table state when no data is available.',
      },
    },
  },
};

// With filters applied
export const WithFilters: Story = {
  args: {
    data: mockData.filter(t => t.type === 'PAYMENT').slice(0, 10),
    totalRows: mockData.filter(t => t.type === 'PAYMENT').length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [
      { id: "type", value: "PAYMENT" },
      { id: "status", value: "CLEARED" }
    ],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows table with active filters applied to demonstrate filtered state.',
      },
    },
  },
};

// With new elements available for refresh
export const WithNewElements: Story = {
  args: {
    data: mockData.slice(0, 10),
    totalRows: mockData.length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 5,
    refreshDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows table with new elements indicator on refresh button.',
      },
    },
  },
};

// Large dataset with pagination
export const LargeDataset: Story = {
  args: {
    data: mockData.slice(40, 60), // Show page 3 of data
    totalRows: mockData.length,
    pagination: { pageIndex: 2, pageSize: 20 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates pagination with a large dataset and different page size.',
      },
    },
  },
};

// Interactive demo showcasing various states
export const InteractiveDemo: Story = {
  args: {
    data: mockData.slice(0, 10),
    totalRows: mockData.length,
    pagination: { pageIndex: 0, pageSize: 10 },
    sorting: [{ id: "transactionDate", desc: true }],
    columnFilters: [],
    isLoading: false,
    isFetching: false,
    error: undefined,
    newElementsCount: 0,
    refreshDisabled: false,
    clientSideInteractions: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo where you can modify all props to see how the table responds to different states and configurations.',
      },
    },
  },
};
