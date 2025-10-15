export default function ExpensesPage() {
  return (
    <div className="space-y-6 max-w-full">
      <div className="max-w-full">
        <h1 className="text-3xl font-bold tracking-tight break-words">Expenses Management</h1>
        <p className="text-muted-foreground break-words">
          Monitor and manage business expenses
        </p>
      </div>
      
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium">Expenses Management</h3>
          <p className="text-muted-foreground">Expenses data will be displayed here</p>
        </div>
      </div>
    </div>
  )
}
