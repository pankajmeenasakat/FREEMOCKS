import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Zap, Clock, Play, BarChart3, CheckCircle2 } from "lucide-react";
import { POPULAR_TEST_SERIES, SECTIONAL_TESTS } from "../../lib/mock-data/exams";
import { TestSeriesCard } from "../../components/dashboard/TestSeriesCard";
import { SectionalTestCard } from "../../components/dashboard/SectionalTestCard";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Zap className="w-3.5 h-3.5 fill-current text-amber-300" /> SSC CGL 2026 Target Batch
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, Pankaj! 🚀
          </h1>
          <p className="text-sm text-blue-100 max-w-xl">
            You've completed 4 mock tests this week. Your average score improved by +14.5% compared to previous attempts.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/exam/cgl-tier1-mock-2026/live"
            className="px-5 py-3 bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-blue-700" />
            Resume Live Mock #01
          </Link>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Overall Accuracy</div>
            <div className="text-lg font-extrabold text-slate-900">82.4%</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Tests Attempted</div>
            <div className="text-lg font-extrabold text-slate-900">18 Tests</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Predicted AIR</div>
            <div className="text-lg font-extrabold text-slate-900">#412 / 1.4L</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500">Avg Time per Q</div>
            <div className="text-lg font-extrabold text-slate-900">42 Seconds</div>
          </div>
        </div>
      </div>

      {/* Recommended Test Series (Ref Image 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900">My Active Test Series</h2>
          <Link href="/dashboard/test-series" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_TEST_SERIES.slice(0, 3).map((series) => (
            <TestSeriesCard key={series.id} series={series} />
          ))}
        </div>
      </div>

      {/* Sectional Speed Tests (Ref Image 7) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Sectional Tests & Drills</h2>
            <p className="text-xs text-slate-500">Sharpen your section-wise score and speed metrics</p>
          </div>
          <Link href="/dashboard/sectional" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Explore All 60 Tests <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {SECTIONAL_TESTS.map((test) => (
            <SectionalTestCard key={test.id} test={test} />
          ))}
        </div>
      </div>

    </div>
  );
}
