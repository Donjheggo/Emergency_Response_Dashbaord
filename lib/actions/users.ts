"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/client";
import { notFound } from "next/navigation";

const supabase = createClient();

export async function TotalUsers() {
  const { data, error } = await supabase.from("user").select("*");

  if (error) {
    return 0;
  }

  return data.length;
}

export async function GetUsers(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  let query = supabase
    .from("user")
    .select("*")
    .order("created_at", { ascending: false })
    .range((page - 1) * items_per_page, page * items_per_page - 1); // Add pagination

  // Apply search filter if there is a search query
  if (searchQuery) {
    query = query.or(`email.ilike.%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data;
}

export type UserT = {
  id?: string;
  email?: string;
  role: "USER" | "ADMIN";
};

export async function UpdateUser(
  id: string,
  form: UserT
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase
    .from("user")
    .update({
      role: form.role,
    })
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}

export async function GetUserById(id: string) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return notFound();
  }

  return data;
}

export async function DeleteUser(
  id: string
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase.from("user").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/users");
  return { success: true };
}
