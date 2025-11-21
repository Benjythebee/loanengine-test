"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail, useSidebar } from '@/context/sidebar-provider'
// import { AppTitle } from './app-title'

import { ChevronRight, Command, GalleryVerticalEnd, LayoutDashboard, LucideBanknote, LucideCoins, LucideHelpCircle, LucideLandmark, LucideUser2, LucideUserCog2 } from 'lucide-react'


import type { ReactNode } from 'react'
import { AppTitle } from '../title/title'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/primitives/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/primitives/dropdown-menu'
import { Badge } from '@/components/primitives/badge'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

type BaseNavItem = {
  name: string
  badge?: string
  icon?: React.ElementType
}
type NavLink = BaseNavItem & {
  url: LinkProps['href'] | (string & {})
  items?: NavLink[]
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['href'] | (string & {}) })[]
  url?: string
}

type NavItem = NavCollapsible | NavLink

// Type guard to check if item is NavCollapsible
function isNavCollapsible(item: NavItem): item is NavCollapsible {
  return 'items' in item && Array.isArray(item.items)
}

export type SidebarData = {
    navs: NavItem[]
}


export const sidebarData:SidebarData = {
  navs: [
        {
          name: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          name: 'Loan Accounts',
          url: '/loan/accounts',
          icon: LucideBanknote,
        },
        {
          name: 'Loan Products',
          url: '/loan/products',
          icon: LucideLandmark,
        },
        {
          name: 'Entities',
          url: '/entities',
          badge: '3',
          icon: LucideUser2,
        },
        {
          name: 'Accounting & Banking',
          url: '/accounting-banking',
          icon: LucideLandmark,
        },
        {
          name: 'Users',
          icon: LucideUserCog2,
        url: '/users',
        },
        {
            name: 'Org Settings',
            icon: LucideCoins,
            url: '/org-settings',
        },{
            name: 'Help & Support',
            icon: LucideHelpCircle,
            url: '/help-support',
        }
      ]
}

export function AppSidebar() {
const { state, isMobile } = useSidebar()
const href = usePathname()
  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader>
        <AppTitle />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {sidebarData.navs.map((item) => {
                    const key = `${item.name}-${item.url}`

                    if (!isNavCollapsible(item))
                        return <SidebarMenuLink key={key} item={item} href={href} />

                    if (state === 'collapsed' && !isMobile)
                        return (
                        <SidebarMenuCollapsedDropdown key={key} item={item} href={href} />
                        )

                    return <SidebarMenuCollapsible key={key} item={item} href={href} />
                })}
            </SidebarMenu>
      </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={sidebarData.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function NavBadge({ children }: { children: ReactNode }) {
  return <Badge className='rounded-full px-1 py-0 text-xs'>{children}</Badge>
}

function SidebarMenuLink({ item, href }: { item: NavLink; href: string }) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={checkIsActive(href, item)}
        tooltip={item.name}
      >
        <Link href={item.url} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.name}</span>
          {item.badge && <NavBadge>{item.badge}</NavBadge>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarMenuCollapsible({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) {
  const { setOpenMobile } = useSidebar()
  return (
    <Collapsible
      asChild
      defaultOpen={checkIsActive(href, item, true)}
      className='group/collapsible'
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.name}>
            {item.icon && <item.icon />}
            <span>{item.name}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className='CollapsibleContent'>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.name}>
                <SidebarMenuSubButton
                  asChild
                  isActive={checkIsActive(href, subItem)}
                >
                  <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                    {subItem.icon && <subItem.icon />}
                    <span>{subItem.name}</span>
                    {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
function SidebarMenuCollapsedDropdown({
  item,
  href,
}: {
  item: NavCollapsible
  href: string
}) {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            tooltip={item.name}
            isActive={checkIsActive(href, item)}
          >
            {item.icon && <item.icon />}
            <span>{item.name}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <ChevronRight className='ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='right' align='start' sideOffset={4}>
          <DropdownMenuLabel>
            {item.name} {item.badge ? `(${item.badge})` : ''}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => (
            <DropdownMenuItem key={`${sub.name}-${sub.url}`} asChild>
              <Link
                href={sub.url}
                className={`${checkIsActive(href, sub) ? 'bg-secondary' : ''}`}
              >
                {sub.icon && <sub.icon />}
                <span className='max-w-52 text-wrap'>{sub.name}</span>
                {sub.badge && (
                  <span className='ms-auto text-xs'>{sub.badge}</span>
                )}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {

  if(typeof item?.url === 'undefined') return false
  if(typeof item.url === 'object') {
    return item.url.pathname === href
  }
  
  return (
    href === item.url || // /endpint?search=param
    href.split('?')[0] === item.url || // endpoint
    !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
    (mainNav &&
      href.split('/')[1] !== '' &&
      href.split('/')[1] === item?.url?.split('/')[1])
  )
}