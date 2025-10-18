"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { employerFormSchema, validateEmployerForm, type EmployerFormData } from "@/validators/employer";

// Employer interface matching the main page
export interface Employer {
  id: string;
  name: string;
  email: string;
  phone: string;
  shop: "Flaming Bun" | "Flaming Dough";
  role: "Cashier" | "Manager" | "Staff";
  dateJoined: string;
  status: "Active" | "Inactive";
}

interface EmployerEditFormProps {
  employer: Employer;
}

export default function EmployerEditForm({ employer }: EmployerEditFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Partial<EmployerFormData>>({
    name: employer?.name || "",
    email: employer?.email || "",
    phone: employer?.phone || "",
    shop: employer?.shop || undefined,
    role: employer?.role || undefined,
    dateJoined: employer?.dateJoined || "",
    status: employer?.status || "Active",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (employer) {
      setFormData({
        name: employer.name,
        email: employer.email,
        phone: employer.phone,
        shop: employer.shop,
        role: employer.role,
        dateJoined: employer.dateJoined,
        status: employer.status,
      });
    }
  }, [employer]);

  const handleInputChange = (field: keyof Partial<EmployerFormData>, value: string) => {
    setFormData((prev: Partial<EmployerFormData>) => ({ ...prev, [field]: value }));
    
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
    const validation = validateEmployerForm(formData);
    
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
      // Simulate updating database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Employee Updated Successfully",
        description: `${formData.name} has been updated as ${formData.role} at ${formData.shop}.`,
      });

      // Redirect back to employer view
      setTimeout(() => {
        router.push(`/admin/employers/${employer.id}/view`);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push(`/admin/employers/${employer.id}/view`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Employee</h1>
        <p className="text-muted-foreground">
          Update the details of your employee
        </p>
      </div>
      
      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Employee Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value)
                  }
                  placeholder="Enter employee name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value)
                  }
                  placeholder="Enter email address"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email[0]}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    handleInputChange("phone", e.target.value)
                  }
                  placeholder="Enter phone number"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone[0]}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">
                  Role <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.role || ""}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger id="role" className={`w-full ${errors.role ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Cashier">Cashier</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role[0]}</p>
                )}
              </div>

              {/* Shop */}
              <div className="space-y-2">
                <Label htmlFor="shop">
                  Shop <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.shop || ""}
                  onValueChange={(value) => handleInputChange("shop", value)}
                >
                  <SelectTrigger id="shop" className={`w-full ${errors.shop ? "border-destructive" : ""}`}>
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

              {/* Date Joined */}
              <div className="space-y-2">
                <Label htmlFor="dateJoined">
                  Date Joined <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dateJoined"
                  type="date"
                  value={formData.dateJoined}
                  onChange={(e) =>
                    handleInputChange("dateJoined", e.target.value)
                  }
                  className={errors.dateJoined ? "border-destructive" : ""}
                />
                {errors.dateJoined && (
                  <p className="text-sm text-destructive">{errors.dateJoined[0]}</p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">
                  Status <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.status || ""}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger id="status" className={`w-full ${errors.status ? "border-destructive" : ""}`}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-destructive">{errors.status[0]}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/admin/employers/${employer.id}/view`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                {isSubmitting ? "Updating..." : "Update Employee"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
