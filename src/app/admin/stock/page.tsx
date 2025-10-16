"use client";

import { useState } from "react";
import { Box, TrendingDown, Plus, Eye, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data interface and data
export interface StockItem {
  id: string;
  itemName: string;
  category: "Meat" | "Buns" | "Vegetables" | "Beverages" | "Condiments" | "Others";
  description?: string;
  unitType: "kg" | "litre" | "pcs" | "box" | "packet";
  quantity: number;
  costPrice: number;
  totalValue: number;
  shop: "Flaming Bun" | "Flaming Dough";
  supplier?: string;
  purchaseDate: string;
  expiryDate?: string;
  notes?: string;
  lastUpdated: string;
}

export const mockStockData: StockItem[] = [
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

const Stock = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stockData] = useState<StockItem[]>(mockStockData);

  // Filter stock data based on search query
  const filteredData = stockData.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate summary metrics
  const totalItems = stockData.reduce((sum, item) => sum + item.quantity, 0);
  const itemsUsedToday = 12; // Simulated
  const itemsAddedToday = 5; // Simulated

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Stock Management</h1>
        <p className="text-muted-foreground">View, add, and manage all inventory items.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalItems}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Used Today</CardTitle>
            <TrendingDown className="h-5 w-5 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{itemsUsedToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Stock reduction
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Items Added Today</CardTitle>
            <Plus className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{itemsAddedToday}</div>
            <p className="text-xs text-muted-foreground mt-1">
              New inventory
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          type="text"
          placeholder="Search item or category…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Button>
      </div>

      {/* Stock Table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border bg-muted/50">
                  <TableHead className="font-semibold">Item Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Unit Type</TableHead>
                  <TableHead className="font-semibold text-right">Quantity</TableHead>
                  <TableHead className="font-semibold text-right">Cost Price</TableHead>
                  <TableHead className="font-semibold text-right">Total Value</TableHead>
                  <TableHead className="font-semibold">Shop</TableHead>
                  <TableHead className="font-semibold">Last Updated</TableHead>
                  <TableHead className="font-semibold text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No items found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell>{item.unitType}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        ₨{item.costPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ₨{item.totalValue.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{item.shop}</span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stock;