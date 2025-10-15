"use client"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { orders, shops } from "@/lib/mockData"

const totals = shops.map((s) => ({
  name: s.name,
  total: orders.filter((o) => o.shopId === s.id).reduce((a, b) => a + b.total, 0),
}))

export function ShopComparisonBar() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={totals}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
