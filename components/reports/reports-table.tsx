"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetEmergencyReports,
  TotalEmergencyReports,
} from "@/lib/actions/reports";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TablePagination } from "./report-pagination";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";

export function ReportsTable({
  searchQuery,
  page,
  items_per_page,
}: {
  searchQuery: string;
  page: number;
  items_per_page: number;
}) {
  const supabase = createClient();
  const [reports, setReports] = useState<any[]>([]);
  const [totalReports, setTotalReports] = useState<number>(0);
  const totalPages = totalReports / items_per_page;

  useEffect(() => {
    const fetchReports = async () => {
      const [data, totalReports] = await Promise.all([
        GetEmergencyReports(searchQuery, page, items_per_page),
        TotalEmergencyReports(),
      ]);
      setReports(data);
      setTotalReports(totalReports);
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
  }, [searchQuery, page, items_per_page]);

  console.log(reports);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Emergency Reports</CardTitle>
        <CardDescription>
          Manage the emergency reports and view the details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Responder</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.user.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.responder.type}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.status.toUpperCase()}</Badge>
                </TableCell>
                <TableCell className="table-cell">
                  {new Date(item.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="p-0">
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="p-0">
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalReports)}</strong> of{" "}
          <strong>{totalReports}</strong> products
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
