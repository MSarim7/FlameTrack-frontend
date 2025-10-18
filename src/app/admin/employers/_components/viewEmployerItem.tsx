"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Simple interface for employer
interface Employer {
  id: string;
  name: string;
  email: string;
  phone: string;
  shop: "Flaming Bun" | "Flaming Dough";
  role: "Cashier" | "Manager" | "Staff";
  dateJoined: string;
  status: "Active" | "Inactive";
}

interface ViewEmployerItemProps {
  employer: Employer;
}

export default function ViewEmployerItem({ employer }: ViewEmployerItemProps) {
  const router = useRouter();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Manager':
        return 'text-purple-600 dark:text-purple-400';
      case 'Cashier':
        return 'text-blue-600 dark:text-blue-400';
      case 'Staff':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };

  const getShopColor = (shop: string) => {
    return shop === 'Flaming Bun' 
      ? 'text-orange-600 dark:text-orange-400' 
      : 'text-pink-600 dark:text-pink-400';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => router.push("/admin/employers")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={() => router.push(`/admin/employers/${employer.id}/edit`)}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1 - Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Employee Name</label>
              <p className="text-lg font-semibold">{employer.name}</p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Employee ID</label>
              <p className="text-lg font-semibold text-muted-foreground">{employer.id}</p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Email Address</label>
              <p className="text-lg font-semibold">{employer.email}</p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Phone Number</label>
              <p className="text-lg font-semibold">{employer.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - Work Information */}
        <Card>
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Role</label>
              <p className={`text-lg font-semibold ${getRoleColor(employer.role)}`}>
                {employer.role}
              </p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Shop</label>
              <p className={`text-lg font-semibold ${getShopColor(employer.shop)}`}>
                {employer.shop}
              </p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <p className={`text-lg font-semibold ${getStatusColor(employer.status)}`}>
                {employer.status}
              </p>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground">Date Joined</label>
              <p className="text-lg font-semibold">{formatDate(employer.dateJoined)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Section 3 - Additional Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-muted-foreground">Employment Duration</label>
                <p className="text-lg font-semibold">
                  {Math.floor((new Date().getTime() - new Date(employer.dateJoined).getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
              
              <div>
                <label className="text-sm text-muted-foreground">Last Updated</label>
                <p className="text-lg font-semibold">
                  {new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

