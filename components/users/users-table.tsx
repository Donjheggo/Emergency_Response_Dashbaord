import { MoreHorizontal } from "lucide-react";
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
import { GetUsers, TotalUsers } from "@/lib/actions/users";
import { TablePagination } from "../table-pagination";
import UpdateButton from "./update-user-button";
import DeleteButton from "./delete-button";

export async function UsersTable({
  searchQuery,
  page,
  items_per_page,
}: {
  searchQuery: string;
  page: number;
  items_per_page: number;
}) {
  const [users, totalUsers] = await Promise.all([
    GetUsers(searchQuery, page, items_per_page),
    TotalUsers(),
  ]);

  const totalPages = totalUsers / items_per_page;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium">{item.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{item.role}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {item.verified ? "Verified" : "Not Verified"}
                  </p>
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
          <strong>{Math.min(page * items_per_page, totalUsers)}</strong> of{" "}
          <strong>{totalUsers}</strong> users
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
