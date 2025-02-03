"use client"
import { Calendar, Home, Wallet, Search, Settings } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Arus Kas",
    url: "/arus-kas",
    icon: Wallet,
  },
  {
    title: "Kalender",
    url: "/kalender",
    icon: Calendar,
  },
  // {
  //   title: "Cari",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export function ShadSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="font-[family-name:var(--font-geist-sans)] pt-4 bg-white" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Simona</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href={item.url} className={`flex gap-2 items-center justify-center h-9 w-9 mx-auto rounded-md ${pathname == item.url ? 'bg-primary' : ''}`}>
                        <item.icon size={20} className={pathname == item.url ? 'text-slate-100' : 'text-slate-500'} />
                        {/* <span>{item.title}</span> */}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
