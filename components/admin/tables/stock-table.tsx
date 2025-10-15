"use client"

import { useMemo, useState } from "react"
import type { Product, ShopName } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function StockTable({
  initial,
  onChange,
}: {
  initial: Product[]
  onChange?: (next: Product[]) => void
}) {
  const [rows, setRows] = useState<Product[]>(initial)
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState<{
    shop: "All" | ShopName
    level: "All" | Product["status"]
    category: "All" | string
  }>({
    shop: "All",
    level: "All",
    category: "All",
  })
  const [editing, setEditing] = useState<Product | null>(null)

  const categories = useMemo(() => Array.from(new Set(rows.map((r) => r.category))), [rows])

  const filtered = rows.filter((r) => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
    if (filters.shop !== "All" && r.shop !== filters.shop) return false
    if (filters.level !== "All" && r.status !== filters.level) return false
    if (filters.category !== "All" && r.category !== filters.category) return false
    return true
  })

  function commit(next: Product[]) {
    setRows(next)
    onChange?.(next)
  }

  function save(p: Product) {
    const exists = rows.findIndex((x) => x.id === p.id)
    const next = [...rows]
    if (exists >= 0) next[exists] = p
    else next.unshift({ ...p, id: `P-${Math.floor(Math.random() * 9000) + 1000}` })
    commit(next)
    setEditing(null)
  }

  function del(id: string) {
    if (!confirm("Delete product?")) return
    commit(rows.filter((r) => r.id !== id))
  }

  return (
    <Card className="p-4 space-y-3">
      <div className="grid gap-2 md:grid-cols-5">
        <input
          placeholder="Search products..."
          className="h-9 rounded-md border bg-background px-3 md:col-span-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="h-9 rounded-md border bg-background px-3"
          value={filters.shop}
          onChange={(e) => setFilters((s) => ({ ...s, shop: e.target.value as any }))}
        >
          <option>All</option>
          <option>Flaming Bun</option>
          <option>Flaming Dough</option>
        </select>
        <select
          className="h-9 rounded-md border bg-background px-3"
          value={filters.category}
          onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value as any }))}
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          className="h-9 rounded-md border bg-background px-3"
          value={filters.level}
          onChange={(e) => setFilters((s) => ({ ...s, level: e.target.value as any }))}
        >
          <option>All</option>
          <option>In Stock</option>
          <option>Low</option>
          <option>Out</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Button
          onClick={() =>
            setEditing({
              id: "",
              name: "",
              category: "",
              cost: 0,
              price: 0,
              quantity: 0,
              shop: "Flaming Bun",
              status: "In Stock",
            })
          }
        >
          Add Product
        </Button>
        <Button variant="secondary" onClick={() => alert("Downloading stock report...")}>
          Download Stock Report
        </Button>
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <Th>Product ID</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th className="text-right">Cost</Th>
              <Th className="text-right">Price</Th>
              <Th className="text-right">Qty</Th>
              <Th>Shop</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-t">
                <Td>{r.id}</Td>
                <Td>{r.name}</Td>
                <Td>{r.category}</Td>
                <Td className="text-right">{r.cost}</Td>
                <Td className="text-right">{r.price}</Td>
                <Td className="text-right">{r.quantity}</Td>
                <Td>{r.shop}</Td>
                <Td>{r.status}</Td>
                <Td className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setEditing(r)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => del(r.id)}>
                    Delete
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing ? <EditModal value={editing} onClose={() => setEditing(null)} onSave={save} /> : null}
    </Card>
  )
}

function Th({ children, className = "" }: any) {
  return <th className={`px-3 py-2 text-left font-medium text-muted-foreground ${className}`}>{children}</th>
}
function Td({ children, className = "" }: any) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>
}

function EditModal({ value, onSave, onClose }: { value: Product; onSave: (p: Product) => void; onClose: () => void }) {
  const [p, setP] = useState<Product>(value)
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-md bg-background border p-4 space-y-3">
        <h3 className="text-lg font-semibold">{value.id ? "Edit Product" : "Add Product"}</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <Text label="Name" value={p.name} onChange={(v) => setP({ ...p, name: v })} />
          <Text label="Category" value={p.category} onChange={(v) => setP({ ...p, category: v })} />
          <Number label="Cost" value={p.cost} onChange={(v) => setP({ ...p, cost: v })} />
          <Number label="Price" value={p.price} onChange={(v) => setP({ ...p, price: v })} />
          <Number label="Quantity" value={p.quantity} onChange={(v) => setP({ ...p, quantity: v })} />
          <Select
            label="Shop"
            value={p.shop}
            options={["Flaming Bun", "Flaming Dough"]}
            onChange={(v) => setP({ ...p, shop: v as ShopName })}
          />
          <Select
            label="Status"
            value={p.status}
            options={["In Stock", "Low", "Out"]}
            onChange={(v) => setP({ ...p, status: v as any })}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(p)}>Save</Button>
        </div>
      </div>
    </div>
  )
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        className="h-9 rounded-md border bg-background px-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}
function Number({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <input
        type="number"
        className="h-9 rounded-md border bg-background px-3"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
function Select({
  label,
  value,
  options,
  onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="grid gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <select
        className="h-9 rounded-md border bg-background px-3"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}
