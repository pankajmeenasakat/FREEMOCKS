"use client";

import React from "react";
import { useExamStore, QuestionStatus } from "../../lib/store/useExamStore";
import { CandidateCard } from "./CandidateCard";

interface QuestionPaletteProps {
  onSubmitClick: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({ onSubmitClick }) => {
  const {
    questions,
    currentQuestionIndex,
    jumpToQuestion,
    responses,
    currentSection,
  } = useExamStore();

  // Filter questions for the active section
  const sectionQuestions = questions.filter((q) => q.sectionName === currentSection);

  // Status breakdown calculations
  let countAnswered = 0;
  let countNotAnswered = 0;
  let countMarked = 0;
  let countAnsweredMarked = 0;
  let countNotVisited = 0;

  questions.forEach((q) => {
    const status = responses[q.id]?.status || "not_visited";
    if (status === "answered") countAnswered++;
    else if (status === "not_answered") countNotAnswered++;
    else if (status === "marked") countMarked++;
    else if (status === "answered_marked") countAnsweredMarked++;
    else countNotVisited++;
  });

  const getStatusClass = (status: QuestionStatus, isCurrent: boolean) => {
    let base = "relative flex items-center justify-center font-bold text-xs transition-transform ";
    if (isCurrent) base += "ring-2 ring-blue-600 ring-offset-2 scale-105 ";

    switch (status) {
      case "answered":
        return base + "cbt-pill-answered";
      case "not_answered":
        return base + "cbt-pill-not-answered";
      case "marked":
        return base + "cbt-pill-marked";
      case "answered_marked":
        return base + "cbt-pill-answered-marked";
      case "not_visited":
      default:
        return base + "cbt-pill-not-visited hover:bg-slate-300";
    }
  };

  return (
    <aside className="w-full lg:w-80 bg-[#F0F4F9] border-l border-slate-200 flex flex-col h-full overflow-hidden select-none">
      
      {/* Candidate Profile Box */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <CandidateCard />
      </div>

      {/* Legend / Status Counters Block */}
      <div className="p-3 bg-white/70 border-b border-slate-200 text-[11px] font-semibold space-y-1.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-5 cbt-pill-answered flex items-center justify-center text-[10px] font-bold">
              {countAnswered}
            </span>
            <span className="text-slate-700">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-5 cbt-pill-not-answered flex items-center justify-center text-[10px] font-bold">
              {countNotAnswered}
            </span>
            <span className="text-slate-700">Not Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 cbt-pill-marked flex items-center justify-center text-[10px] font-bold">
              {countMarked}
            </span>
            <span className="text-slate-700">Marked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 cbt-pill-answered-marked flex items-center justify-center text-[10px] font-bold">
              {countAnsweredMarked}
            </span>
            <span className="text-slate-700 leading-tight">Ans & Marked</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <span className="w-6 h-5 cbt-pill-not-visited flex items-center justify-center text-[10px] font-bold">
              {countNotVisited}
            </span>
            <span className="text-slate-700">Not Visited</span>
          </div>
        </div>
      </div>

      {/* Section Questions Palette Title */}
      <div className="px-4 py-2 bg-slate-200/80 border-b border-slate-300 text-xs font-bold text-slate-800 flex justify-between items-center">
        <span>Questions - {currentSection}</span>
        <span className="text-slate-600">{sectionQuestions.length} Qs</span>
      </div>

      {/* 1-100 Question Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-5 gap-2">
          {sectionQuestions.map((q) => {
            const overallIndex = questions.findIndex((item) => item.id === q.id);
            const status = responses[q.id]?.status || "not_visited";
            const isCurrent = overallIndex === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => jumpToQuestion(overallIndex)}
                className={`h-9 w-full rounded shadow-2xs ${getStatusClass(status, isCurrent)}`}
                title={`Question ${overallIndex + 1} (${status})`}
              >
                {overallIndex + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Final Submit Button */}
      <div className="p-3 bg-white border-t border-slate-200">
        <button
          onClick={onSubmitClick}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          Submit Test
        </button>
      </div>

    </aside>
  );
};
