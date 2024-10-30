import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested product</p>
      <Link href="/dashboard/reports">
        <Button variant="default">
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
      </Link>
    </main>
  );
}
