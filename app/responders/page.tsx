import BreadCrumb from "@/components/bread-crumbs";
import { RespondersTable } from "@/components/responders/responders-table";
import CreateResponderButton from "@/components/responders/create-responder-button";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Responders", href: "/responders", active: true },
];

export default function Responders({
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
      <div className="ml-auto">
        <CreateResponderButton />
      </div>
      <RespondersTable
        searchQuery={searchQuery}
        page={currentPage}
        items_per_page={items_per_page}
      />
    </div>
  );
}
