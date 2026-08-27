"use client";

import React from "react";
import { useExamStore } from "../../lib/store/useExamStore";
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw } from "lucide-react";

export const ExamActionBar: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    saveAndNext,
    markForReviewAndNext,
    clearResponse,
    jumpToQuestion,
  } = useExamStore();

  const currentQ = questions[currentQuestionIndex];
  if (!currentQ) return null;

  const isFirst = currentQuestionIndex === 0;
  const isLast = currentQuestionIndex === questions.length - 1;

  return (
    <div className="bg-slate-100 border-t border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 select-none">
      
      {/* Left Action: Mark for review + Clear Response */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => markForReviewAndNext(currentQ.id)}
          className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          Mark for Review & Next
        </button>

        <button
          onClick={() => clearResponse(currentQ.id)}
          className="px-3.5 py-2 bg-white hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Response
        </button>
      </div>

      {/* Right Action: Previous & Save & Next */}
      <div className="flex items-center gap-2">
        <button
          disabled={isFirst}
          onClick={() => jumpToQuestion(currentQuestionIndex - 1)}
          className="px-4 py-2 bg-white hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-white text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={() => saveAndNext(currentQ.id)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1"
        >
          Save & Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
