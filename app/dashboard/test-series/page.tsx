"use client";

import React, { useState } from "react";
import { POPULAR_TEST_SERIES } from "../../../lib/mock-data/exams";
import { TestSeriesCard } from "../../../components/dashboard/TestSeriesCard";
import { Search } from "lucide-react";

export default function TestSeriesCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const subCategories = [
    "All",
    "Regulatory Body Exams",
    "PG Entrance Exam",
    "SSC",
    "Teaching Exams",
    "Fitter",
    "Electrician",
    "AE/JE Exams",
    "Judiciary Exams",
    "Paramedical Exams",
    "Electronic Mechanic",
    "Railways",
    "Banking & Insurance",
    "State Exams",
  ];

  const filteredSeries = selectedCategory === "All"
    ? POPULAR_TEST_SERIES
    : POPULAR_TEST_SERIES.filter((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Test Series Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Explore 670+ All India live mock test packages, bilingual chapter tests & previous year papers
          </p>
        </div>
      </div>

      {/* Main Grid: Left Category Sub-Navigation + Right Cards Grid (Ref Image 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Category Sub-List (Ref Image 6) */}
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

        {/* Right Cards Grid (Ref Image 6) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSeries.map((series) => (
              <TestSeriesCard key={series.id} series={series} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
