import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { Label } from '../label';
import { Search, Mail, Eye, EyeOff, Calendar } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    readOnly: true,
  },
};

export const Password: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="relative w-full max-w-sm">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          className="pr-10"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-gray-400" />
          ) : (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-8" />
    </div>
  ),
};

export const FormExamples: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="grid items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="John Doe" />
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="email" id="email" placeholder="john@example.com" className="pl-8" />
        </div>
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input type="tel" id="phone" placeholder="+1 (555) 123-4567" />
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label htmlFor="date">Date</Label>
        <div className="relative">
          <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="date" id="date" className="pl-8" />
        </div>
      </div>
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
      <Input type="search" placeholder="Search input" />
      <Input type="date" />
      <Input type="time" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-sm">
      <div className="grid items-center gap-1.5">
        <Label>Normal</Label>
        <Input placeholder="Normal input" />
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label>Focused (click to focus)</Label>
        <Input placeholder="Focus me" autoFocus />
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label>Disabled</Label>
        <Input placeholder="Disabled input" disabled />
      </div>
      
      <div className="grid items-center gap-1.5">
        <Label>With Error (aria-invalid)</Label>
        <Input placeholder="Invalid input" aria-invalid />
      </div>
    </div>
  ),
};