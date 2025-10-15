'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/admin/Sidebar'
import { Topbar } from '@/components/admin/Topbar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Exactly 256px */}
      <div className={`w-64 h-full flex-shrink-0 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${sidebarOpen ? 'fixed z-50' : 'md:relative'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content - Remaining width */}
      <div className="flex-1 h-full flex flex-col overflow-hidden min-w-0 max-w-full">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto min-w-0 max-w-full admin-content">
          <div className="w-full max-w-full overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}