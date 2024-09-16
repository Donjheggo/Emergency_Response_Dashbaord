"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/client";
import { notFound } from "next/navigation";

const supabase = createClient();

export async function TotalResponders() {
  const { data, error } = await supabase.from("responder").select("*");

  if (error) {
    return 0;
  }

  return data.length;
}

export async function GetResponders(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  let query = supabase
    .from("responder")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * items_per_page, page * items_per_page - 1); // Add pagination

  // Apply search filter if there is a search query
  if (searchQuery) {
    query = query.or(`description.ilike.%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
}

export async function GetResponderById(id: string) {
  const { data, error } = await supabase
    .from("responder")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return notFound();
  }

  return data;
}

export type ResponderT = {
  id?: string;
  type: string;
  mobile_number: string;
  status: boolean;
};
export async function CreateResponder(
  form: ResponderT
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase
    .from("responder")
    .insert([
      {
        type: form.type,
        mobile_number: form.mobile_number,
        status: form.status,
      },
    ])
    .select();

  if (error) {
    return { error: error.message };
  }

  console.log(form);

  revalidatePath("/dashboard/responders");
  return { success: true };
}

export async function UpdateResponder(
  id: string,
  form: ResponderT
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase
    .from("responder")
    .update({
      type: form.type,
      mobile_number: form.mobile_number,
      status: form.status,
    })
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/responders");
  return { success: true };
}

export async function DeleteResponder(
  id: string
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase.from("responder").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/responders");
  return { success: true };
}
