"use client";

import { useState } from "react";
import Link from "next/link";
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Items Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Items</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 group-hover:scale-105 transition-transform duration-300">
                {totalItems.toLocaleString()}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">items</div>
            </div>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2 font-medium">
              Across all categories
            </p>
            <div className="mt-3 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-4/5 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Items Used Today Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/30 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-red-700 dark:text-red-300">Items Used Today</CardTitle>
            <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-300">
              <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-red-900 dark:text-red-100 group-hover:scale-105 transition-transform duration-300">
                {itemsUsedToday}
              </div>
              <div className="text-sm text-red-600 dark:text-red-400 font-medium">items</div>
            </div>
            <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-2 font-medium">
              Stock reduction today
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1 bg-red-200 dark:bg-red-800 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full w-3/5" />
              </div>
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">-12%</span>
            </div>
          </CardContent>
        </Card>

        {/* Items Added Today Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/30 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Items Added Today</CardTitle>
            <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-colors duration-300">
              <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-green-900 dark:text-green-100 group-hover:scale-105 transition-transform duration-300">
                {itemsAddedToday}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">items</div>
            </div>
            <p className="text-sm text-green-600/70 dark:text-green-400/70 mt-2 font-medium">
              New inventory added
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1 bg-green-200 dark:bg-green-800 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full w-2/5" />
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">+5%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search item or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link 
          href="/admin/stock/add"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Stock
        </Link>
      </div>

      {/* Stock Table */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Inventory Items</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {filteredData.length} of {stockData.length} items
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Item Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Category</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Unit Type</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">Quantity</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">Cost Price</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-right">Total Value</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Shop</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Last Updated</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                          <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400 font-medium">No items found</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <Package className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{item.itemName}</div>
                            {item.description && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-32">
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          item.category === 'Meat' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                          item.category === 'Buns' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          item.category === 'Vegetables' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                          item.category === 'Beverages' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          item.category === 'Condiments' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                        }`}>
                          {item.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 font-medium">
                        {item.unitType}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-semibold text-slate-900 dark:text-slate-100">
                            {item.quantity}
                          </span>
                          <div className={`h-2 w-2 rounded-full ${
                            item.quantity > 50 ? 'bg-green-500' :
                            item.quantity > 20 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-900 dark:text-slate-100">
                        ₨{item.costPrice.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          ₨{item.totalValue.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          item.shop === 'Flaming Bun' 
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                        }`}>
                          {item.shop}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
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