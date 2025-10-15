export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-full">
      <div className="max-w-full">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground break-words">
          Overview of your FlameTrack business performance
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Profit</p>
              <p className="text-2xl font-bold">$5,678</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">234</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Net Revenue</p>
              <p className="text-2xl font-bold">$8,901</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}