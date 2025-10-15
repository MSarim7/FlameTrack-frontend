'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Header */}
      <header className="h-16 px-4 border-b bg-background flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Employer Dashboard</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Employer Portal</div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4 lg:p-6">
        {children}
      </main>
    </div>
  )
}
