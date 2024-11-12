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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReadEmergency } from "@/lib/actions/reports";
import { ReportsT } from "../dashboard/reports-table";
import Image from "next/image";

const status = ["pending", "responded", "declined"];

export default function UpdateReportForm({ report }: { report: ReportsT }) {
  const [selectedStatus, setSelectedStatus] = useState(report.status);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const OpenEmergcy = async () => {
      ReadEmergency(report.id);
    };

    OpenEmergcy();
  }, [report.id]);

  const handleChangeStatus = (value: string) => {
    setSelectedStatus(value as "pending" | "responded" | "declined");
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await UpdateEmergency(report.id, selectedStatus);
      if (error) {
        toast.error(`Error: ${error}`);
      }
      toast.success("Success");
      router.push("/reports");
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <Card className="w-[350px] md:w-[650px] shadow-none">
        <div className="grid md:grid-cols-2 gap-4 p-4">
          <Image
            alt="Product image"
            className="aspect-square object-cover w-full rounded-xl"
            height="300"
            src={report.image}
            width="300"
          />
          <div className="w-full h-[300px]">
            <iframe
              className="rounded-xl w-full h-full"
              src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${report.address}&t=&z=16&ie=UTF8&iwloc=B&output=embed`}
              title="Emergency Location"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <CardHeader>
          <CardTitle>
            {report.name} <br />{" "}
          </CardTitle>
          <CardDescription>
            {report.user.email} <br />
            {new Date(report.created_at).toDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p>
            Responder -{" "}
            <span className="font-semibold"> {report.responder.type}</span>
            <br />
            Description - {report.description} <br />
          </p>
          <p>Status -</p>
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
