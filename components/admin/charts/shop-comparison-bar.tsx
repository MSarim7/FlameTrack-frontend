"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ShopComparisonBar({ data }: { data: Array<{ shop: string; sales: number; profit: number }> }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="shop" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="hsl(var(--primary))" />
          <Bar dataKey="profit" fill="hsl(var(--secondary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
