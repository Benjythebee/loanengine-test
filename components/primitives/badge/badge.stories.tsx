import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';
import { CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">
        <CheckCircle className="w-3 h-3" />
        Active
      </Badge>
      <Badge variant="secondary">
        <Clock className="w-3 h-3" />
        Pending
      </Badge>
      <Badge variant="destructive">
        <XCircle className="w-3 h-3" />
        Error
      </Badge>
      <Badge variant="outline">
        <AlertCircle className="w-3 h-3" />
        Warning
      </Badge>
    </div>
  ),
};

// Status badges example
export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">In Progress</Badge>
      <Badge variant="outline">Review</Badge>
      <Badge variant="destructive">Rejected</Badge>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Numbers and counts
export const WithNumbers: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Badge variant="default">99+</Badge>
      <Badge variant="secondary">12</Badge>
      <Badge variant="outline">3</Badge>
      <Badge variant="destructive">!</Badge>
    </div>
  ),
};