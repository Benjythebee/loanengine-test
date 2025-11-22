import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from './card';
import { Button } from '../button';
import { Badge } from '../badge';
import { Bell, MoreHorizontal } from 'lucide-react';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
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

export const Default: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          You have 3 unread messages.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Bell />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardContent>
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const ProjectCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Next.js Project</CardTitle>
        <CardDescription>
          A modern React framework for production
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Active</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last updated</span>
          <span>2 hours ago</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          View
        </Button>
        <Button size="sm">
          Deploy
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">$45,231.89</CardTitle>
        <CardDescription>
          +20.1% from last month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          Total Revenue
        </div>
      </CardContent>
    </Card>
  ),
};

export const CardShowcase: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>Simple card example</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content here</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>With Action</CardTitle>
          <CardDescription>Card with header action</CardDescription>
          <CardAction>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Content with action</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>With Footer</CardTitle>
          <CardDescription>Card with footer actions</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content here</p>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};