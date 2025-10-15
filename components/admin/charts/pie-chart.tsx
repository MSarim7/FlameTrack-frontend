"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts"

const COLORS = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--muted))", "hsl(var(--accent))"]

export function SimplePieChart({
  data,
  dataKey = "value",
  nameKey = "name",
}: { data: any[]; dataKey?: string; nameKey?: string }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={100} label>
            {data.map((_: any, i: number) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
