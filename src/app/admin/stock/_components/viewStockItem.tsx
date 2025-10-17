"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple interface for stock item
interface StockItem {
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

interface ViewStockItemProps {
  stockItem: StockItem;
}

export default function ViewStockItem({ stockItem }: ViewStockItemProps) {
  const router = useRouter();

  const formatCurrency = (value: number) => {
    return `₨${value.toFixed(2)}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push("/admin/stock")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={() => router.push(`/admin/stock/${stockItem.id}/edit`)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1 - Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Item Name</label>
              <p className="text-lg font-semibold">{stockItem.itemName}</p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Category</label>
              <p className="text-lg font-semibold">{stockItem.category}</p>
            </div>
            
            {stockItem.description && (
              <div>
                <label className="text-sm text-muted-foreground">Description</label>
                <p className="text-lg font-semibold">{stockItem.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Unit Type</label>
                <p className="text-lg font-semibold">{stockItem.unitType}</p>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Quantity</label>
                <p className="text-lg font-semibold">{stockItem.quantity}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Cost Price</label>
                <p className="text-lg font-semibold">{formatCurrency(stockItem.costPrice)}</p>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Total Value</label>
                <p className="text-lg font-semibold text-[#FF7123]">{formatCurrency(stockItem.totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Shop & Supplier */}
        <Card>
          <CardHeader>
            <CardTitle>Shop & Supplier</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Shop</label>
              <p className="text-lg font-semibold">{stockItem.shop}</p>
            </div>
            
            {stockItem.supplier && (
              <div>
                <label className="text-sm text-muted-foreground">Supplier</label>
                <p className="text-lg font-semibold">{stockItem.supplier}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm text-muted-foreground">Purchase Date</label>
              <p className="text-lg font-semibold">{formatDate(stockItem.purchaseDate)}</p>
            </div>
            
            {stockItem.expiryDate && (
              <div>
                <label className="text-sm text-muted-foreground">Expiry Date</label>
                <p className="text-lg font-semibold">{formatDate(stockItem.expiryDate)}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 3 - Additional Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stockItem.notes && (
              <div>
                <label className="text-sm text-muted-foreground">Notes</label>
                <p className="text-lg font-semibold">{stockItem.notes}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm text-muted-foreground">Last Updated</label>
              <p className="text-lg font-semibold">
                {new Date(stockItem.lastUpdated).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}