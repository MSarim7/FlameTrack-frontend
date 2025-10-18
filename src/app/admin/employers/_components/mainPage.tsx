
"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, UserPlus, Eye, Search } from "lucide-react";
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

export const mockEmployerData: Employer[] = [
  {
    id: "emp-01",
    name: "Ali Khan",
    email: "ali@flamingbun.com",
    phone: "+92 301 1234567",
    shop: "Flaming Dough",
    role: "Cashier",
    dateJoined: "2025-09-05",
    status: "Active",
  },
  {
    id: "emp-02",
    name: "Ahmed Raza",
    email: "ahmed@flamingdough.com",
    phone: "+92 333 7654321",
    shop: "Flaming Bun",
    role: "Manager",
    dateJoined: "2025-09-10",
    status: "Active",
  },
  {
    id: "emp-03",
    name: "Fatima Sheikh",
    email: "fatima@flamingbun.com",
    phone: "+92 302 9876543",
    shop: "Flaming Dough",
    role: "Staff",
    dateJoined: "2025-08-15",
    status: "Active",
  },
  {
    id: "emp-04",
    name: "Hassan Ali",
    email: "hassan@flamingdough.com",
    phone: "+92 334 4567890",
    shop: "Flaming Dough",
    role: "Cashier",
    dateJoined: "2025-09-20",
    status: "Active",
  },
  {
    id: "emp-05",
    name: "Ayesha Malik",
    email: "ayesha@flamingbun.com",
    phone: "+92 303 2345678",
    shop: "Flaming Bun",
    role: "Manager",
    dateJoined: "2025-07-12",
    status: "Active",
  },
  {
    id: "emp-06",
    name: "Usman Khan",
    email: "usman@flamingdough.com",
    phone: "+92 335 6789012",
    shop: "Flaming Dough",
    role: "Staff",
    dateJoined: "2025-08-28",
    status: "Inactive",
  },
  {
    id: "emp-07",
    name: "Sara Ahmed",
    email: "sara@flamingbun.com",
    phone: "+92 304 3456789",
    shop: "Flaming Bun",
    role: "Cashier",
    dateJoined: "2025-09-01",
    status: "Active",
  },
  {
    id: "emp-08",
    name: "Bilal Hassan",
    email: "bilal@flamingdough.com",
    phone: "+92 336 7890123",
    shop: "Flaming Dough",
    role: "Staff",
    dateJoined: "2025-08-05",
    status: "Active",
  },
  {
    id: "emp-09",
    name: "Zainab Khan",
    email: "zainab@flamingbun.com",
    phone: "+92 305 4567890",
    shop: "Flaming Bun",
    role: "Staff",
    dateJoined: "2025-09-15",
    status: "Active",
  },
  {
    id: "emp-10",
    name: "Omar Sheikh",
    email: "omar@flamingdough.com",
    phone: "+92 337 8901234",
    shop: "Flaming Dough",
    role: "Manager",
    dateJoined: "2025-07-20",
    status: "Active",
  },
];

const EmployerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [employerData] = useState<Employer[]>(mockEmployerData);

  // Filter employer data based on search query
  const filteredData = employerData.filter(
    (employer) =>
      employer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employer.shop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate summary metrics
  const totalEmployers = employerData.length;
  const flamingBunEmployers = employerData.filter(emp => emp.shop === "Flaming Bun").length;
  const flamingDoughEmployers = employerData.filter(emp => emp.shop === "Flaming Dough").length;

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Employer Management</h1>
        <p className="text-muted-foreground">View, add, and manage all employees.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Employers Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Employers</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100 group-hover:scale-105 transition-transform duration-300">
                {totalEmployers}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">employees</div>
            </div>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-2 font-medium">
              Across all shops
            </p>
            <div className="mt-3 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-4/5 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Flaming Bun Employers Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/30 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">Flaming Bun Employers</CardTitle>
            <div className="p-2 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
              <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-orange-900 dark:text-orange-100 group-hover:scale-105 transition-transform duration-300">
                {flamingBunEmployers}
              </div>
              <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">employees</div>
            </div>
            <p className="text-sm text-orange-600/70 dark:text-orange-400/70 mt-2 font-medium">
              Flaming Bun 
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1 bg-orange-200 dark:bg-orange-800 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-3/5" />
              </div>
              <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">{Math.round((flamingBunEmployers / totalEmployers) * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Flaming Dough Employers Card */}
        <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/50 dark:to-pink-900/30 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
            <CardTitle className="text-sm font-semibold text-pink-700 dark:text-pink-300">Flaming Dough Employers</CardTitle>
            <div className="p-2 rounded-lg bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors duration-300">
              <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-pink-900 dark:text-pink-100 group-hover:scale-105 transition-transform duration-300">
                {flamingDoughEmployers}
              </div>
              <div className="text-sm text-pink-600 dark:text-pink-400 font-medium">employees</div>
            </div>
            <p className="text-sm text-pink-600/70 dark:text-pink-400/70 mt-2 font-medium">
              Flaming Dough 
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1 bg-pink-200 dark:bg-pink-800 rounded-full flex-1 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full w-2/5" />
              </div>
              <span className="text-xs text-pink-600 dark:text-pink-400 font-medium">{Math.round((flamingDoughEmployers / totalEmployers) * 100)}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Add Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search by name, email, role, or shop…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Link 
          href="/admin/employers/add"
          className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 text-sm font-medium transition-all"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employer
        </Link>
      </div>

      {/* Employer Table */}
      <Card className="border-0 shadow-lg bg-white dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Employee List</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {filteredData.length} of {employerData.length} employees
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Employee Name</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Email</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Phone</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Role</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Shop</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Status</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Date Joined</TableHead>
                  <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800">
                          <Users className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-slate-600 dark:text-slate-400 font-medium">No employees found</p>
                          <p className="text-sm text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((employer, index) => (
                    <TableRow
                      key={employer.id}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">{employer.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              ID: {employer.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {employer.email}
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {employer.phone}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          employer.role === 'Manager' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                          employer.role === 'Cashier' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {employer.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          employer.shop === 'Flaming Bun' 
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                        }`}>
                          {employer.shop}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          employer.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            employer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                          }`} />
                          {employer.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(employer.dateJoined).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link
                          href={`/admin/employers/${employer.id}/view`}
                          className="inline-flex items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 bg-background px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          View
                        </Link>
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
export default EmployerManagement;
