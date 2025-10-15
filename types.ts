export type ShopName = "Flaming Bun" | "Flaming Dough"

export type OrderStatus = "Completed" | "Refunded" | "Pending"

export interface Order {
  id: string
  shop: ShopName
  date: string // ISO
  amount: number
  profit: number
  status: OrderStatus
  items?: Array<{ productId: string; name: string; qty: number; price: number }>
}

export interface Product {
  id: string
  name: string
  category: string
  cost: number
  price: number
  quantity: number
  shop: ShopName
  status: "In Stock" | "Low" | "Out"
}

export interface Expense {
  id: string
  title: string
  category: string
  amount: number
  date: string // ISO
  shop: ShopName
}

export interface Refund {
  id: string
  orderId: string
  product: string
  shop: ShopName
  quantity: number
  refundAmount: number
  date: string // ISO
  reason: string
  status: "Restocked" | "Not"
}

export interface Employer {
  id: string
  name: string
  username: string
  shop: ShopName
  status: "Active" | "Inactive"
  createdAt: string // ISO
}
