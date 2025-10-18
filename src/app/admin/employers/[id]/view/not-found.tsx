import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Users className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Employee Not Found</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              The employee you're looking for doesn't exist or may have been removed.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/admin/employers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Employees
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/employers/add">
              Add New Employee
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

