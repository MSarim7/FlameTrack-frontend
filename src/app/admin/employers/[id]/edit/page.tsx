"use client";

import { useParams } from "next/navigation";
import EmployerEditForm, { Employer } from "@/src/app/admin/employers/_components/EmployerEditForm";

// Mock data - same as in mainPage.tsx
const mockEmployerData: Employer[] = [
  {
    id: "emp-01",
    name: "Ali Khan",
    email: "ali@flamingbun.com",
    phone: "+923011234567",
    shop: "Flaming Bun",
    role: "Cashier",
    dateJoined: "2025-09-05",
    status: "Active",
  },
  {
    id: "emp-02",
    name: "Ahmed Raza",
    email: "ahmed@flamingdough.com",
    phone: "+923337654321",
    shop: "Flaming Dough",
    role: "Manager",
    dateJoined: "2025-09-10",
    status: "Active",
  },
  {
    id: "emp-03",
    name: "Fatima Sheikh",
    email: "fatima@flamingbun.com",
    phone: "+923029876543",
    shop: "Flaming Bun",
    role: "Staff",
    dateJoined: "2025-08-15",
    status: "Active",
  },
  {
    id: "emp-04",
    name: "Hassan Ali",
    email: "hassan@flamingdough.com",
    phone: "+923344567890",
    shop: "Flaming Dough",
    role: "Cashier",
    dateJoined: "2025-09-20",
    status: "Active",
  },
  {
    id: "emp-05",
    name: "Ayesha Malik",
    email: "ayesha@flamingbun.com",
    phone: "+923032345678",
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
    phone: "+923043456789",
    shop: "Flaming Bun",
    role: "Cashier",
    dateJoined: "2025-09-01",
    status: "Active",
  },
  {
    id: "emp-08",
    name: "Bilal Hassan",
    email: "bilal@flamingdough.com",
    phone: "+923367890123",
    shop: "Flaming Dough",
    role: "Staff",
    dateJoined: "2025-08-05",
    status: "Active",
  },
  {
    id: "emp-09",
    name: "Zainab Khan",
    email: "zainab@flamingbun.com",
    phone: "+923054567890",
    shop: "Flaming Bun",
    role: "Staff",
    dateJoined: "2025-09-15",
    status: "Active",
  },
  {
    id: "emp-10",
    name: "Omar Sheikh",
    email: "omar@flamingdough.com",
    phone: "+923378901234",
    shop: "Flaming Dough",
    role: "Manager",
    dateJoined: "2025-07-20",
    status: "Active",
  },
];

export default function EmployerEditPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Find the employer by ID
  const employer = mockEmployerData.find((emp) => emp.id === id);

  if (!employer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Employee Not Found
          </h2>
          <p className="text-muted-foreground mb-4">
            The employee you're looking for doesn't exist.
          </p>
          <a 
            href="/admin/employers" 
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Back to Employee List
          </a>
        </div>
      </div>
    );
  }

  return <EmployerEditForm employer={employer} />;
}
