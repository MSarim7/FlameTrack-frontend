declare type Shop = {
  id: string
  name: string
}
declare type Product = {
  id: string
  name: string
  category: string
  cost: number
  price: number
  qty: number
  shopId: string
  status: "In Stock" | "Low" | "Out"
}
declare type Order = {
  id: string
  shopId: string
  date: string
  total: number
  profit: number
  status: "Paid" | "Pending" | "Refunded"
}
declare type Expense = {
  id: string
  title: string
  category: string
  amount: number
  date: string
  shopId: string
}
declare type Refund = {
  id: string
  orderId: string
  product: string
  qty: number
  amount: number
  date: string
  shopId: string
  reason: string
  status: "Approved" | "Pending" | "Rejected"
}
declare type Employer = {
  id: string
  name: string
  username: string
  shopId: string
  status: "Active" | "Inactive"
  created: string
}
