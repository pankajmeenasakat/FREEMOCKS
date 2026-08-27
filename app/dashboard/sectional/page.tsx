"use client";

import React from "react";
import { SECTIONAL_TESTS } from "../../../lib/mock-data/exams";
import { SectionalTestCard } from "../../../components/dashboard/SectionalTestCard";
import Link from "next/link";
import { Zap, Clock, ShieldCheck } from "lucide-react";

export default function SectionalTestsPage() {
  const quickCategories = [
    { title: "SSC MTS Live Test", icon: "🏛️" },
    { title: "IBPS RRB PO Live", icon: "🏦" },
    { title: "RRB Grade III", icon: "🚆" },
    { title: "JK Police SI Live", icon: "👮" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Sectional Tests [60 Tests]
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Target individual subjects with precise sectional countdown timers and instant KaTeX explanations
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              Freedom Fest Expires in: 04 : 07 : 16
            </span>
          </div>
        </div>

        {/* Quick Exam Chips (Ref Image 7) */}
        <div className="flex items-center gap-4 overflow-x-auto pt-2 pb-1 scrollbar-none">
          {quickCategories.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl cursor-pointer transition-all min-w-[100px] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs">
                {item.icon}
              </div>
              <div className="text-[11px] font-bold text-slate-800 leading-tight">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Banner Callout (Ref Image 7) */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-blue-950">
            SSC Super Practice : PYPs + 1000+ Tests | Beginner → Expert
          </div>
          <div className="text-xs text-blue-700 mt-0.5">
            Includes Most Repeated Qs, Speed + Revision Tests
          </div>
        </div>
        <Link
          href="/exam/cgl-tier1-mock-2026/live"
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors shrink-0 text-center"
        >
          View Series
        </Link>
      </div>

      {/* Sectional Test List (Ref Image 7) */}
      <div className="space-y-3">
        {SECTIONAL_TESTS.map((test) => (
          <SectionalTestCard key={test.id} test={test} />
        ))}
      </div>

    </div>
  );
}
