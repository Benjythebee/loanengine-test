import type { Metadata } from "next";
import { cookies as nextCookies } from "next/headers";
import "../styles/globals.css";
import { MediaQuery } from "@/components/debug/media-query";
import { Providers } from "./providers";
import { AppSidebar } from "@/components/layout/sidebar/sidebar";
import { SidebarInset } from "@/context/sidebar-provider";
import { Header } from "@/components/layout/header/header";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Main } from "@/components/layout/main/main";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/primitives/separator";
import { AppSidebarBreadcrumbs } from "@/components/layout/sidebar/sidebar.breadcrumbs";
export const metadata: Metadata = {
  title: {
    default: 'loan-engine-ui',
    template: `%s - loan-engine-test`,
  },
  description: 'example-loan-engine-ui',
};

const RootLayout = async ({ children }: React.PropsWithChildren) => {
    const cookies = await nextCookies();
  const defaultOpen = cookies.get("sidebar_state")?.value === "true";


  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers defaultOpen={defaultOpen}>

          <AppSidebar />
          <SidebarInset
                className={cn(
                  // Set content container, so we can use container queries
                  '@container/content',

                  // If layout is fixed, set the height
                  // to 100svh to prevent overflow
                  'has-data-[layout=fixed]:h-svh',

                  // If layout is fixed and sidebar is inset,
                  // set the height to 100svh - spacing (total margins) to prevent overflow
                  'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
                )}
              >
            {/* ===== Top Heading ===== */}
            <Header>
              <div className='ms-auto flex items-center gap-4'>
                <ThemeSwitch />
                <ProfileDropdown />
              </div>
            </Header>

            {/* ===== Content ===== */}
            <Main >
            <AppSidebarBreadcrumbs />
              {children}
            </Main>
            </SidebarInset>

          <MediaQuery />

        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
