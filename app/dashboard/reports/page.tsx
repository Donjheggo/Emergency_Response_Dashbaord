import { ReportsTable } from "@/components/reports/reports-table";
import BreadCrumb from "@/components/bread-crumbs";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Emergency Reports", href: "/dashboard/reports", active: true },
];

export default function Reports({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const items_per_page = 5
  return (
    <>
      <div className="hidden md:block">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <ReportsTable searchQuery={searchQuery} page={currentPage} items_per_page={items_per_page} />
    </>
  );
}
