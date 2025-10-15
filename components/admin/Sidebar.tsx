'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Package, 
  TrendingUp, 
  Receipt, 
  RotateCcw, 
  Users, 
  Store, 
  BarChart3, 
  Settings,
  Flame
} from "lucide-react"

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/stock", label: "Stock", icon: Package },
  { href: "/admin/sales", label: "Sales", icon: TrendingUp },
  { href: "/admin/expenses", label: "Expenses", icon: Receipt },
  { href: "/admin/refunds", label: "Refunds", icon: RotateCcw },
  { href: "/admin/employers", label: "Employers", icon: Users },
  { href: "/admin/shops", label: "Shops", icon: Store },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="h-full w-full bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <span className="font-bold text-lg">FlameTrack</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          FlameTrack Admin v1.0
        </div>
      </div>
    </aside>
  )
}
