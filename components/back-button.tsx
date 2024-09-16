import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function BackButton({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-1 hover:font-semibold">
      <MoveLeft />
      Back
    </Link>
  );
}
