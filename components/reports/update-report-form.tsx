"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UpdateEmergency } from "@/lib/actions/reports";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const status = ["pending", "responded", "declined"];

export default function UpdateReportForm({ report }: { report: any }) {
  const [selectedStatus, setSelectedStatus] = useState(report.status);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChangeStatus = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await UpdateEmergency(report.id, selectedStatus);
      if (error) {
        toast.error(`Error: ${error}`);
      }
      toast.success("Success");
      router.push("/dashboard/reports");
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Card className="w-[350px] md:w-[650px] shadow-none">
        <CardHeader>
          <CardTitle>{report.user.email}</CardTitle>
          <CardDescription>
            {new Date(report.created_at).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            Responder -{" "}
            <span className="font-semibold"> {report.responder.type}</span>
            <br />
            Description - {report.description} <br />
            Address - {report.address} <br />
            Status -
          </p>

          <RadioGroup
            name="status"
            defaultValue={selectedStatus}
            onValueChange={handleChangeStatus}
          >
            {status.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label htmlFor={item}>{item}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader className="animate-spin" /> : "Update Emergency"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
