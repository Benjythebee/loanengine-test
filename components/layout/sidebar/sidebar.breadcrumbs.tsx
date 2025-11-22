'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/primitives/breadcrumb";
import { useIsMobile } from "@/hooks/use-mobile";
import { capitalize } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { type ReactElement } from "react";

export function AppSidebarBreadcrumbs() {
  const pathname = usePathname();

  const isMobile = useIsMobile();

  const routes = pathname.split("/").filter(Boolean);

  const isRoot = routes.length === 1;

  let fullHref = "";

  
  const breadcrumbsItems = React.useMemo(() => {
    const breadcrumbItems: ReactElement[] = [];
    let breadcrumbPage: ReactElement = <></>;
    
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      let href: string;

      href = `${fullHref}/${route}`;
      fullHref = href;

      if (i === routes.length-1) {
        breadcrumbPage = (
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalize(route)}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        breadcrumbItems.push(
          <React.Fragment key={href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={href}>{capitalize(route)}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        );
      }
    }

    return { breadcrumbItems, breadcrumbPage } as const;
  }, [routes, fullHref]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {isRoot && (
          <BreadcrumbItem>
            <BreadcrumbPage>/</BreadcrumbPage>
          </BreadcrumbItem>
        )}

        {!isMobile && breadcrumbsItems.breadcrumbItems}
        {breadcrumbsItems.breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
