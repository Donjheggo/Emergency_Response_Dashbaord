import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateUserButton() {
  return (
    <Link href="/dashboard/users/create">
      <Button variant="default">
        <Plus className="mr-2"/>
        New User
      </Button>
    </Link>
  );
}
