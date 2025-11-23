import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LoanIDProvider } from '../../../id-provider';
import { AddTXDialog } from './add-dialog';


const meta: Meta<typeof AddTXDialog> = {
  title: 'UI/Dialog/Add Button',
  component: AddTXDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
        <LoanIDProvider loanID="test-loan-123">
          <Story />
        </LoanIDProvider>
    ),
  ],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DialogOpened: Story = {
  args: {
    disabled: false,
    isOpen: true,
    defaultOpen: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
