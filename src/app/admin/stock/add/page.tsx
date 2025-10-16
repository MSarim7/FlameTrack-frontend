"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { stockFormSchema, validateStockForm, type StockFormData } from "@/validators/stock";

export default function AddStockPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<StockFormData>>({
    itemName: "",
    category: undefined,
    description: "",
    unitType: undefined,
    quantity: "",
    costPrice: "",
    sellingPrice: "",
    shop: undefined,
    supplier: "",
    purchaseDate: "",
    expiryDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalValue =
    formData.quantity && formData.costPrice
      ? (parseFloat(formData.quantity) * parseFloat(formData.costPrice)).toFixed(2)
      : "0.00";

  const handleInputChange = (field: keyof Partial<StockFormData>, value: string) => {
    setFormData((prev: Partial<StockFormData>) => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field as string]) {
      setErrors((prev: Record<string, string[]>) => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    const validation = validateStockForm(formData);
    
    if (!validation.success) {
      setErrors((validation.errors as Record<string, string[]>) || {});
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate adding to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Stock Item Added Successfully",
        description: `${formData.itemName} (${formData.quantity} ${formData.unitType}) has been added to ${formData.shop} inventory with a total value of ₨${totalValue}.`,
      });

      // Navigate back to stock list
      setTimeout(() => router.push("/admin/stock"), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add stock item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/stock")}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Stock Item</h1>
        <p className="text-muted-foreground">
            Add a new item to your inventory
        </p>
        </div>
      </div>
      
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item Name */}
              <div className="space-y-2">
                <Label htmlFor="itemName">
                  Item Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="itemName"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange("itemName", e.target.value)}
                  placeholder="Enter item name"
                  className={errors.itemName ? "border-destructive" : ""}
                />
                {errors.itemName && (
                  <p className="text-sm text-destructive">{errors.itemName[0]}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Meat">Meat</SelectItem>
                    <SelectItem value="Buns">Buns</SelectItem>
                    <SelectItem value="Vegetables">Vegetables</SelectItem>
                    <SelectItem value="Beverages">Beverages</SelectItem>
                    <SelectItem value="Condiments">Condiments</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category[0]}</p>
                )}
              </div>

              {/* Unit Type */}
              <div className="space-y-2">
                <Label htmlFor="unitType">
                  Unit Type <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.unitType} onValueChange={(value) => handleInputChange("unitType", value)}>
                  <SelectTrigger id="unitType" className={errors.unitType ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select unit type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="litre">litre</SelectItem>
                    <SelectItem value="pcs">pcs</SelectItem>
                    <SelectItem value="box">box</SelectItem>
                    <SelectItem value="packet">packet</SelectItem>
                  </SelectContent>
                </Select>
                {errors.unitType && (
                  <p className="text-sm text-destructive">{errors.unitType[0]}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="Enter quantity"
                  min="0"
                  step="0.01"
                  className={errors.quantity ? "border-destructive" : ""}
                />
                {errors.quantity && (
                  <p className="text-sm text-destructive">{errors.quantity[0]}</p>
                )}
              </div>

              {/* Cost Price */}
              <div className="space-y-2">
                <Label htmlFor="costPrice">
                  Cost Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  value={formData.costPrice}
                  onChange={(e) => handleInputChange("costPrice", e.target.value)}
                  placeholder="Enter cost per unit"
                  min="0"
                  step="0.01"
                  className={errors.costPrice ? "border-destructive" : ""}
                />
                {errors.costPrice && (
                  <p className="text-sm text-destructive">{errors.costPrice[0]}</p>
                )}
              </div>

              {/* Selling Price */}
              <div className="space-y-2">
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                  placeholder="Enter selling price (optional)"
                  min="0"
                  step="0.01"
                  className={errors.sellingPrice ? "border-destructive" : ""}
                />
                {errors.sellingPrice && (
                  <p className="text-sm text-destructive">{errors.sellingPrice[0]}</p>
                )}
              </div>

              {/* Total Value (Auto-calculated) */}
              <div className="space-y-2">
                <Label htmlFor="totalValue">Total Value</Label>
                <Input
                  id="totalValue"
                  value={`₨${totalValue}`}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Shop */}
              <div className="space-y-2">
                <Label htmlFor="shop">
                  Shop <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.shop} onValueChange={(value) => handleInputChange("shop", value)}>
                  <SelectTrigger id="shop" className={errors.shop ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select shop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Flaming Bun">Flaming Bun</SelectItem>
                    <SelectItem value="Flaming Dough">Flaming Dough</SelectItem>
                  </SelectContent>
                </Select>
                {errors.shop && (
                  <p className="text-sm text-destructive">{errors.shop[0]}</p>
                )}
              </div>

              {/* Supplier Name */}
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier Name</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                  placeholder="Enter supplier name (optional)"
                  className={errors.supplier ? "border-destructive" : ""}
                />
                {errors.supplier && (
                  <p className="text-sm text-destructive">{errors.supplier[0]}</p>
                )}
              </div>

              {/* Purchase Date */}
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">
                  Purchase Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                  className={errors.purchaseDate ? "border-destructive" : ""}
                />
                {errors.purchaseDate && (
                  <p className="text-sm text-destructive">{errors.purchaseDate[0]}</p>
                )}
              </div>

              {/* Expiry Date */}
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-destructive">{errors.expiryDate[0]}</p>
                )}
        </div>
      </div>

            {/* Full Width Fields */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter item description (optional)"
                rows={3}
                className={errors.description ? "border-destructive" : ""}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Internal Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Enter any internal notes (optional)"
                rows={3}
                className={errors.notes ? "border-destructive" : ""}
              />
              {errors.notes && (
                <p className="text-sm text-destructive">{errors.notes[0]}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/stock")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Stock"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}