"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { PlusCircle, Eye, EyeOff, Pencil, Clock, CheckCircle2, BookOpen, Trash2, RefreshCw } from "lucide-react";
import { getAllTestsForAdmin, togglePublishTest, deleteTest, type TestRow } from "./actions";

export default function AdminTestsPage() {
  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadTests = async () => {
    setLoading(true);
    const data = await getAllTestsForAdmin();
    setTests(data);
    setLoading(false);
  };

  useEffect(() => { loadTests(); }, []);

  const handleTogglePublish = (id: string, current: boolean) => {
    startTransition(async () => {
      await togglePublishTest(id, !current);
      await loadTests();
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteTest(id);
      await loadTests();
    });
  };

  const publishedCount = tests.filter((t) => t.is_published).length;
  const draftCount = tests.filter((t) => !t.is_published).length;

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
        <div className="flex items-center gap-2">
          <button
            onClick={loadTests}
            disabled={loading}
            className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link
            href="/admin/tests/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            New Test
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#181D24] border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500 gap-3">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading tests from database...</span>
          </div>
        ) : tests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-6">
            <div className="text-4xl mb-3">📭</div>
            <h3 className="text-white font-bold mb-1">No tests yet</h3>
            <p className="text-slate-500 text-sm mb-4">Create your first test to get started.</p>
            <Link
              href="/admin/tests/create"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
            >
              + Create Test
            </Link>
          </div>
        ) : (
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
                        <div className="text-[10px] text-slate-500 mt-0.5">{test.exam_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                      {test.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center hidden sm:table-cell">
                    <span className="text-xs font-bold text-slate-300">{test.total_tests}</span>
                  </td>
                  <td className="px-4 py-4 text-center hidden sm:table-cell">
                    <span className="text-xs font-bold text-emerald-400">{test.free_tests}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {test.is_published ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {/* Publish Toggle */}
                      <button
                        onClick={() => handleTogglePublish(test.id, test.is_published)}
                        disabled={isPending}
                        title={test.is_published ? "Unpublish" : "Publish"}
                        className={`p-1.5 rounded-lg text-xs transition-colors disabled:opacity-40 ${
                          test.is_published
                            ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                        }`}
                      >
                        {test.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {/* Add Questions */}
                      <Link
                        href="/admin/questions/create"
                        title="Add Questions"
                        className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                      </Link>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(test.id, test.title)}
                        disabled={isPending}
                        title="Delete Test"
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors disabled:opacity-40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
