"use client";

import { SidebarProvider } from "@/context/sidebar-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

interface ProvidersProps {
  /**
   * The default open state of the sidebar
   */
  defaultOpen: boolean;
}

export const Providers = (props: React.PropsWithChildren<ProvidersProps>) => {
  const { defaultOpen, children } = props;
  
  // Create a new QueryClient instance for each component instance
  // This prevents SSR/hydration mismatches
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  }));

  return (
    <ThemeProvider
    attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <QueryClientProvider client={queryClient} >
        <SidebarProvider defaultOpen={defaultOpen}>
          {children}
        </SidebarProvider>
      </QueryClientProvider>

    </ThemeProvider>
  );
};
