"use client";

import React from "react";
import { useExamStore } from "../../lib/store/useExamStore";
import { KatexRenderer } from "../../lib/utils/katex-parser";
import { CheckCircle2, Bookmark, Award } from "lucide-react";

export const QuestionCanvas: React.FC = () => {
  const {
    questions,
    currentQuestionIndex,
    language,
    responses,
    selectOption,
  } = useExamStore();

  const currentQ = questions[currentQuestionIndex];
  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-500 font-semibold">
        No question selected or test finished.
      </div>
    );
  }

  const currentContent = currentQ.content[language] || currentQ.content.en;
  const currentResponse = responses[currentQ.id];
  const selectedOptionId = currentResponse?.selectedOptionId || null;

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 sm:p-6 lg:p-8 bg-white">
      <div className="space-y-6 max-w-4xl">
        
        {/* Top Info Bar of Current Question */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-black px-2.5 py-1 rounded-md">
              Question #{currentQuestionIndex + 1}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {currentQ.sectionName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +{currentQ.scoring.positive.toFixed(2)} Marks
            </span>
            <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              {currentQ.scoring.negative.toFixed(2)} Negative
            </span>
          </div>
        </div>

        {/* Question Statement Canvas */}
        <div className="text-sm sm:text-base text-slate-900 leading-relaxed font-normal">
          <KatexRenderer content={currentContent.question} />
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentContent.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const optionLabels = ["(A)", "(B)", "(C)", "(D)", "(E)"];
            const optionLabel = optionLabels[idx] || `(${idx + 1})`;

            return (
              <label
                key={opt.id}
                onClick={() => selectOption(currentQ.id, opt.id)}
                className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 select-none ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white"
                }`}
              >
                {/* Radio Circle */}
                <div className="pt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-400 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                {/* Option Text */}
                <div className="flex-1 text-xs sm:text-sm font-medium text-slate-800 flex items-start gap-2">
                  <span className="font-bold text-slate-600 shrink-0">{optionLabel}</span>
                  <KatexRenderer content={opt.text} />
                </div>
              </label>
            );
          })}
        </div>

      </div>
    </div>
  );
};
