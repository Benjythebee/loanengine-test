import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import type { ReactRenderer } from "@storybook/nextjs-vite"; 
import { DecoratorFunction } from 'storybook/internal/types';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, refetchOnMount: true } },
});

export const withQueryProvider: DecoratorFunction<ReactRenderer> = (Story, context) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Story />
        </QueryClientProvider>
    );
};