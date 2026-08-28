"use client";

import React from "react";
import Link from "next/link";
import {
  PlusCircle,
  BookOpen,
  ListChecks,
  Users,
  FileText,
  TrendingUp,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const stats = [
  { label: "Total Tests", value: "1", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Published", value: "1", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { label: "Coming Soon", value: "5", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
  { label: "Total Questions", value: "0", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const quickActions = [
  {
    label: "Create New Test",
    desc: "Add a new exam paper to the platform",
    href: "/admin/tests/create",
    icon: PlusCircle,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    label: "Add Question",
    desc: "Write bilingual question with KaTeX math",
    href: "/admin/questions/create",
    icon: BookOpen,
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    label: "Manage Tests",
    desc: "Publish, edit or delete existing tests",
    href: "/admin/tests",
    icon: ListChecks,
    color: "bg-slate-700 hover:bg-slate-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white">Admin Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">Manage tests, questions and content for freemocks.in</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`bg-[#181D24] border rounded-xl p-4 flex items-center gap-3 ${stat.bg}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} border`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                href={action.href}
                className={`${action.color} text-white rounded-xl p-5 flex flex-col gap-3 transition-all shadow-lg group`}
              >
                <Icon className="w-6 h-6 opacity-90 group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-bold text-sm">{action.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">{action.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
        <div>
          <div className="text-sm font-bold text-amber-300">Tests Being Uploaded</div>
          <p className="text-xs text-amber-400/80 mt-1">
            5 test series are currently marked as <strong>Coming Soon</strong>. Go to{" "}
            <Link href="/admin/tests" className="underline hover:text-amber-200">Manage Tests</Link> to
            publish them once questions are uploaded.
          </p>
        </div>
      </div>

      {/* Upload Flow Guide */}
      <div className="bg-[#181D24] border border-slate-800 rounded-xl p-6">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-400" />
          How to Upload a Test
        </h2>
        <ol className="space-y-3">
          {[
            { step: "1", text: "Go to Create Test → fill exam name, duration, total marks & total questions", link: "/admin/tests/create" },
            { step: "2", text: "Go to Add Question → write bilingual questions with KaTeX math preview", link: "/admin/questions/create" },
            { step: "3", text: "Go to Manage Tests → click Publish to make the test live for students", link: "/admin/tests" },
          ].map((s) => (
            <li key={s.step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {s.step}
              </div>
              <div className="text-xs text-slate-300">
                {s.text}{" "}
                <Link href={s.link} className="text-blue-400 hover:text-blue-300 font-semibold">→ Go</Link>
              </div>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}
