import BreadCrumb from "@/components/bread-crumbs";
import { UsersTable } from "@/components/users/users-table";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Users", href: "/dashboard/users", active: true },
];

export default function Users({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const items_per_page = 7;
  return (
    <>
      <div className="hidden md:block">
        <BreadCrumb items={breadcrumbItems} />
      </div>
      <UsersTable
        searchQuery={searchQuery}
        page={currentPage}
        items_per_page={items_per_page}
      />
    </>
  );
}
