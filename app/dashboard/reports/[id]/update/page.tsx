import { GetEmergencyById } from "@/lib/actions/reports";
import { notFound } from "next/navigation";
import UpdateReportForm from "@/components/reports/update-report-form";


export default async function UpdateReport({
  params,
}: {
  params: { id: string };
}) {
  const report = await GetEmergencyById(params.id);
  if (!report) notFound();
  const serializedReport = JSON.parse(JSON.stringify(report));

  return (
    <div className="flex justify-center">
      <UpdateReportForm report={serializedReport}/>
    </div>
  );
}
