"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EXAM_CATEGORIES, POPULAR_EXAMS } from "../../lib/mock-data/exams";

export const PopularExamsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("ssc");

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Exams
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Get exam-ready with concepts, questions and study notes as per the latest pattern
          </p>
        </div>

        {/* Category Filter Pills (Ref Image 2) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EXAM_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border ${
                  isActive
                    ? "bg-cyan-500 text-white border-cyan-500 shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Exam Cards Grid (Ref Image 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_EXAMS.map((exam) => (
            <Link
              key={exam.id}
              href={`/dashboard/test-series?exam=${exam.slug}`}
              className="group bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 p-4 flex items-center justify-between shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-inner ${exam.iconBg}`}>
                  {exam.iconText}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {exam.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {exam.testsCount} Tests • {exam.freeTestsCount} Free Tests
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
