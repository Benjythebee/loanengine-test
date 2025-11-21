"use client";

import { SidebarProvider } from "@/context/sidebar-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

interface ProvidersProps {
  /**
   * The default open state of the sidebar
   */
  defaultOpen: boolean;
}

export const Providers = (props: React.PropsWithChildren<ProvidersProps>) => {
  const { defaultOpen, children } = props;

  return (
    <ThemeProvider
    attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <QueryClientProvider client={queryClient}>
        <SidebarProvider defaultOpen={defaultOpen}>
          {children}
        </SidebarProvider>
      </QueryClientProvider>

    </ThemeProvider>
  );
};
