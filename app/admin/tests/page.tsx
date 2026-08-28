"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Eye, EyeOff, Pencil, Clock, CheckCircle2, BookOpen } from "lucide-react";
import { POPULAR_TEST_SERIES } from "../../../lib/mock-data/exams";

export default function AdminTestsPage() {
  const [tests, setTests] = useState(
    POPULAR_TEST_SERIES.map((s) => ({
      ...s,
      published: !s.comingSoon,
    }))
  );

  const togglePublish = (id: string) => {
    setTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published, comingSoon: t.published } : t))
    );
  };

  const publishedCount = tests.filter((t) => t.published).length;
  const draftCount = tests.filter((t) => !t.published).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Tests</h1>
          <p className="text-sm text-slate-400 mt-1">
            <span className="text-emerald-400 font-bold">{publishedCount} Published</span>
            <span className="text-slate-600 mx-2">·</span>
            <span className="text-amber-400 font-bold">{draftCount} Coming Soon</span>
          </p>
        </div>
        <Link
          href="/admin/tests/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          New Test
        </Link>
      </div>

      {/* Tests Table */}
      <div className="bg-[#181D24] border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="text-left px-5 py-3">Test Name</th>
              <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
              <th className="text-center px-4 py-3 hidden sm:table-cell">Tests</th>
              <th className="text-center px-4 py-3 hidden sm:table-cell">Free</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{test.logo}</div>
                    <div>
                      <div className="text-xs font-bold text-white line-clamp-1">{test.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{test.examName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                    {test.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-center hidden sm:table-cell">
                  <span className="text-xs font-bold text-slate-300">{test.totalTests}</span>
                </td>
                <td className="px-4 py-4 text-center hidden sm:table-cell">
                  <span className="text-xs font-bold text-emerald-400">{test.freeTests}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  {test.published ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> Coming Soon
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => togglePublish(test.id)}
                      title={test.published ? "Unpublish" : "Publish"}
                      className={`p-1.5 rounded-lg text-xs transition-colors ${
                        test.published
                          ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                      }`}
                    >
                      {test.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <Link
                      href="/admin/questions/create"
                      title="Add Questions"
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/admin/tests/create"
                      title="Edit Test"
                      className="p-1.5 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-700 border border-slate-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-600 text-center">
        Note: Publish/Unpublish here updates the UI. Wire this to Supabase <code>is_published</code> to persist.
      </p>
    </div>
  );
}
