"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/stock", label: "Stock" },
  { href: "/admin/sales", label: "Sales" },
  { href: "/admin/expenses", label: "Expenses" },
  { href: "/admin/refunds", label: "Refunds" },
  { href: "/admin/employers", label: "Employers" },
  { href: "/admin/shops", label: "Shops" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
]

export function AdminShell({ children, title }: { children: React.ReactNode; title?: string }) {
  const pathname = usePathname()
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-primary" aria-hidden />
            <span className="font-semibold">FlameTrack Admin</span>
          </div>
          <nav className="hidden gap-1 md:flex">
            {nav.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/") ||
                (item.href === "/admin" && pathname === "/admin")
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">
        {title ? <h1 className="mb-6 text-xl font-semibold text-pretty">{title}</h1> : null}
        {children}
      </main>
    </div>
  )
}
