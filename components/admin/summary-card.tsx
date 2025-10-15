"use client"

import type React from "react"

import { Card } from "@/components/ui/card"

export function SummaryCard({
  title,
  value,
  sub,
  icon,
}: {
  title: string
  value: string
  sub?: string
  icon?: React.ReactNode
}) {
  return (
    <Card className="p-4 md:p-6 bg-card text-card-foreground rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl md:text-3xl font-semibold mt-1">{value}</div>
        {sub ? <div className="text-xs mt-1 text-muted-foreground">{sub}</div> : null}
      </div>
      {icon ? <div className="text-primary">{icon}</div> : null}
    </Card>
  )
}
