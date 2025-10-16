import ViewStockItem from "../../_components/viewStockItem";

interface ViewStockPageProps {
  params: {
    id: string;
  };
}

// Simple dummy data for any stock item
const getDummyStockData = (id: string) => ({
  id: id,
  itemName: "Sample Stock Item",
  category: "Meat" as const,
  description: "This is a sample stock item for demonstration purposes",
  unitType: "kg" as const,
  quantity: 50,
  costPrice: 2500.00,
  totalValue: 125000.00,
  shop: "Flaming Bun" as const,
  supplier: "Sample Supplier Co.",
  purchaseDate: "2025-01-15",
  expiryDate: "2025-01-25",
  notes: "This is sample data for testing the view functionality",
  lastUpdated: "2025-01-16T10:30:00",
});

export default function ViewStockPage({ params }: ViewStockPageProps) {
  const stockItem = getDummyStockData(params.id);

  return <ViewStockItem stockItem={stockItem} />;
}