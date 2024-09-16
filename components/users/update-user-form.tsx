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
  SelectLabel,
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
import { UpdateUser, type UserT } from "@/lib/actions/users";

export default function UpdateUserForm({ user }: { user: UserT }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<UserT>({
    role: user.role,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error } = await UpdateUser(user.id!, form);
      if (error) {
        toast.error(`Error: ${error}`);
      }
      toast.success("Success");
      router.push("/dashboard/users");
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
          <CardTitle>{user.email}</CardTitle>
          <CardDescription>Update user information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(value) =>
                setForm({ ...form, role: value as "USER" | "ADMIN" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader className="animate-spin" /> : "Update User"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
