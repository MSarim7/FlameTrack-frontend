"use client"

import { SHOPS } from "@/mockData"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export type FilterState = {
  shop: "All" | (typeof SHOPS)[number]
  from?: string
  to?: string
}

export function FilterBar({
  state,
  onChange,
  onApply,
}: {
  state: FilterState
  onChange: (next: Partial<FilterState>) => void
  onApply?: () => void
}) {
  return (
    <Card className="p-3 md:p-4 bg-card">
      <div className="grid gap-3 md:grid-cols-4 items-end">
        <label className="grid gap-1">
          <span className="text-xs text-muted-foreground">Shop</span>
          <select
            className="h-9 rounded-md border bg-background px-3"
            value={state.shop}
            onChange={(e) => onChange({ shop: e.target.value as FilterState["shop"] })}
          >
            <option>All</option>
            {SHOPS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-muted-foreground">From</span>
          <input
            type="date"
            className="h-9 rounded-md border bg-background px-3"
            value={state.from || ""}
            onChange={(e) => onChange({ from: e.target.value })}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-muted-foreground">To</span>
          <input
            type="date"
            className="h-9 rounded-md border bg-background px-3"
            value={state.to || ""}
            onChange={(e) => onChange({ to: e.target.value })}
          />
        </label>
        <div className="flex gap-2">
          <Button onClick={onApply} className="h-9">
            Apply
          </Button>
          <Button
            variant="outline"
            className="h-9 bg-transparent"
            onClick={() => onChange({ shop: "All", from: "", to: "" })}
          >
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}
