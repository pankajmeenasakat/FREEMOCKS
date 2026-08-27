import React from "react";
import Link from "next/link";
import { Zap, Languages, Plus } from "lucide-react";
import { TestSeriesItem } from "../../lib/mock-data/exams";

interface TestSeriesCardProps {
  series: TestSeriesItem;
}

export const TestSeriesCard: React.FC<TestSeriesCardProps> = ({ series }) => {
  const hasProgress = typeof series.completedTests === "number";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div className="p-4 space-y-3">
        {/* Top bar: Icon + User count badge */}
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-base border border-amber-200">
            {series.logo}
          </div>
          <span className="bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
            {series.userCount}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 min-h-[36px]">
            {series.title}
          </h3>

          {/* Test count or Attempt status */}
          {hasProgress ? (
            <div className="mt-1 flex items-center justify-between text-[11px] font-semibold text-slate-500">
              <span>{series.completedTests}/{series.totalTests} Tests</span>
              <span>{series.progressPercent}%</span>
            </div>
          ) : (
            <div className="mt-1 text-[11px] font-semibold text-slate-500">
              {series.totalTests} Total Tests | <span className="text-emerald-600 font-bold">{series.freeTests} Free Tests</span>
            </div>
          )}
        </div>

        {/* Language */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <Languages className="w-3 h-3 text-blue-500" />
          <span>{series.languages.join(", ")}</span>
        </div>

        {/* Bullet points */}
        <ul className="space-y-1 text-[11px] text-slate-600 pt-1">
          {series.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </li>
          ))}
          {series.features.length > 3 && (
            <li className="text-emerald-600 font-bold text-[10px] pl-3">
              {series.features[3]}
            </li>
          )}
        </ul>
      </div>

      {/* Footer CTA Buttons (Ref Image 6) */}
      <div className="p-3 pt-0 flex items-center gap-2">
        <Link
          href="/exam/cgl-tier1-mock-2026/live"
          className="flex-1 text-center py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
        >
          {hasProgress ? "Go To Test Series" : "View Test Series"}
        </Link>
        <button
          className="p-2 border border-slate-200 hover:border-cyan-500 rounded-lg text-slate-500 hover:text-cyan-600 transition-colors"
          title="Add to My Bookmarks"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
