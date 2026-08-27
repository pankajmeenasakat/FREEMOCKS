import React from "react";
import Link from "next/link";
import { Clock, HelpCircle, Award, Play, Eye } from "lucide-react";
import { SectionalTestItem } from "../../lib/mock-data/exams";

interface SectionalTestCardProps {
  test: SectionalTestItem;
}

export const SectionalTestCard: React.FC<SectionalTestCardProps> = ({ test }) => {
  return (
    <div className={`bg-white rounded-xl border p-4 transition-all shadow-xs ${
      test.isAttempted ? "border-emerald-200 bg-emerald-50/20" : "border-slate-200 hover:border-blue-400"
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">
            {test.title}
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              {test.questionsCount} Questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {test.durationMins} Mins
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-500" />
              {test.totalMarks} Marks
            </span>
          </div>

          {/* Attempt Summary Bar (Ref Image 7) */}
          {test.isAttempted && (
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="text-slate-900 font-bold">{test.score?.toFixed(2)} / {test.totalMarks}</span>
                <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full text-[11px] font-bold">
                  {test.accuracy}% Accuracy
                </span>
              </div>

              {/* Triple Split Score Progress Bar */}
              <div className="w-full max-w-md h-2 rounded-full overflow-hidden flex bg-slate-200">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${((test.correctCount || 0) / test.questionsCount) * 100}%` }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${((test.wrongCount || 0) / test.questionsCount) * 100}%` }}
                />
                <div
                  className="bg-slate-400 h-full"
                  style={{ width: `${((test.skippedCount || 0) / test.questionsCount) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> {test.correctCount} Correct
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> {test.wrongCount} Wrong
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400" /> {test.skippedCount} Skipped
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-2 shrink-0">
          {test.isAttempted ? (
            <Link
              href="/exam/cgl-tier1-mock-2026/result"
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              View Solutions
            </Link>
          ) : (
            <Link
              href="/exam/cgl-tier1-mock-2026/live"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              Start Test
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};
