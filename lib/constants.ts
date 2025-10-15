// Application constants

export const APP_NAME = 'FlameTrack'
export const APP_VERSION = '1.0.0'

// Shop names
export const SHOP_NAMES = {
  FLAMING_BUN: 'Flaming Bun',
  FLAMING_DOUGH: 'Flaming Dough',
} as const

// Product categories
export const PRODUCT_CATEGORIES = [
  'Burgers',
  'Sides', 
  'Drinks',
  'Desserts'
] as const

// Expense categories
export const EXPENSE_CATEGORIES = [
  'Rent',
  'Salaries',
  'Utilities',
  'Supplies',
  'Marketing'
] as const

// Order statuses
export const ORDER_STATUSES = [
  'Paid',
  'Pending',
  'Refunded'
] as const

// Product statuses
export const PRODUCT_STATUSES = [
  'In Stock',
  'Low',
  'Out'
] as const

// Refund statuses
export const REFUND_STATUSES = [
  'Approved',
  'Pending',
  'Rejected'
] as const

// Employer statuses
export const EMPLOYER_STATUSES = [
  'Active',
  'Inactive'
] as const
