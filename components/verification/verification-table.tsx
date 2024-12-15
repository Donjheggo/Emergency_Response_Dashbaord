import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
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
import { GetVerification, TotalVerification } from "@/lib/actions/verification";
import { TablePagination } from "./verification-pagination";
import DeleteButton from "./delete-button";
import ImageDialog from "./image-dialog";

export async function VerificationTable({
  searchQuery,
  page,
  items_per_page,
}: {
  searchQuery: string;
  page: number;
  items_per_page: number;
}) {
  const [verification, totalVerification] = await Promise.all([
    GetVerification(searchQuery, page, items_per_page),
    TotalVerification(),
  ]);

  const totalPages = totalVerification / items_per_page;

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>Manage the emergency verification.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Selfie Image</TableHead>
              <TableHead>ID Front Image</TableHead>
              <TableHead>ID Back Image</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verification.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <ImageDialog image={item.selfie_image} title="Selfie Image" />
                </TableCell>
                <TableCell>
                  <ImageDialog
                    image={item.id_front_image}
                    title="ID Front Image"
                  />
                </TableCell>
                <TableCell>
                  <ImageDialog
                    image={item.id_back_image}
                    title="ID Back Image"
                  />
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
          <strong>{Math.min(page * items_per_page, totalVerification)}</strong>{" "}
          of <strong>{totalVerification}</strong> verification
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
