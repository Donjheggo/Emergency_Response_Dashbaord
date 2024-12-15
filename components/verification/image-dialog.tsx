import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ImageDialog({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image className="cursor-pointer" src={image} width="100" height="100" alt="selfie_image" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <Image src={image} width="750" height="750" alt="selfie_image" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
