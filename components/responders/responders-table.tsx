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
import { GetResponders, TotalResponders } from "@/lib/actions/responders";
import { TablePagination } from "../table-pagination";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";

export async function RespondersTable({
  searchQuery,
  page,
  items_per_page,
}: {
  searchQuery: string;
  page: number;
  items_per_page: number;
}) {
  const [responders, totalResponders] = await Promise.all([
    GetResponders(searchQuery, page, items_per_page),
    TotalResponders(),
  ]);

  const totalPages = totalResponders / items_per_page;

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Responders</CardTitle>
        <CardDescription>Manage the emergency responders.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Mobile Number</TableHead>
              <TableHead>Active Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responders.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium">{item.type}</p>
                </TableCell>
                <TableCell>{item.mobile_number}</TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {item.status ? "Available" : "Unavalaible"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
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
          <strong>{Math.min(page * items_per_page, totalResponders)}</strong> of{" "}
          <strong>{totalResponders}</strong> products
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
