"use client";

import { useParams } from "next/navigation";
import StockEditForm, { StockItem } from "@/src/app/admin/stock/_components/StockEditForm";

// Mock data - same as in mainPage.tsx
const mockStockData: StockItem[] = [
  {
    id: "1",
    itemName: "Beef Patties",
    category: "Meat",
    description: "Premium beef patties",
    unitType: "kg",
    quantity: 45,
    costPrice: 2500.00,
    totalValue: 112500.00,
    shop: "Flaming Bun",
    supplier: "Prime Meat Co.",
    purchaseDate: "2025-10-14",
    expiryDate: "2025-10-20",
    lastUpdated: "2025-10-16",
  },
  {
    id: "2",
    itemName: "Burger Buns",
    category: "Buns",
    description: "Sesame seed burger buns",
    unitType: "pcs",
    quantity: 200,
    costPrice: 15.00,
    totalValue: 3000.00,
    shop: "Flaming Bun",
    supplier: "Fresh Bakery Ltd",
    purchaseDate: "2025-10-16",
    expiryDate: "2025-10-18",
    lastUpdated: "2025-10-16",
  },
  {
    id: "3",
    itemName: "Lettuce",
    category: "Vegetables",
    description: "Fresh iceberg lettuce",
    unitType: "kg",
    quantity: 15,
    costPrice: 80.00,
    totalValue: 1200.00,
    shop: "Flaming Bun",
    supplier: "Green Farms",
    purchaseDate: "2025-10-15",
    expiryDate: "2025-10-19",
    lastUpdated: "2025-10-16",
  },
  {
    id: "4",
    itemName: "Coca Cola",
    category: "Beverages",
    description: "Coca Cola 330ml cans",
    unitType: "box",
    quantity: 12,
    costPrice: 320.00,
    totalValue: 3840.00,
    shop: "Flaming Bun",
    supplier: "Beverage Distributors",
    purchaseDate: "2025-10-10",
    expiryDate: "2026-04-10",
    lastUpdated: "2025-10-16",
  },
  {
    id: "5",
    itemName: "Ketchup",
    category: "Condiments",
    description: "Heinz Tomato Ketchup",
    unitType: "litre",
    quantity: 8,
    costPrice: 180.00,
    totalValue: 1440.00,
    shop: "Flaming Bun",
    supplier: "Condiment Suppliers",
    purchaseDate: "2025-10-12",
    expiryDate: "2026-10-12",
    lastUpdated: "2025-10-16",
  },
  {
    id: "6",
    itemName: "Chicken Breast",
    category: "Meat",
    description: "Fresh chicken breast fillets",
    unitType: "kg",
    quantity: 30,
    costPrice: 320.00,
    totalValue: 9600.00,
    shop: "Flaming Dough",
    supplier: "Poultry Farms Inc",
    purchaseDate: "2025-10-15",
    expiryDate: "2025-10-22",
    lastUpdated: "2025-10-16",
  },
  {
    id: "7",
    itemName: "Pizza Dough",
    category: "Buns",
    description: "Fresh pizza dough balls",
    unitType: "pcs",
    quantity: 100,
    costPrice: 48.00,
    totalValue: 4800.00,
    shop: "Flaming Dough",
    supplier: "Dough Masters",
    purchaseDate: "2025-10-16",
    expiryDate: "2025-10-18",
    lastUpdated: "2025-10-16",
  },
  {
    id: "8",
    itemName: "Tomatoes",
    category: "Vegetables",
    description: "Fresh tomatoes",
    unitType: "kg",
    quantity: 20,
    costPrice: 120.00,
    totalValue: 2400.00,
    shop: "Flaming Dough",
    supplier: "Green Farms",
    purchaseDate: "2025-10-15",
    expiryDate: "2025-10-20",
    lastUpdated: "2025-10-16",
  },
  {
    id: "9",
    itemName: "Orange Juice",
    category: "Beverages",
    description: "Fresh orange juice",
    unitType: "litre",
    quantity: 25,
    costPrice: 140.00,
    totalValue: 3500.00,
    shop: "Flaming Dough",
    supplier: "Fresh Juice Co.",
    purchaseDate: "2025-10-14",
    expiryDate: "2025-10-21",
    lastUpdated: "2025-10-16",
  },
  {
    id: "10",
    itemName: "Mayonnaise",
    category: "Condiments",
    description: "Premium mayonnaise",
    unitType: "litre",
    quantity: 6,
    costPrice: 200.00,
    totalValue: 1200.00,
    shop: "Flaming Dough",
    supplier: "Condiment Suppliers",
    purchaseDate: "2025-10-13",
    expiryDate: "2026-04-13",
    lastUpdated: "2025-10-16",
  },
];

export default function StockEditPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Find the stock item by ID
  const stockItem = mockStockData.find((item) => item.id === id);

  if (!stockItem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Stock Item Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The stock item you're looking for doesn't exist.
          </p>
          <a 
            href="/admin/stock" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Stock List
          </a>
        </div>
      </div>
    );
  }

  return <StockEditForm stockItem={stockItem} />;
}
