import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RowPerPage } from './row.per.page';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';
import { Badge } from '@/components/primitives/badge';
import { Checkbox } from '@/components/primitives/checkbox';

const meta: Meta<typeof RowPerPage> = {
  title: 'UI/Table/Footer/RowPerPage',
  component: RowPerPage,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category: string;
  account: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
};

// Generate fake transaction data
const generateTransactions = (count: number): Transaction[] => {
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed'];
  const categories = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education'];
  const accounts = ['Checking', 'Savings', 'Credit Card', 'Investment'];
  const descriptions = [
    'Amazon Purchase',
    'Grocery Store',
    'Gas Station',
    'Restaurant',
    'Movie Theater',
    'Online Subscription',
    'Utility Bill',
    'ATM Withdrawal',
    'Salary Deposit',
    'Transfer',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `TXN${String(i + 1).padStart(4, '0')}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    amount: Math.round((Math.random() * 2000 - 500) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    account: accounts[Math.floor(Math.random() * accounts.length)],
  }));
};

// Generate fake user data
const generateUsers = (count: number): User[] => {
  const roles: User['role'][] = ['admin', 'user', 'viewer'];
  const statuses: User['status'][] = ['active', 'inactive'];
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
      id: i + 1,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      department: departments[Math.floor(Math.random() * departments.length)],
    };
  });
};

// Transaction columns
const transactionColumns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className={`text-right font-medium ${amount < 0 ? 'text-red-600' : 'text-green-600'}`}>{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge
          variant={
            status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : 'destructive'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => <div>{row.getValue('category')}</div>,
  },
];

// User columns
const userColumns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <Badge variant={status === 'active' ? 'default' : 'secondary'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => <div>{row.getValue('department')}</div>,
  },
  {
    accessorKey: 'lastLogin',
    header: 'Last Login',
    cell: ({ row }) => <div>{row.getValue('lastLogin')}</div>,
  },
];

// Story wrapper component for transactions
const TransactionTableStory = ({ data }: { data: Transaction[] }) => {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: transactionColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={transactionColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <RowPerPage table={table} />
    </div>
  );
};

// Story wrapper component for users
const UserTableStory = ({ data }: { data: User[] }) => {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <RowPerPage table={table} />
    </div>
  );
};

export const Default: Story = {
    render: () => <TransactionTableStory data={generateTransactions(50)} />,
    parameters: {
        controls: { 
            exclude:['table']
         },
    docs: {
      description: {
        story: 'Default pagination controls with a transaction table showing 50 records.',
      },
    },
  },
};

export const SmallDataset: Story = {
  render: () => <TransactionTableStory data={generateTransactions(15)} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with a smaller dataset of 15 transactions.',
      },
    },
  },
};

export const LargeDataset: Story = {
  render: () => <TransactionTableStory data={generateTransactions(250)} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with a large dataset of 250 transactions to demonstrate pagination effectiveness.',
      },
    },
  },
};

export const UserTable: Story = {
  render: () => <UserTableStory data={generateUsers(75)} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with a user management table showing 75 users with 5 rows per page.',
      },
    },
  },
};

export const EmptyTable: Story = {
  render: () => <TransactionTableStory data={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls with an empty table to show how it handles no data.',
      },
    },
  },
};

export const SinglePage: Story = {
  render: () => <TransactionTableStory data={generateTransactions(3)} />,
  parameters: {
    docs: {
      description: {
        story: 'Pagination controls when all data fits on a single page (3 records with 10 per page).',
      },
    },
  },
};
