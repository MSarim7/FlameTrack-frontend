interface Shop {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  category: string
  cost: number
  price: number
  qty: number
  shopId: string
  status: string
}

interface Order {
  id: string
  shopId: string
  date: string
  total: number
  profit: number
  status: string
}

interface Expense {
  id: string
  title: string
  category: string
  amount: number
  date: string
  shopId: string
}

interface Refund {
  id: string
  orderId: string
  product: string
  qty: number
  amount: number
  date: string
  shopId: string
  reason: string
  status: string
}

interface Employer {
  id: string
  name: string
  username: string
  shopId: string
  status: string
  created: string
}

export const shops: Shop[] = [
  { id: "shop-1", name: "Flaming Bun" },
  { id: "shop-2", name: "Flaming Dough" },
]

export const categories = ["Burgers", "Sides", "Drinks", "Desserts"]
export const expenseCategories = ["Rent", "Salaries", "Utilities", "Supplies", "Marketing"]

const today = new Date()
const d = (i: number) => {
  const dt = new Date(today)
  dt.setDate(today.getDate() - i)
  return dt.toISOString().slice(0, 10)
}

export const products: Product[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  name: `Product ${i + 1}`,
  category: categories[i % categories.length],
  cost: 2 + (i % 5),
  price: 5 + (i % 7),
  qty: 10 + (i % 25),
  shopId: shops[i % shops.length].id,
  status: i % 3 === 0 ? "Low" : i % 5 === 0 ? "Out" : "In Stock",
}))

export const orders: Order[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `ord-${1000 + i}`,
  shopId: shops[i % shops.length].id,
  date: d(i),
  total: 15 + (i % 10) * 3,
  profit: 6 + (i % 8) * 2,
  status: i % 7 === 0 ? "Refunded" : "Paid",
}))

export const expenses: Expense[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `exp-${i + 1}`,
  title: `Expense ${i + 1}`,
  category: expenseCategories[i % expenseCategories.length],
  amount: 50 + (i % 10) * 25,
  date: d(i),
  shopId: shops[i % shops.length].id,
}))

export const refunds: Refund[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `ref-${i + 1}`,
  orderId: orders[i % orders.length].id,
  product: `Product ${1 + (i % 10)}`,
  qty: 1 + (i % 3),
  amount: 5 + (i % 4) * 3,
  date: d(i),
  shopId: shops[i % shops.length].id,
  reason: ["Damaged", "Wrong Item", "Customer Request"][i % 3],
  status: i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected",
}))

export const employers: Employer[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `emp-${i + 1}`,
  name: `Employee ${i + 1}`,
  username: `user${i + 1}`,
  shopId: shops[i % shops.length].id,
  status: i % 4 === 0 ? "Inactive" : "Active",
  created: d(30 - i),
}))

// Helpers
export const categoriesByShop = (shopId?: string) =>
  products
    .filter((p) => !shopId || p.shopId === shopId)
    .reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    }, {})

export const getProductById = (id: string) => products.find((p) => p.id === id)
export const updateProduct = (id: string, patch: Partial<Product>) => {
  const i = products.findIndex((p) => p.id === id)
  if (i >= 0) products[i] = { ...products[i], ...patch }
}
export const addProduct = (p: Product) => products.unshift({ ...p, id: `prod-${products.length + 1}` })
export const deleteProduct = (id: string) => {
  const i = products.findIndex((p) => p.id === id)
  if (i >= 0) products.splice(i, 1)
}

export const getExpenseById = (id: string) => expenses.find((e) => e.id === id)
export const updateExpense = (id: string, patch: Partial<Expense>) => {
  const i = expenses.findIndex((e) => e.id === id)
  if (i >= 0) expenses[i] = { ...expenses[i], ...patch }
}
export const addExpense = (e: Expense) => expenses.unshift({ ...e, id: `exp-${expenses.length + 1}` })
export const deleteExpense = (id: string) => {
  const i = expenses.findIndex((e) => e.id === id)
  if (i >= 0) expenses.splice(i, 1)
}

export const getRefundById = (id: string) => refunds.find((r) => r.id === id)
export const updateRefund = (id: string, patch: Partial<Refund>) => {
  const i = refunds.findIndex((r) => r.id === id)
  if (i >= 0) refunds[i] = { ...refunds[i], ...patch }
}
export const addRefund = (r: Refund) => refunds.unshift({ ...r, id: `ref-${refunds.length + 1}` })
export const deleteRefund = (id: string) => {
  const i = refunds.findIndex((r) => r.id === id)
  if (i >= 0) refunds.splice(i, 1)
}

export const getEmployerById = (id: string) => employers.find((e) => e.id === id)
export const updateEmployer = (id: string, patch: Partial<Employer>) => {
  const i = employers.findIndex((e) => e.id === id)
  if (i >= 0) employers[i] = { ...employers[i], ...patch }
}
export const addEmployer = (e: Employer) => employers.unshift({ ...e, id: `emp-${employers.length + 1}` })
export const deleteEmployer = (id: string) => {
  const i = employers.findIndex((e) => e.id === id)
  if (i >= 0) employers.splice(i, 1)
}

export const shopById = (id: string) => shops.find((s) => s.id === id)

export const shopMetrics = (shopId: string) => {
  const os = orders.filter((o) => o.shopId === shopId)
  return {
    totalSales: os.reduce((a, b) => a + b.total, 0),
    profit: os.reduce((a, b) => a + b.profit, 0),
    orders: os.length,
    refunds: refunds.filter((r) => r.shopId === shopId).length,
  }
}
