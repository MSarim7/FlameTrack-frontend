"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  Wallet,
  RotateCcw,
  Users,
  Store,
  FileText,
  Settings,
  Flame,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Stock", url: "/admin/stock", icon: Package },
  { title: "Sales", url: "/admin/sales", icon: TrendingUp },
  { title: "Expenses", url: "/admin/expenses", icon: Wallet },
  { title: "Refunds", url: "/admin/refunds", icon: RotateCcw },
  { title: "Employers", url: "/admin/employers", icon: Users },
  { title: "Shops", url: "/admin/shops", icon: Store },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const collapsed = state === "collapsed";

  const isActive = (url: string) => pathname === url;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#2D3053]`} collapsible="icon">
      <SidebarHeader className="border-b border-gray-600 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF7123]">
            <Flame className="h-6 w-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-white">FlameTrack</h2>
              <p className="text-xs text-gray-400">Admin Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs font-medium px-2 py-1">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive(item.url)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.url) 
                        ? 'bg-gray-700 text-[#FF7123]' 
                        : 'text-[#FF7123] hover:bg-gray-700 hover:text-[#FF7123]'
                      }
                    `}
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
