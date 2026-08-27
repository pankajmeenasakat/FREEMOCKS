import React from "react";
import Link from "next/link";
import { Zap, Languages, ArrowRight } from "lucide-react";
import { POPULAR_TEST_SERIES } from "../../lib/mock-data/exams";

export const TestSeriesSection: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Test Series
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Top recommended full mocks, chapter tests, live benchmark tests & PYP series
            </p>
          </div>
          <Link
            href="/dashboard/test-series"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 shrink-0"
          >
            Explore All Test Series <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid (Ref Image 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_TEST_SERIES.slice(0, 4).map((series) => (
            <div
              key={series.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-lg shadow-sm">
                    {series.logo}
                  </div>
                  <span className="bg-amber-100/90 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-600 text-amber-600" />
                    {series.userCount}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[40px]">
                    {series.title}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    {series.totalTests} Total Tests |{" "}
                    <span className="text-emerald-600 font-bold">{series.freeTests} Free Tests</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 font-medium pt-1 border-t border-slate-100">
                  <Languages className="w-3.5 h-3.5 text-blue-500" />
                  <span>{series.languages.join(", ")}</span>
                </div>

                {/* Features Bullet List (Ref Image 4) */}
                <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                  {series.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer Action */}
              <div className="p-4 pt-0">
                <Link
                  href={`/exam/cgl-tier1-mock-2026/live`}
                  className="block w-full text-center py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  View Test Series
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            href="/dashboard/test-series"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-cyan-500 text-cyan-600 hover:bg-cyan-50 font-bold text-xs sm:text-sm transition-colors"
          >
            Explore All Test Series
          </Link>
        </div>

      </div>
    </section>
  );
};
