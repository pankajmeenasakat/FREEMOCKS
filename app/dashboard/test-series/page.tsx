"use client";

import React, { useEffect, useState } from "react";
import { TestSeriesCard } from "../../../components/dashboard/TestSeriesCard";
import { RefreshCw } from "lucide-react";
import { supabase } from "../../../lib/supabase";

const subCategories = [
  "All",
  "SSC Exams",
  "Railways Exams",
  "Banking Exams",
  "Teaching Exams",
  "Civil Services Exam",
  "Engineering Recruitment",
  "Defence & Police",
  "State Exams",
];

export default function TestSeriesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [allSeries, setAllSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      setLoading(true);
      const { data, error } = await supabase
        .from("tests_catalog")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setAllSeries(data);
      } else {
        // Fallback to mock data if Supabase not configured yet
        const { POPULAR_TEST_SERIES } = await import("../../../lib/mock-data/exams");
        setAllSeries(POPULAR_TEST_SERIES.map((s) => ({
          id: s.id,
          title: s.title,
          exam_name: s.examName,
          category: s.category,
          total_tests: s.totalTests,
          free_tests: s.freeTests,
          user_count: s.userCount,
          languages: s.languages,
          features: s.features,
          logo: s.logo,
          is_published: !s.comingSoon,
          completed_tests: s.completedTests,
          progress_percent: s.progressPercent,
        })));
      }
      setLoading(false);
    }
    fetchTests();
  }, []);

  const filteredSeries =
    selectedCategory === "All"
      ? allSeries
      : allSeries.filter((s) =>
          s.category?.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  // Map DB rows to TestSeriesCard props
  const toCardProps = (s: any) => ({
    id: s.id,
    title: s.title,
    examName: s.exam_name ?? s.examName,
    category: s.category,
    totalTests: s.total_tests ?? s.totalTests,
    freeTests: s.free_tests ?? s.freeTests,
    userCount: s.user_count ?? s.userCount ?? "—",
    languages: s.languages ?? ["English", "Hindi"],
    features: s.features ?? [],
    logo: s.logo ?? "🏛️",
    comingSoon: s.is_published === false,
    completedTests: s.completed_tests ?? s.completedTests,
    progressPercent: s.progress_percent ?? s.progressPercent,
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Test Series Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore mock test packages, bilingual chapter tests &amp; previous year papers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Category sidebar */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-2 shadow-xs space-y-1">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            Categories
          </div>
          {subCategories.map((cat, idx) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-slate-100 text-slate-900 font-bold border-l-4 border-cyan-500 pl-2.5"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="lg:col-span-9 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading test series...</span>
            </div>
          ) : filteredSeries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-200 text-center px-6">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-lg font-extrabold text-slate-800 mb-1">Coming Soon!</h3>
              <p className="text-sm text-slate-500 max-w-sm">
                We&apos;re working hard to upload tests for this category. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSeries.map((s) => (
                <TestSeriesCard key={s.id} series={toCardProps(s)} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
