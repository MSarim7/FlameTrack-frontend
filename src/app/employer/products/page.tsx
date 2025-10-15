export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          View available products
        </p>
      </div>
      
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium">Products List</h3>
          <p className="text-muted-foreground">Products will be displayed here</p>
        </div>
      </div>
    </div>
  )
}
