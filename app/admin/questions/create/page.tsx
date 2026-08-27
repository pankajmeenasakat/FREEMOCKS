"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Sparkles, CheckCircle2, Code } from "lucide-react";
import { KatexRenderer } from "../../../../lib/utils/katex-parser";

export default function AdminQuestionCreatePage() {
  const [sectionName, setSectionName] = useState("Quantitative Aptitude");
  const [positiveMarks, setPositiveMarks] = useState("2.0");
  const [negativeMarks, setNegativeMarks] = useState("-0.5");
  const [correctOption, setCorrectOption] = useState("opt1");

  // English state
  const [enQuestion, setEnQuestion] = useState(
    "If $x + \\frac{1}{x} = 4$, find the value of $x^2 + \\frac{1}{x^2}$:"
  );
  const [enOpt1, setEnOpt1] = useState("14");
  const [enOpt2, setEnOpt2] = useState("16");
  const [enOpt3, setEnOpt3] = useState("18");
  const [enOpt4, setEnOpt4] = useState("12");
  const [enExplanation, setEnExplanation] = useState(
    "Using $(x + 1/x)^2 = x^2 + 1/x^2 + 2 \\implies 4^2 - 2 = 14$."
  );

  // Hindi state
  const [hiQuestion, setHiQuestion] = useState(
    "यदि $x + \\frac{1}{x} = 4$ है, तो $x^2 + \\frac{1}{x^2}$ का मान ज्ञात कीजिए:"
  );
  const [hiOpt1, setHiOpt1] = useState("14");
  const [hiOpt2, setHiOpt2] = useState("16");
  const [hiOpt3, setHiOpt3] = useState("18");
  const [hiOpt4, setHiOpt4] = useState("12");
  const [hiExplanation, setHiExplanation] = useState(
    "सूत्र $(x + 1/x)^2 - 2 = 4^2 - 2 = 14$।"
  );

  const [activeTab, setActiveTab] = useState<"en" | "hi">("en");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Bilingual Question Creator & CMS
              </h1>
              <p className="text-xs text-slate-500">
                Add bilingual questions with real-time KaTeX math equations preview
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save & Publish Question
          </button>
        </div>

        {isSaved && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Question successfully validated and added to question bank manifest!
          </div>
        )}

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Inputs */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            
            {/* Metadata Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                <select
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Quantitative Aptitude</option>
                  <option>General Intelligence & Reasoning</option>
                  <option>General Awareness</option>
                  <option>English Comprehension</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correct Option</label>
                <select
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-emerald-50 text-emerald-900 font-bold"
                >
                  <option value="opt1">Option (A)</option>
                  <option value="opt2">Option (B)</option>
                  <option value="opt3">Option (C)</option>
                  <option value="opt4">Option (D)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">+ Marks</label>
                  <input
                    type="text"
                    value={positiveMarks}
                    onChange={(e) => setPositiveMarks(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">- Marks</label>
                  <input
                    type="text"
                    value={negativeMarks}
                    onChange={(e) => setNegativeMarks(e.target.value)}
                    className="w-full text-xs p-2 border border-slate-300 rounded-lg text-center font-bold text-rose-600"
                  />
                </div>
              </div>
            </div>

            {/* Language Editor Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab("en")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "en" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                English Editor
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hi")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "hi" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                हिन्दी संपादक (Hindi)
              </button>
            </div>

            {/* English Fields */}
            {activeTab === "en" ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Question Text (LaTeX supported with $...$ or $$...$$)
                  </label>
                  <textarea
                    rows={4}
                    value={enQuestion}
                    onChange={(e) => setEnQuestion(e.target.value)}
                    className="w-full text-xs p-3 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Option (A)</label>
                    <input
                      type="text"
                      value={enOpt1}
                      onChange={(e) => setEnOpt1(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Option (B)</label>
                    <input
                      type="text"
                      value={enOpt2}
                      onChange={(e) => setEnOpt2(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Option (C)</label>
                    <input
                      type="text"
                      value={enOpt3}
                      onChange={(e) => setEnOpt3(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Option (D)</label>
                    <input
                      type="text"
                      value={enOpt4}
                      onChange={(e) => setEnOpt4(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Explanation</label>
                  <textarea
                    rows={2}
                    value={enExplanation}
                    onChange={(e) => setEnExplanation(e.target.value)}
                    className="w-full text-xs p-3 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            ) : (
              /* Hindi Fields */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    प्रश्न सामग्री (हिन्दी + KaTeX)
                  </label>
                  <textarea
                    rows={4}
                    value={hiQuestion}
                    onChange={(e) => setHiQuestion(e.target.value)}
                    className="w-full text-xs p-3 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विकल्प (A)</label>
                    <input
                      type="text"
                      value={hiOpt1}
                      onChange={(e) => setHiOpt1(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विकल्प (B)</label>
                    <input
                      type="text"
                      value={hiOpt2}
                      onChange={(e) => setHiOpt2(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विकल्प (C)</label>
                    <input
                      type="text"
                      value={hiOpt3}
                      onChange={(e) => setHiOpt3(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">विकल्प (D)</label>
                    <input
                      type="text"
                      value={hiOpt4}
                      onChange={(e) => setHiOpt4(e.target.value)}
                      className="w-full text-xs p-2.5 font-mono border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">व्याख्या (Explanation)</label>
                  <textarea
                    rows={2}
                    value={hiExplanation}
                    onChange={(e) => setHiExplanation(e.target.value)}
                    className="w-full text-xs p-3 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Live KaTeX Preview */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>Live KaTeX Math Rendering Preview</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                <KatexRenderer content={activeTab === "en" ? enQuestion : hiQuestion} />
              </div>

              <div className="space-y-2">
                {[
                  { id: "opt1", label: "(A)", text: activeTab === "en" ? enOpt1 : hiOpt1 },
                  { id: "opt2", label: "(B)", text: activeTab === "en" ? enOpt2 : hiOpt2 },
                  { id: "opt3", label: "(C)", text: activeTab === "en" ? enOpt3 : hiOpt3 },
                  { id: "opt4", label: "(D)", text: activeTab === "en" ? enOpt4 : hiOpt4 },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                      correctOption === opt.id
                        ? "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <span className="text-slate-500">{opt.label}</span>
                    <KatexRenderer content={opt.text} />
                    {correctOption === opt.id && (
                      <span className="ml-auto text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        Correct Answer
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-blue-50/80 rounded-lg border border-blue-200 text-xs text-blue-950 space-y-1">
                <div className="font-bold text-blue-900">Explanation Preview:</div>
                <KatexRenderer content={activeTab === "en" ? enExplanation : hiExplanation} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
