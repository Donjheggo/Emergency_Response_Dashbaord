"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetEmergencyReports } from "@/lib/actions/reports";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { Tables } from "@/lib/supabase/types";

export default function ReportsTable() {
  const supabase = createClient();
  const [reports, setReports] = useState<ReportsT[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const [data] = await Promise.all([GetEmergencyReports("", 1, 5)]);
      setReports(data);
    };

    fetchReports();

    const subscription = supabase
      .channel("public:emergency")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "emergency",
        },
        fetchReports
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle className="flex items-center">
          Emergency Reports
          <Link href="/dashboard/reports" className="ml-auto">
            <Button className="flex items-center">
              <ExternalLink className="mr-2" />
              View All
            </Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Responder</TableHead>
              <TableHead>Responding Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Reading Status
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium">{item.user.email}</p>
                  <p> {new Date(item.created_at).toDateString()}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.responder.type}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.status.toUpperCase()}</Badge>
                </TableCell>
                <TableCell className="table-cell">
                  {item.isRead ? "Read" : "Unread"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

type ResponderT = Tables<"responder">;
export type ReportsT = {
  id: string;
  description: string;
  created_at: Date;
  address: string;
  responder: ResponderT;
  user: { email: string };
  isRead: boolean;
  status: "pending" | "responded" | "declined";
};
