"use client";

import { TrashIcon } from "lucide-react";
import { DeleteResponder } from "@/lib/actions/responders";
import { toast } from "react-toastify";

export default function DeleteButton({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      const { error } = await DeleteResponder(id);
      if (error) {
        toast.error(`Error: ${error}`);
      }
      toast.success("Success");
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div onClick={handleDelete} className="cursor-pointer w-full p-1">
      <span className="flex items-center gap-2 text-base text-red-500">
        <TrashIcon width={20} /> Delete
      </span>
    </div>
  );
}
