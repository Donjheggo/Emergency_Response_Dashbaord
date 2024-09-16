import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetEmergencyById } from "@/lib/actions/reports";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default async function UpdateReport({
  params,
}: {
  params: { id: string };
}) {
  const report = await GetEmergencyById(params.id);
  if (!report) notFound();
  const serializedReport = JSON.parse(JSON.stringify(report));
  console.log(serializedReport);
  const status = ["pending", "responded", "declined"];

  return (
    <div className="flex justify-center">
      <Card className="w-[350px] md:w-[650px] shadow-none">
        <CardHeader>
          <CardTitle>{serializedReport.user.email}</CardTitle>
          <CardDescription>
            {new Date(serializedReport.created_at).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            Responder -{" "}
            <span className="font-semibold">
              {" "}
              {serializedReport.responder.type}
            </span>
            <br />
            Description - {serializedReport.description} <br />
            Address - {serializedReport.address} <br />
            Status -
          </p>
          <form>
            <RadioGroup name="status" defaultValue={serializedReport.status}>
              {status.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={item} />
                  <Label htmlFor={item}>{item}</Label>
                </div>
              ))}
            </RadioGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
