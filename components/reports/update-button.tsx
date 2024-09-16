import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function UpdateButton({ id }: { id: string | unknown }) {
  return (
    <Link
      href={`/dashboard/reports/${id}/update`}
      className="flex items-center text-base gap-2"
    >
      <ExternalLink width={18} /> Open
    </Link>
  );
}
