import type { Employer, Expense, Order, Product, Refund, ShopName } from "./types"

export const SHOPS: ShopName[] = ["Flaming Bun", "Flaming Dough"]

const today = new Date()
const iso = (d: Date) => d.toISOString().slice(0, 10)
const daysAgo = (n: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() - n)
  return iso(d)
}

export const PRODUCTS: Product[] = [
  {
    id: "P-1001",
    name: "Classic Burger",
    category: "Burger",
    cost: 40,
    price: 80,
    quantity: 120,
    shop: "Flaming Bun",
    status: "In Stock",
  },
  {
    id: "P-1002",
    name: "Mushroom Jack",
    category: "Burger",
    cost: 48,
    price: 95,
    quantity: 16,
    shop: "Flaming Bun",
    status: "Low",
  },
  {
    id: "P-2001",
    name: "Cinnamon Roll",
    category: "Dessert",
    cost: 18,
    price: 45,
    quantity: 0,
    shop: "Flaming Dough",
    status: "Out",
  },
  {
    id: "P-2002",
    name: "Chocolate Donut",
    category: "Dessert",
    cost: 10,
    price: 30,
    quantity: 220,
    shop: "Flaming Dough",
    status: "In Stock",
  },
]

export const ORDERS: Order[] = Array.from({ length: 24 }).map((_, i) => {
  const shop = i % 2 === 0 ? "Flaming Bun" : "Flaming Dough"
  const amount = 60 + Math.round(Math.random() * 200)
  const profit = Math.round(amount * 0.3)
  const status: Order["status"] = i % 9 === 0 ? "Refunded" : i % 7 === 0 ? "Pending" : "Completed"
  return { id: `O-${1000 + i}`, shop, date: daysAgo(23 - i), amount, profit, status }
})

export const EXPENSES: Expense[] = [
  { id: "E-1", title: "Meat Supplier", category: "Ingredients", amount: 2100, date: daysAgo(6), shop: "Flaming Bun" },
  {
    id: "E-2",
    title: "Flour Supplier",
    category: "Ingredients",
    amount: 1200,
    date: daysAgo(5),
    shop: "Flaming Dough",
  },
  { id: "E-3", title: "Utilities", category: "Utilities", amount: 800, date: daysAgo(4), shop: "Flaming Dough" },
  { id: "E-4", title: "Staff Overtime", category: "Staff", amount: 650, date: daysAgo(3), shop: "Flaming Bun" },
]

export const REFUNDS: Refund[] = [
  {
    id: "R-1",
    orderId: "O-1003",
    product: "Classic Burger",
    shop: "Flaming Bun",
    quantity: 1,
    refundAmount: 80,
    date: daysAgo(8),
    reason: "Wrong item",
    status: "Restocked",
  },
  {
    id: "R-2",
    orderId: "O-1011",
    product: "Chocolate Donut",
    shop: "Flaming Dough",
    quantity: 2,
    refundAmount: 60,
    date: daysAgo(2),
    reason: "Stale",
    status: "Not",
  },
]

export const EMPLOYERS: Employer[] = [
  {
    id: "EM-1",
    name: "Ahmed Hossam",
    username: "ahossam",
    shop: "Flaming Bun",
    status: "Active",
    createdAt: daysAgo(30),
  },
  { id: "EM-2", name: "Marwa N.", username: "marwan", shop: "Flaming Dough", status: "Active", createdAt: daysAgo(18) },
  { id: "EM-3", name: "Omar Ali", username: "oali", shop: "Flaming Bun", status: "Inactive", createdAt: daysAgo(10) },
]

// Dashboard helpers
export const SALES_TREND = ORDERS.map((o) => ({ date: o.date, sales: o.amount, profit: o.profit })).sort((a, b) =>
  a.date.localeCompare(b.date),
)

export const SHOP_COMPARISON = SHOPS.map((shop) => {
  const totals = ORDERS.filter((o) => o.shop === shop).reduce(
    (acc, o) => ({ sales: acc.sales + o.amount, profit: acc.profit + o.profit }),
    { sales: 0, profit: 0 },
  )
  return { shop, ...totals }
})
