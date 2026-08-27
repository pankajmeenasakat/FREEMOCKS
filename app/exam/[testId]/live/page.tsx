"use client";

import React, { useEffect, useState } from "react";
import { useExamStore } from "../../../../lib/store/useExamStore";
import { SAMPLE_CGL_MOCK_TEST } from "../../../../lib/mock-data/sample-tests";
import { ExamHeader } from "../../../../components/cbt/ExamHeader";
import { QuestionCanvas } from "../../../../components/cbt/QuestionCanvas";
import { QuestionPalette } from "../../../../components/cbt/QuestionPalette";
import { ExamActionBar } from "../../../../components/cbt/ExamActionBar";
import { SubmitModal } from "../../../../components/cbt/SubmitModal";
import { Info, X, Check } from "lucide-react";

export default function LiveExamPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const { initializeExam, testId } = useExamStore();

  useEffect(() => {
    setIsMounted(true);
    // Initialize mock exam
    initializeExam(
      SAMPLE_CGL_MOCK_TEST.id,
      SAMPLE_CGL_MOCK_TEST.title,
      SAMPLE_CGL_MOCK_TEST.durationSeconds,
      SAMPLE_CGL_MOCK_TEST.questions
    );
  }, [initializeExam]);

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold tracking-wide">Loading Zero-Latency CBT Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#F0F4F9] overflow-hidden">
      
      {/* 1. Standard CBT Header with Section Switcher & Countdown Timer */}
      <ExamHeader onShowInstructions={() => setIsInstructionsOpen(true)} />

      {/* 2. Main Exam Body: Left Question Canvas + Right Question Palette */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left: Active Question + Bottom Navigation */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-white">
          <div className="flex-1 overflow-y-auto">
            <QuestionCanvas />
          </div>

          {/* Bottom Action Controls */}
          <ExamActionBar />
        </div>

        {/* Right: 1-100 Question Status Palette & Profile */}
        <QuestionPalette onSubmitClick={() => setIsSubmitModalOpen(true)} />

      </div>

      {/* 3. Submit Verification Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* 4. Instructions Modal */}
      {isInstructionsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">General Instructions</h2>
              </div>
              <button onClick={() => setIsInstructionsOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              <p>1. The test clock will be set at the server. The countdown timer in the top right corner displays the remaining time available to you.</p>
              <p>2. The question palette on the right shows the status of each question using the standard color codes:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-slate-700">Grey:</strong> You have not visited the question yet.</li>
                <li><strong className="text-red-600">Red:</strong> You have visited but not answered the question.</li>
                <li><strong className="text-green-600">Green:</strong> You have answered the question.</li>
                <li><strong className="text-purple-600">Purple:</strong> You have marked the question for review without answering.</li>
                <li><strong className="text-purple-700">Purple with Green Dot:</strong> The question has been answered AND marked for review (evaluated for scoring).</li>
              </ul>
              <p>3. To change your chosen answer, click on another option or click <strong>Clear Response</strong>.</p>
              <p>4. To save your answer, you MUST click <strong>Save & Next</strong>.</p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsInstructionsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
