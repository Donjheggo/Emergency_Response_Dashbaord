import { VerificationTable } from "@/components/verification/verification-table";
import BreadCrumb from "@/components/bread-crumbs";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Verification", href: "/dashboard/verification", active: true },
];

export default function Verification({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const items_per_page = 7;
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="hidden md:block">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <VerificationTable
        searchQuery={searchQuery}
        page={currentPage}
        items_per_page={items_per_page}
      />
    </div>
  );
}
