import { GetResponderById } from "@/lib/actions/responders";
import { notFound } from "next/navigation";
import UpdateResponderForm from "@/components/responders/update-responder-form";
import BackButton from "@/components/back-button";

export default async function UpdateReport({
  params,
}: {
  params: { id: string };
}) {
  const report = await GetResponderById(params.id);
  if (!report) notFound();
  const serializedReport = JSON.parse(JSON.stringify(report));

  return (
    <>
      <BackButton href="../" />
      <div className="flex justify-center">
        <UpdateResponderForm responder={serializedReport} />
      </div>
    </>
  );
}
