import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function UpdateButton({ id }: { id: string | unknown }) {
  return (
    <Link
      href={`/reports/${id}/update`}
      className="flex items-center text-base gap-2 w-full p-1"
    >
      <ExternalLink width={18} /> Open
    </Link>
  );
}
