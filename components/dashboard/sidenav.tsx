"use client";

import { createClient } from "@/lib/supabase/client";
import {
  LogOut,
  LayoutDashboard,
  UsersRound,
  NotebookPen,
  Ambulance,
} from "lucide-react";
import { ThemeToggler } from "../themes/theme-toggler";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/adaptive-icon.png";

export default function Sidenav() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/sign-in");
  };

  return (
    <aside className="hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6 ">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Image src={logo} alt="logo" width={25} height={25} />
            <span>Emergency Response</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Admin
              </p>
              {dashboardLinks.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="flex items-center gap-2 hover:bg-muted rounded-md p-2"
                >
                  {item.icon}
                  <h1 className="text-md">{item.name}</h1>
                </Link>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-sm font-medium text-muted-foreground pb-2 max-w-[248px] truncate">
                Settings
              </p>
              <div className="flex items-center gap-2">
                <ThemeToggler>Theme</ThemeToggler>
              </div>
              <form>
                <button
                  onClick={handleSignout}
                  type="submit"
                  className="text-md flex items-center gap-2 hover:bg-muted rounded-md p-2 w-full"
                >
                  <LogOut />
                  Logout
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}

export const dashboardLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Emergency Reports",
    href: "/dashboard/reports",
    icon: <NotebookPen />,
  },
  {
    name: "Responders",
    href: "/dashboard/responders",
    icon: <Ambulance />,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: <UsersRound />,
  },
];
