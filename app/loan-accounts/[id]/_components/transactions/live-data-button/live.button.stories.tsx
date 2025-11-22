import { Button } from '@/components/primitives/button';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { expect, fn, within } from 'storybook/test';
import { LiveDataButton } from './live.button';

const meta: Meta<typeof LiveDataButton> = {
  title: 'Components/LiveDataButton',
  component: LiveDataButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
LiveDataButton is an interactive button component that controls live data updates.

**Clickability Tests:**
- All button states should be clickable
- Click events should fire console logs (check browser console)
- Button appearance should change based on state
- Multiple clicks should work consistently

**Testing Instructions:**
1. Click each button variant below
2. Open browser console to see click event logs
3. Verify button text and icons display correctly
4. Test multiple rapid clicks to ensure responsiveness
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    liveDataEnabled: {
      control: 'boolean',
      description: 'Whether live data updates are enabled',
    },
    isConnected: {
      control: 'boolean',
      description: 'Whether the connection is active',
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
  render: ({liveDataEnabled:_liveDataEnabled, isConnected:_isConnected}) => {
    const [liveDataEnabled, setLiveDataEnabled] = useState(_liveDataEnabled);
    const [isConnected, setIsConnected] = useState(_isConnected);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
      setClickCount(prev => prev + 1);
      setLiveDataEnabled(prev => !prev);
      console.log(`Button clicked ${clickCount + 1} times - Live data: ${!liveDataEnabled ? 'enabled' : 'disabled'}`);
    };

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Click count: {clickCount} | Live data: {liveDataEnabled ? 'enabled' : 'disabled'}
        </div>

        <LiveDataButton 
          liveDataEnabled={liveDataEnabled}
          isConnected={isConnected}
          onClick={handleClick}
        />
        <div className="flex gap-2 mt-4">
          <Button 
          variant={'ghost'}
            onClick={() => setIsConnected(prev => !prev)}
            className="cursor-pointer"
          >
            Toggle Connection ({isConnected ? 'connected' : 'disconnected'})
          </Button>
          <Button 
            variant={'ghost'}
            onClick={() => setClickCount(0)}
            className="cursor-pointer"
          >
            Reset Count
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with click counter and connection toggle. Check browser console for click logs.',
      },
    },
  },
};

// Static stories for different states
export const Connected_LiveEnabled: Story = {
  args: {
    liveDataEnabled: true,
    isConnected: true,
  },
    render: ({isConnected,liveDataEnabled:_liveDataEnabled})=>{
            const [liveDataEnabled, setLiveDataEnabled] = useState(_liveDataEnabled);
            return<LiveDataButton 
                liveDataEnabled={liveDataEnabled}
                isConnected={isConnected}
                onClick={()=>setLiveDataEnabled(prev=>!prev)}
                />
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);

        console.log('Interactive story loaded. Use the buttons to test clickability and state changes.');

        const liveButton = canvas.getByRole('button');
        await expect(liveButton).toBeVisible();
        const mockOnClick = fn();
        
        // Add event listener instead of overriding onclick
        liveButton.addEventListener('click', () => {
        mockOnClick();
        console.log('LiveDataButton clicked in Interactive story.');
        });

        // Simulate clicks and log results (remove await as click() is synchronous)
        liveButton.click();
        liveButton.click();
        liveButton.click();
        liveButton.click();

        console.log('Clicked the LiveDataButton 4 times. Check console logs for click event outputs.');

        await expect(mockOnClick).toHaveBeenCalledTimes(4);

        const content = liveButton.textContent;
        await expect(content).toContain('Pause live updates');
    },
  parameters: {
    docs: {
      description: {
        story: 'Button when live data is enabled and connected. Should show pause icon and "Pause live updates" text.',
      },
    },
  },
};

export const Connected_LiveDisabled: Story = {
  args: {
    liveDataEnabled: false,
    isConnected: true,
    onClick: () => console.log('✅ Click test passed - Live disabled state'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button when live data is disabled but connected. Should show play icon and "Live Updates Paused" text.',
      },
    },
  },
};

export const Disconnected: Story = {
  args: {
    liveDataEnabled: false,
    isConnected: false,
  },
      render: ({isConnected,liveDataEnabled:_liveDataEnabled})=>{
            const [liveDataEnabled, setLiveDataEnabled] = useState(_liveDataEnabled);
            return<LiveDataButton 
                liveDataEnabled={liveDataEnabled}
                isConnected={isConnected}
                onClick={()=>setLiveDataEnabled(prev=>!prev)}
                />
    },
    play: async ({ args, canvasElement }) => {
        const canvas = within(canvasElement);
        const liveButton = canvas.getByRole('button');
        await expect(liveButton).toBeVisible();
        await expect(liveButton).toHaveTextContent('Disconnected');
        await expect(liveButton).toHaveClass('bg-destructive');
        await expect(liveButton).toBeDisabled();
        const mockOnClick = fn();
        
        // Add event listener instead of overriding onclick
        liveButton.addEventListener('click', () => {
            mockOnClick();
        });

        // Simulate clicks and log results (remove await as click() is synchronous)
        liveButton.click();

        console.log('Clicked the LiveDataButton, but it should be disabled when disconnected.');

        await expect(mockOnClick).toHaveBeenCalledTimes(0);

    },
  parameters: {
    docs: {
      description: {
        story: 'Button when disconnected. Should show cloud-off icon and "Disconnected" text.',
      },
    },
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-32">Connected + Live:</span>
        <LiveDataButton 
          liveDataEnabled={true} 
          isConnected={true} 
          onClick={() => console.log('Live enabled clicked')} 
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-32">Connected + Paused:</span>
        <LiveDataButton 
          liveDataEnabled={false} 
          isConnected={true} 
          onClick={() => console.log('Live disabled clicked')} 
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium w-32">Disconnected:</span>
        <LiveDataButton 
          liveDataEnabled={false} 
          isConnected={false} 
          onClick={() => console.log('Disconnected clicked')} 
        />
      </div>
    </div>
  ),
};