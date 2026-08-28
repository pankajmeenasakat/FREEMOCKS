"use server";

import { getSupabaseAdmin } from "../../../lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function saveQuestion(formData: {
  test_id: string;
  section_name: string;
  order_index: number;
  content: {
    en: { question: string; options: { id: string; text: string }[]; explanation?: string };
    hi: { question: string; options: { id: string; text: string }[]; explanation?: string };
  };
  correct_option_id: string;
  scoring: { positive: number; negative: number };
}) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from("questions")
    .insert(formData);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/questions/create");
}

export async function getTestsForDropdown() {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("tests_catalog")
      .select("id, title, exam_name")
      .order("created_at", { ascending: false });

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
