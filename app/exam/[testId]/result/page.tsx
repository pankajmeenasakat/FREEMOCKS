"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useExamStore } from "../../../../lib/store/useExamStore";
import { SAMPLE_CGL_MOCK_TEST } from "../../../../lib/mock-data/sample-tests";
import { KatexRenderer } from "../../../../lib/utils/katex-parser";
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
} from "lucide-react";

export default function ExamResultPage() {
  const { responses, testTitle, language } = useExamStore();
  const [activeSectionFilter, setActiveSectionFilter] = useState("All");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const questions = SAMPLE_CGL_MOCK_TEST.questions;
  const sections = ["All", ...Array.from(new Set(questions.map((q) => q.sectionName)))];

  // Grade responses
  let totalScore = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  const evaluatedQuestions = questions.map((q) => {
    const userResp = responses[q.id];
    const selectedOptionId = userResp?.selectedOptionId || null;
    const isAttempted = Boolean(selectedOptionId);
    const isCorrect = isAttempted && selectedOptionId === q.correctOptionId;

    if (isAttempted) {
      if (isCorrect) {
        totalScore += q.scoring.positive;
        correctCount++;
      } else {
        totalScore += q.scoring.negative;
        wrongCount++;
      }
    } else {
      unattemptedCount++;
    }

    return {
      ...q,
      selectedOptionId,
      isAttempted,
      isCorrect,
    };
  });

  const attemptedCount = correctCount + wrongCount;
  const accuracy = attemptedCount > 0 ? ((correctCount / attemptedCount) * 100).toFixed(1) : "0.0";
  const maxMarks = SAMPLE_CGL_MOCK_TEST.totalMarks;
  const percentile = totalScore > 0 ? "96.4" : "50.0";

  const filteredList = activeSectionFilter === "All"
    ? evaluatedQuestions
    : evaluatedQuestions.filter((q) => q.sectionName === activeSectionFilter);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <Link
            href="/exam/cgl-tier1-mock-2026/live"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Re-attempt Test
          </Link>
        </div>

        {/* Scorecard Hero Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="bg-blue-600/80 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Performance Scorecard
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-2 text-white">
                {testTitle || SAMPLE_CGL_MOCK_TEST.title}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 font-medium">All India Rank</div>
              <div className="text-2xl font-black text-cyan-400">#74 <span className="text-xs text-slate-400 font-normal">/ 2049 aspirants</span></div>
            </div>
          </div>

          {/* 4 Score Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
              <div className="text-xs text-slate-400 font-semibold">Your Score</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                {totalScore.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">out of {maxMarks} marks</div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
              <div className="text-xs text-slate-400 font-semibold">Accuracy</div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">
                {accuracy}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{correctCount} of {attemptedCount} attempted</div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
              <div className="text-xs text-slate-400 font-semibold">Percentile</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                {percentile}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Top 3.6% in Tier-1</div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/60 text-center">
              <div className="text-xs text-slate-400 font-semibold">Attempt Summary</div>
              <div className="text-lg font-black text-white mt-2 flex items-center justify-center gap-2">
                <span className="text-emerald-400">{correctCount}✓</span>
                <span className="text-rose-400">{wrongCount}✗</span>
                <span className="text-slate-400">{unattemptedCount}⚪</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{questions.length} total questions</div>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Question by Question Solution Analysis
              </h2>
              <p className="text-xs text-slate-500">
                Review complete step-by-step KaTeX explanations and compare your chosen options
              </p>
            </div>

            {/* Section Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSectionFilter(sec)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeSectionFilter === sec
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Questions Accordion List */}
          <div className="space-y-4">
            {filteredList.map((q, idx) => {
              const isExpanded = expandedQuestionId === q.id || idx === 0;
              const content = q.content[language] || q.content.en;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-xs ${
                    q.isCorrect
                      ? "border-emerald-200"
                      : q.isAttempted
                      ? "border-rose-200"
                      : "border-slate-200"
                  }`}
                >
                  {/* Item Header */}
                  <div
                    onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 select-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700">
                        #{q.orderIndex}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{q.sectionName}</span>
                          <span className="text-[10px] text-slate-500 font-medium">• {q.metadata?.topic}</span>
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1 max-w-xl mt-0.5">
                          {content.question.slice(0, 80)}...
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {q.isCorrect ? (
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct (+{q.scoring.positive})
                        </span>
                      ) : q.isAttempted ? (
                        <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" /> Incorrect ({q.scoring.negative})
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                          Unattempted (0.00)
                        </span>
                      )}

                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Solution Canvas */}
                  {isExpanded && (
                    <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 space-y-4">
                      {/* Question Text */}
                      <div className="text-sm font-medium text-slate-900 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                        <KatexRenderer content={content.question} />
                      </div>

                      {/* Options breakdown */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-700">Options:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {content.options.map((opt) => {
                            const isUserChoice = q.selectedOptionId === opt.id;
                            const isCorrectOpt = q.correctOptionId === opt.id;

                            let optClass = "border-slate-200 bg-white text-slate-800";
                            if (isCorrectOpt) {
                              optClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                            } else if (isUserChoice && !isCorrectOpt) {
                              optClass = "border-rose-400 bg-rose-50 text-rose-900";
                            }

                            return (
                              <div
                                key={opt.id}
                                className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${optClass}`}
                              >
                                <div>
                                  <KatexRenderer content={opt.text} />
                                </div>
                                {isCorrectOpt && (
                                  <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                                    Correct
                                  </span>
                                )}
                                {isUserChoice && !isCorrectOpt && (
                                  <span className="text-[10px] bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full shrink-0">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation box */}
                      {content.explanation && (
                        <div className="p-4 bg-blue-50/80 rounded-xl border border-blue-200 space-y-1.5 text-xs">
                          <div className="font-bold text-blue-900 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            Detailed KaTeX Explanation:
                          </div>
                          <div className="text-blue-950 font-normal leading-relaxed">
                            <KatexRenderer content={content.explanation} />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
