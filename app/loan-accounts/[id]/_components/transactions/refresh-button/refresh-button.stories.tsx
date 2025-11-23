import { Button } from '@/components/primitives/button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { RefreshButton } from '.';

const meta: Meta<typeof RefreshButton> = {
  title: 'UI/Refresh Button',
  component: RefreshButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A Loading button indicator that also shows whether there are new live data updates available.
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    indicator: {
        control: 'number',
        description: 'Number of new live data updates available',
    },
    refreshing: {
      control: 'boolean',
      description: 'Whether the state is currently refreshing live data',
    },
    disabled: {
        control: 'boolean',
        description: 'Whether the button is disabled - will hide the button if true and no indicator or refreshing',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story demonstrating clickability
export const Interactive: Story = {
    args:{
        disabled:false,
        indicator:1
    },
  render: ({indicator:_indicator, refreshing:_refreshing, disabled:_disabled}) => {
    const [indicator, setIndicator] = useState(_indicator);
    const [refreshing, setRefreshing] = useState(_refreshing);
    const [disabled, setDisabled] = useState(_disabled);

    const handleClick = () => {
      console.log('Refresh button clicked');
    };
    console.log('Rendering Interactive story with state - disabled:', disabled, 'refreshing:', refreshing, 'indicator:', indicator);
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
            Disabled: {disabled ? 'yes' : 'no'} |
            Refreshing: {refreshing ? 'yes' : 'no'} |
            Indicator: {indicator || 0} |
        </div>

        <RefreshButton
            data-testid="interactive-refresh-button"
          indicator={indicator}
          refreshing={refreshing}
          disabled={disabled} 
          onClick={handleClick}
        />
        <div className="flex gap-2 mt-4">
          <Button 
          variant={'ghost'}
            onClick={() => setDisabled(!disabled)}
            className="cursor-pointer"
            data-testid="toggle-disabled-button"
          >
            Toggle Disabled
          </Button>
          <Button
            variant={'ghost'}
            onClick={() => setIndicator((prev) => (prev || 0) + 1)}
            className="cursor-pointer"
            data-testid="increment-indicator-button"
          >
            Increment Indicator
          </Button>
          <Button 
            variant={'ghost'}
            onClick={() => setIndicator(0)}
            className="cursor-pointer"
            data-testid="reset-indicator-button"
          >
            Reset Indicator
          </Button>
          <Button 
            variant={'ghost'}
            onClick={() => setRefreshing(!refreshing)}
            className="cursor-pointer"
            data-testid="toggle-refreshing-button"
          >
            Toggle Refreshing
          </Button>
        </div>
        
        <div className='w-1/2'><p className='text-muted-foreground justify-center'>
            This button should be hidden when there is no indicator and not refreshing while disabled is true.
            It is visibile when it is showing loading state or an indicator count.
            </p></div>

      </div>
    );
  },
  play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByTestId('interactive-refresh-button');
        await expect(button).toBeVisible();
        await expect(button).not.toBeDisabled();
        await expect(button).toHaveTextContent((args.indicator||0).toString());
        const mockOnClick = fn();
        
        // Add event listener instead of overriding onclick
        button.addEventListener('click', () => {
            mockOnClick();
        });

        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // // Simulate clicks and log results (remove await as click() is synchronous)
        button.click();
        await expect(mockOnClick).toHaveBeenCalledTimes(1);

        const toggleDisabledButton = canvas.getByTestId('toggle-disabled-button');
        toggleDisabledButton.click();
        await sleep(0); // Wait for state update
        await expect(button).toBeDisabled();


        const toggleRefreshingButton = canvas.getByTestId('toggle-refreshing-button');
        toggleRefreshingButton.click();
        await sleep(0); // Wait for state update
        await expect(button).toBeDisabled();
        await expect(button).toHaveTextContent('Refreshing');

        // Toggle refreshing off
        toggleRefreshingButton.click();
        toggleDisabledButton.click();

        const incrementIndicatorButton = canvas.getByTestId('increment-indicator-button');
        incrementIndicatorButton.click();
        await sleep(0); // Wait for state update
        await expect(button).toHaveTextContent('2');

        const resetIndicatorButton = canvas.getByTestId('reset-indicator-button');
        resetIndicatorButton.click();
        await sleep(0); // Wait for state update
        await expect(button).toHaveClass('opacity-0');

        incrementIndicatorButton.click();
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click counter and state toggles for disabled, refreshing, and indicator props.',
      },
    },
  },
};


export const RefreshingState: Story = {
    args:{
        disabled:false,
        indicator:0,
        refreshing:true
    }
}

export const IndicatorState: Story = {
    args:{
        disabled:false,
        indicator:5,
        refreshing:false
    }
}