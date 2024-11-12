import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetUsers } from "@/lib/actions/users";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

export default async function UsersTable() {
  const [users] = await Promise.all([GetUsers("", 1, 5)]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Users
          <Link href="/users" className="ml-auto">
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
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>

              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-medium">{item.email}</p>
                  {new Date(item.created_at).toDateString()}
                </TableCell>
                <TableCell>
                  <p className="font-medium">{item.role}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
