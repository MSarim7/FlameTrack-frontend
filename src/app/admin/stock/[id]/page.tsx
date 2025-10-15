export default function ProductDetailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Product Details</h1>
        <p className="text-muted-foreground">
          View and edit product information
        </p>
      </div>
      
      <div className="rounded-md border">
        <div className="p-8 text-center">
          <h3 className="text-lg font-medium">Product Details</h3>
          <p className="text-muted-foreground">Product details will be displayed here</p>
        </div>
      </div>
    </div>
  )
}