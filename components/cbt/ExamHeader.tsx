"use client";

import React, { useEffect } from "react";
import { Clock, Globe, Info, Maximize2, Minimize2 } from "lucide-react";
import { useExamStore } from "../../lib/store/useExamStore";
import { formatTime } from "../../lib/utils";

interface ExamHeaderProps {
  onShowInstructions: () => void;
}

export const ExamHeader: React.FC<ExamHeaderProps> = ({ onShowInstructions }) => {
  const {
    testTitle,
    remainingSeconds,
    decrementTimer,
    language,
    setLanguage,
    questions,
    currentSection,
    setCurrentSection,
    responses,
  } = useExamStore();

  // Extract distinct sections
  const sections = Array.from(new Set(questions.map((q) => q.sectionName)));

  // Countdown timer tick effect
  useEffect(() => {
    const timer = setInterval(() => {
      decrementTimer();
    }, 1000);
    return () => clearInterval(timer);
  }, [decrementTimer]);

  const isLowTime = remainingSeconds < 300; // Under 5 minutes

  return (
    <header className="bg-white border-b border-slate-200 shadow-xs select-none">
      {/* Top Test Title & Global Controls */}
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
            F
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              {testTitle || "Mock Test Assessment"}
            </h1>
            <div className="text-[11px] text-slate-500 font-medium">
              Standard Computer Based Test (CBT) Interface
            </div>
          </div>
        </div>

        {/* Right side controls: Language + Instructions + Timer */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded ${language === "en" ? "bg-white text-blue-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2 py-1 rounded ${language === "hi" ? "bg-white text-blue-600 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"}`}
            >
              हिन्दी
            </button>
          </div>

          {/* Instructions button */}
          <button
            onClick={onShowInstructions}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-blue-500" />
            Instructions
          </button>

          {/* Server Timer Box */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm sm:text-base shadow-xs ${
            isLowTime
              ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
              : "bg-blue-50 text-blue-700 border-blue-200"
          }`}>
            <Clock className="w-4 h-4 text-inherit" />
            <span>Time Left: {formatTime(remainingSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto bg-slate-50 border-t border-slate-100 scrollbar-none">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
          Sections:
        </span>
        {sections.map((secName, idx) => {
          const isActive = currentSection === secName;
          const sectionQuestions = questions.filter((q) => q.sectionName === secName);
          const answeredCount = sectionQuestions.filter(
            (q) => responses[q.id]?.status === "answered" || responses[q.id]?.status === "answered_marked"
          ).length;

          return (
            <button
              key={idx}
              onClick={() => setCurrentSection(secName)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <span>{secName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {answeredCount}/{sectionQuestions.length}
              </span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
