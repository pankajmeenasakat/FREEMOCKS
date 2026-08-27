"use client";

import React from "react";
import { useExamStore } from "../../lib/store/useExamStore";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { questions, responses, submitExam, testId } = useExamStore();

  if (!isOpen) return null;

  const sections = Array.from(new Set(questions.map((q) => q.sectionName)));

  const sectionStats = sections.map((sec) => {
    const secQuestions = questions.filter((q) => q.sectionName === sec);
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let notVisited = 0;

    secQuestions.forEach((q) => {
      const status = responses[q.id]?.status || "not_visited";
      if (status === "answered" || status === "answered_marked") answered++;
      else if (status === "not_answered") notAnswered++;
      else if (status === "marked") marked++;
      else notVisited++;
    });

    return {
      sectionName: sec,
      total: secQuestions.length,
      answered,
      notAnswered,
      marked,
      notVisited,
    };
  });

  const totalAnswered = sectionStats.reduce((acc, curr) => acc + curr.answered, 0);
  const totalQuestions = questions.length;

  const handleConfirmSubmit = () => {
    submitExam();
    router.push(`/exam/${testId || "cgl-tier1-mock-2026"}/result`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Exam Summary & Confirmation</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Please review your question attempts before submitting your final responses:
          </p>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-3.5 py-2.5">Section Name</th>
                  <th className="px-3 py-2.5 text-center">Total</th>
                  <th className="px-3 py-2.5 text-center text-emerald-600">Answered</th>
                  <th className="px-3 py-2.5 text-center text-rose-600">Not Answered</th>
                  <th className="px-3 py-2.5 text-center text-purple-600">Marked</th>
                  <th className="px-3 py-2.5 text-center text-slate-500">Not Visited</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {sectionStats.map((stat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3.5 py-2 font-semibold text-slate-900">{stat.sectionName}</td>
                    <td className="px-3 py-2 text-center font-bold">{stat.total}</td>
                    <td className="px-3 py-2 text-center text-emerald-600 font-bold">{stat.answered}</td>
                    <td className="px-3 py-2 text-center text-rose-600">{stat.notAnswered}</td>
                    <td className="px-3 py-2 text-center text-purple-600">{stat.marked}</td>
                    <td className="px-3 py-2 text-center text-slate-400">{stat.notVisited}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-center justify-between text-xs font-semibold text-blue-900">
            <span>Total Answered Questions:</span>
            <span className="font-bold text-sm text-blue-700">{totalAnswered} / {totalQuestions}</span>
          </div>

          <p className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            ⚠️ <strong>Warning:</strong> Once submitted, you will not be able to resume or change any answers for this test session.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 transition-colors"
          >
            Return to Exam
          </button>
          <button
            onClick={handleConfirmSubmit}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            Yes, Submit Test
          </button>
        </div>

      </div>
    </div>
  );
};
