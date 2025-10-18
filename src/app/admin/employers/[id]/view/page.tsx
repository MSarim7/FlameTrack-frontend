import ViewEmployerItem from "../../_components/viewEmployerItem";

interface ViewEmployerPageProps {
  params: {
    id: string;
  };
}

// Simple dummy data for any employer
const getDummyEmployerData = (id: string) => ({
  id: id,
  name: "Ali Khan",
  email: "ali@flamingbun.com",
  phone: "+92 301 1234567",
  shop: "Flaming Bun" as const,
  role: "Cashier" as const,
  dateJoined: "2025-09-05",
  status: "Active" as const,
});

export default function ViewEmployerPage({ params }: ViewEmployerPageProps) {
  const employer = getDummyEmployerData(params.id);

  return <ViewEmployerItem employer={employer} />;
}

