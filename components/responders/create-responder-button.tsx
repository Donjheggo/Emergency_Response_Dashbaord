import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export default function CreateResponderButton() {
  return (
    <Link href="/dashboard/responders/create">
      <Button variant="default">
        <Plus className="mr-2"/>
        New Responder
      </Button>
    </Link>
  );
}
