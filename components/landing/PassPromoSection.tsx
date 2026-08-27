import React from "react";
import Link from "next/link";
import { Trophy, ClipboardList, BarChart3, Languages, ArrowRight, Sparkles } from "lucide-react";

export const PassPromoSection: React.FC = () => {
  const benefits = [
    {
      icon: Trophy,
      iconBg: "bg-amber-100 text-amber-600",
      title: "All India Rank",
      desc: "Compare real percentiles against lakhs of genuine aspirants across India",
    },
    {
      icon: ClipboardList,
      iconBg: "bg-indigo-100 text-indigo-600",
      title: "Latest Exam Patterns",
      desc: "Updated TCS & NTA interfaces, exact sectional timings and negative markings",
    },
    {
      icon: BarChart3,
      iconBg: "bg-rose-100 text-rose-600",
      title: "In-depth Performance Analysis",
      desc: "Granular subject-wise, topic-wise accuracy, speed & weak area heatmaps",
    },
    {
      icon: Languages,
      iconBg: "bg-emerald-100 text-emerald-600",
      title: "Multi-lingual Mock Tests",
      desc: "Seamless Hindi and English bilingual toggle with exact KaTeX mathematical rendering",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Graphic / Pass Mockup matching reference Image 3 */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 shadow-2xl border border-slate-700 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg">
                    F
                  </div>
                  <span className="text-xl font-black tracking-tight">freemocks</span>
                </div>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 fill-slate-950" /> PASS PRO
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-black tracking-tight text-white">
                  670+ <span className="text-cyan-400">Exams</span>
                </div>
                <div className="text-sm text-slate-300 font-medium">
                  Unlimited access to 70,000+ Mock Tests, Previous Year Papers & Speed Drills
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Validity</span>
                  <span className="font-bold text-white">365 Days Unlimited</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Supported Languages</span>
                  <span className="font-bold text-emerald-400">Hindi + English + Regional</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Device Sync</span>
                  <span className="font-bold text-cyan-400">Web, Tablet & Mobile</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="block w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black rounded-xl text-center shadow-lg transition-all"
                >
                  Activate Pass Today
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content matching reference Image 3 */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Enroll in Test Series for 670+ exams with
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                freemocks <span className="inline-block bg-blue-600 text-white text-base font-black px-2.5 py-0.5 rounded-lg shadow-sm">PASS</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Get unlimited access to the most relevant Mock Tests, on India's Structured Online Test series platform
              </p>
            </div>

            <div className="text-sm font-bold text-slate-900">
              What you get with Freemocks Pass:
            </div>

            {/* 4 Feature Badges in 2x2 Grid (Ref Image 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className={`w-10 h-10 rounded-xl ${b.iconBg} flex items-center justify-center shrink-0 shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{b.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-sm"
              >
                Explore Freemocks Pass
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
