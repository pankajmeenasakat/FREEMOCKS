"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const EXAM_CATEGORIES_LIST = [
  "SSC Exams",
  "Railways Exams",
  "Banking Exams",
  "Teaching Exams",
  "Civil Services Exam",
  "Engineering Recruitment",
  "Defence & Police",
  "State Exams",
];

export default function AdminCreateTestPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    examName: "",
    category: "SSC Exams",
    totalTests: "",
    freeTests: "",
    durationMinutes: "60",
    totalMarks: "200",
    totalQuestions: "100",
    languages: ["English", "Hindi"],
    features: ["", "", "", ""],
    logo: "🏛️",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));
  const updateFeature = (i: number, val: string) => {
    const f = [...form.features];
    f[i] = val;
    setForm((prev) => ({ ...prev, features: f }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      setTimeout(() => router.push("/admin/tests"), 1500);
    }, 800);
  };

  const logoOptions = ["🏛️", "🚆", "🎓", "📰", "💼", "🛡️", "⚙️", "📊"];

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/tests" className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-white">Create New Test</h1>
          <p className="text-xs text-slate-400">Add a new exam / test series to the platform</p>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold px-4 py-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4" />
          Test created! Redirecting to tests list...
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">

        {/* Basic Info */}
        <div className="bg-[#181D24] border border-slate-800 rounded-xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Basic Information</h2>

          {/* Logo picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Emoji Logo</label>
            <div className="flex gap-2 flex-wrap">
              {logoOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => update("logo", emoji)}
                  className={`w-10 h-10 text-xl rounded-lg border transition-all ${
                    form.logo === emoji
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-slate-700 bg-slate-800 hover:border-slate-500"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Full Test Series Title</label>
              <input
                required
                type="text"
                placeholder="e.g. SSC CGL Mock Test Series 2026 (Tier I & Tier II)"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Exam Name (Short)</label>
              <input
                required
                type="text"
                placeholder="e.g. SSC CGL"
                value={form.examName}
                onChange={(e) => update("examName", e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-900 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {EXAM_CATEGORIES_LIST.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Test Numbers */}
        <div className="bg-[#181D24] border border-slate-800 rounded-xl p-6 space-y-5">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Structure</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Tests", key: "totalTests", placeholder: "2348" },
              { label: "Free Tests", key: "freeTests", placeholder: "68" },
              { label: "Duration (mins)", key: "durationMinutes", placeholder: "60" },
              { label: "Total Marks", key: "totalMarks", placeholder: "200" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">{field.label}</label>
                <input
                  required
                  type="number"
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form] as string}
                  onChange={(e) => update(field.key, e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#181D24] border border-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Highlight Features (shown on card)</h2>
          {form.features.map((feat, i) => (
            <div key={i}>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">Feature {i + 1}</label>
              <input
                type="text"
                placeholder={["e.g. 5 Live Tests (All India Ranking)", "e.g. 139 PYQ Live Tests", "e.g. 22 Tricky Quant Solutions", "e.g. +2182 Subject & Chapter Tests"][i]}
                value={feat}
                onChange={(e) => updateFeature(i, e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-slate-900 border border-slate-700 text-white placeholder:text-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Test"}
          </button>
          <Link href="/admin/tests" className="text-xs text-slate-500 hover:text-slate-300 font-medium">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
