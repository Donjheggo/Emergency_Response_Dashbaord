import { GetEmergencyById } from "@/lib/actions/reports";
import { notFound } from "next/navigation";
import UpdateReportForm from "@/components/reports/update-report-form";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default async function UpdateReport({
  params,
}: {
  params: { id: string };
}) {
  const report = await GetEmergencyById(params.id);
  if (!report) notFound();
  const serializedReport = JSON.parse(JSON.stringify(report));

  return (
    <>
      <Link href="../" className="flex items-center gap-1 hover:font-semibold">
        <MoveLeft />
        Back
      </Link>
      <div className="flex justify-center">
        <UpdateReportForm report={serializedReport} />
      </div>
    </>
  );
}
