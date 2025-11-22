import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';
import { Badge } from '../badge';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';

const meta: Meta<typeof Table> = {
  title: 'Primitives/Table',
  component: Table,
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

// Sample data for stories
const invoices = [
  {
    id: 'INV001',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$250.00',
  },
  {
    id: 'INV002',
    status: 'Pending',
    method: 'PayPal',
    amount: '$150.00',
  },
  {
    id: 'INV003',
    status: 'Unpaid',
    method: 'Bank Transfer',
    amount: '$350.00',
  },
  {
    id: 'INV004',
    status: 'Paid',
    method: 'Credit Card',
    amount: '$450.00',
  },
  {
    id: 'INV005',
    status: 'Paid',
    method: 'PayPal',
    amount: '$550.00',
  },
];

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'User',
    status: 'Inactive',
  },
];

// Basic table
export const Default: Story = {
    parameters:{
        controls:{
            exclude:['table']
        }
    },
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Table with footer
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>Monthly revenue breakdown.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Month</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">January</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">February</TableCell>
          <TableCell className="text-right">$3,200.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">March</TableCell>
          <TableCell className="text-right">$2,800.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">$8,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// Table with badges and status
export const WithBadges: Story = {
  render: () => (
    <Table>
      <TableCaption>Invoice status overview.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === 'Paid'
                    ? 'default'
                    : invoice.status === 'Pending'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Interactive table with checkboxes and actions
export const Interactive: Story = {
  render: () => (
    <Table>
      <TableCaption>User management table with actions.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <Checkbox />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Sortable table headers
export const Sortable: Story = {
  render: () => (
    <Table>
      <TableCaption>Sortable data table.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" className="h-auto p-0 font-medium">
              Invoice
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" className="h-auto p-0 font-medium">
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">
            <Button variant="ghost" className="h-auto p-0 font-medium">
              Amount
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>
              <Badge
                variant={
                  invoice.status === 'Paid'
                    ? 'default'
                    : invoice.status === 'Pending'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell>{invoice.method}</TableCell>
            <TableCell className="text-right">{invoice.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <Table>
      <TableCaption>No data available.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
            No results found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Minimal table without caption
export const Minimal: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Apple</TableCell>
          <TableCell>$1.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Banana</TableCell>
          <TableCell>$0.50</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Orange</TableCell>
          <TableCell>$0.75</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// Large table with many columns
export const WideTable: Story = {
  render: () => (
    <Table>
      <TableCaption>Product inventory with detailed information.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">PRD001</TableCell>
          <TableCell>Wireless Headphones</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>TechCorp</TableCell>
          <TableCell>25</TableCell>
          <TableCell>$99.99</TableCell>
          <TableCell>
            <Badge variant="default">In Stock</Badge>
          </TableCell>
          <TableCell>2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PRD002</TableCell>
          <TableCell>Gaming Mouse</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>GameTech</TableCell>
          <TableCell>12</TableCell>
          <TableCell>$49.99</TableCell>
          <TableCell>
            <Badge variant="secondary">Low Stock</Badge>
          </TableCell>
          <TableCell>2024-01-14</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">PRD003</TableCell>
          <TableCell>Mechanical Keyboard</TableCell>
          <TableCell>Electronics</TableCell>
          <TableCell>KeyMaster</TableCell>
          <TableCell>0</TableCell>
          <TableCell>$129.99</TableCell>
          <TableCell>
            <Badge variant="destructive">Out of Stock</Badge>
          </TableCell>
          <TableCell>2024-01-13</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};