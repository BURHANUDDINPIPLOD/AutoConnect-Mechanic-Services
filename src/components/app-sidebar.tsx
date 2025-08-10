'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Car, HelpCircle, Home, MessageSquare, User, Wrench } from 'lucide-react'

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/request-service', label: 'Request Service', icon: Wrench },
    { href: '/chat', label: 'Chat', icon: MessageSquare },
    { href: '/help', label: 'Help', icon: HelpCircle },
  ]

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Car className="size-8 text-primary" />
          <h1 className="text-xl font-bold">AutoConnect</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === '/profile'} tooltip="Profile">
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
