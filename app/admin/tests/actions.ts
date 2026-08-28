"use server";

import { supabaseAdmin } from "../../../lib/supabase-admin";
import { revalidatePath } from "next/cache";

export interface TestRow {
  id: string;
  title: string;
  exam_name: string;
  category: string;
  total_tests: number;
  free_tests: number;
  duration_seconds: number;
  total_marks: number;
  total_questions: number;
  languages: string[];
  features: string[];
  logo: string;
  is_published: boolean;
  created_at: string;
}

// ─── READ ────────────────────────────────────────────────
export async function getAllTestsForAdmin(): Promise<TestRow[]> {
  const { data, error } = await supabaseAdmin
    .from("tests_catalog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllTestsForAdmin error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getPublishedTests(): Promise<TestRow[]> {
  const { data, error } = await supabaseAdmin
    .from("tests_catalog")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPublishedTests error:", error.message);
    return [];
  }
  return data ?? [];
}

// ─── CREATE ──────────────────────────────────────────────
export async function createTest(formData: {
  title: string;
  exam_name: string;
  category: string;
  total_tests: number;
  free_tests: number;
  duration_seconds: number;
  total_marks: number;
  total_questions: number;
  languages: string[];
  features: string[];
  logo: string;
}) {
  const { error } = await supabaseAdmin
    .from("tests_catalog")
    .insert({ ...formData, is_published: false });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tests");
  revalidatePath("/dashboard/test-series");
  revalidatePath("/");
}

// ─── PUBLISH / UNPUBLISH ─────────────────────────────────
export async function togglePublishTest(id: string, publish: boolean) {
  const { error } = await supabaseAdmin
    .from("tests_catalog")
    .update({ is_published: publish })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tests");
  revalidatePath("/dashboard/test-series");
  revalidatePath("/");
}

// ─── DELETE ──────────────────────────────────────────────
export async function deleteTest(id: string) {
  const { error } = await supabaseAdmin
    .from("tests_catalog")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/tests");
  revalidatePath("/dashboard/test-series");
  revalidatePath("/");
}
