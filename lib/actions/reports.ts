"use server";

import { createClient } from "../supabase/client";
import { notFound } from "next/navigation";

const supabase = createClient();

export async function TotalEmergencyReports() {
  const { data, error } = await supabase.from("emergency").select("*");

  if (error) {
    return 0;
  }

  return data.length;
}

export async function TotalUnreadEmergencyReports() {
  const { data, error } = await supabase
    .from("emergency")
    .select("*")
    .eq("isRead", false);

  if (error) {
    return 0;
  }
  return data.length;
}

export async function GetEmergencyReports(
  searchQuery: string,
  page: number,
  items_per_page: number
) {
  let query = supabase
    .from("emergency")
    .select(`*, responder ( type ), user ( email )`)
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

export async function GetEmergencyById(id: string) {
  const { data, error } = await supabase
    .from("emergency")
    .select(`*, responder ( type ), user ( email )`)
    .eq("id", id)
    .single();

  if (error) {
    return notFound();
  }

  return data;
}

export async function ReadEmergency(
  id: string
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase
    .from("emergency")
    .update({ isRead: true })
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }

  // No need because realtime subscription is added
  // revalidatePath("/dashboard/reports");
  return { success: true };
}

export async function UpdateEmergency(
  id: string,
  status: string
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase
    .from("emergency")
    .update({ status: status })
    .eq("id", id)
    .select();

  if (error) {
    return { error: error.message };
  }
  // No need because realtime subscription is added
  // revalidatePath("/dashboard/reports");
  return { success: true };
}

export async function DeleteEmergency(
  id: string
): Promise<{ error?: string; success?: boolean }> {
  const { error } = await supabase.from("emergency").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }
  // No need because realtime subscription is added
  // revalidatePath("/dashboard/reports");
  return { success: true };
}
