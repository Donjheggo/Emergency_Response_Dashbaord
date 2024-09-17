"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { UpdateResponder, type ResponderT } from "@/lib/actions/responders";

export default function UpdateResponderForm({
  responder,
}: {
  responder: ResponderT;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<ResponderT>({
    type: responder.type,
    mobile_number: responder.mobile_number,
    status: responder.status,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await UpdateResponder(responder.id!, form);
      if (error) {
        toast.error(`Error: ${error}`);
      }
      toast.success("Success");
      router.push("/dashboard/responders");
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
    console.log(form);
  };

  return (
    <form>
      <Card className="w-full md:w-[450px] shadow-none">
        <CardHeader>
          <CardTitle>Update Responder</CardTitle>
          <CardDescription>Update responder information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>Type</Label>
            <Input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div>
            <Label>Mobile Number</Label>
            <Input
              value={form.mobile_number}
              onChange={(e) =>
                setForm({ ...form, mobile_number: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={form.status ? "TRUE" : "FALSE"}
              onValueChange={(value) =>
                setForm({ ...form, status: value === "TRUE" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TRUE">Available</SelectItem>
                  <SelectItem value="FALSE">Unavailable</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader className="animate-spin" /> : "Update Responder"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
