"use client"

import type { Order } from "@/types"

export function OrdersTable({ data }: { data: Order[] }) {
  return (
    <div className="overflow-x-auto border rounded-md">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <Th>Order ID</Th>
            <Th>Shop</Th>
            <Th>Date</Th>
            <Th className="text-right">Amount</Th>
            <Th className="text-right">Profit</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((o) => (
            <tr key={o.id} className="border-t">
              <Td>{o.id}</Td>
              <Td>{o.shop}</Td>
              <Td>{o.date}</Td>
              <Td className="text-right">{o.amount.toFixed(0)}</Td>
              <Td className="text-right">{o.profit.toFixed(0)}</Td>
              <Td>
                <span className="px-2 py-0.5 rounded-full text-xs bg-secondary/20">{o.status}</span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children, className = "" }: any) {
  return <th className={`px-3 py-2 text-left font-medium text-muted-foreground ${className}`}>{children}</th>
}
function Td({ children, className = "" }: any) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>
}
