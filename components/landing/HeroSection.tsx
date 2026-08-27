import React from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Award, Zap } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/80 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtext, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold">
              <SparkleBadge />
              <span>India's #1 Zero-Latency CBT Mock Exam Engine</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              One Destination for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                Complete Exam Preparation
              </span>
            </h1>

            {/* Stepper subtitle */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-semibold text-slate-700">
              <span className="flex items-center gap-1 text-blue-600">
                <CheckCircle2 className="w-4 h-4" /> Learn
              </span>
              <span className="text-slate-300">▶</span>
              <span className="flex items-center gap-1 text-teal-600">
                <CheckCircle2 className="w-4 h-4" /> Practice
              </span>
              <span className="text-slate-300">▶</span>
              <span className="flex items-center gap-1 text-amber-600">
                <CheckCircle2 className="w-4 h-4" /> Improve
              </span>
              <span className="text-slate-300">▶</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Award className="w-4 h-4" /> Succeed
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              Start your preparation for selections. Real exam environment, instant KaTeX bilingual rendering, real-time all-India rank percentiles & offline sync.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/dashboard"
                className="bg-[#00B074] hover:bg-[#009663] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 text-base text-center"
              >
                Get Started For Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/exam/cgl-tier1-mock-2026/live"
                className="bg-white hover:bg-slate-50 text-blue-700 font-semibold px-6 py-3.5 rounded-xl border border-blue-200 shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-base text-center"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
                Live Demo Test (CGL 2026)
              </Link>
            </div>

            {/* Store Badges */}
            <div className="pt-4 flex items-center gap-3">
              <button
                className="bg-black text-white hover:bg-slate-800 transition-colors px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">GET IT ON</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
              <button
                className="bg-black text-white hover:bg-slate-800 transition-colors px-3.5 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold shadow-sm"
              >
                <AppleIcon />
                <div className="text-left leading-tight">
                  <div className="text-[9px] uppercase tracking-wider text-slate-400">Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Illustration Graphic matching reference Image 1 */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              {/* Background gradient blur */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-300/30 rounded-full blur-3xl" />
              
              {/* Card Container */}
              <div className="relative bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-2xl space-y-6">
                {/* Visual Simulation Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-500/20">
                      🎯
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">SSC CGL Tier-I 2026</h2>
                      <p className="text-xs text-slate-500">Live Mock Test • 2049.0k Aspirants</p>
                    </div>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Free
                  </span>
                </div>

                {/* Score & Progress Graphic */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Target Percentile</span>
                    <span className="text-blue-600 font-bold">99.4% AIR #12</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                    <div className="bg-emerald-500 h-full w-[75%]" />
                    <div className="bg-amber-400 h-full w-[15%]" />
                    <div className="bg-slate-300 h-full w-[10%]" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 18 Correct</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> 2 Wrong</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300" /> 0 Skipped</span>
                  </div>
                </div>

                {/* Interactive floating badges */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-blue-50/70 border border-blue-100 p-3 rounded-xl flex items-center gap-2.5">
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">Zero Latency</div>
                      <div className="text-[10px] text-slate-500">Cloudflare Edge</div>
                    </div>
                  </div>
                  <div className="bg-teal-50/70 border border-teal-100 p-3 rounded-xl flex items-center gap-2.5">
                    <span className="text-xl">🌐</span>
                    <div>
                      <div className="text-xs font-bold text-slate-800">100% Bilingual</div>
                      <div className="text-[10px] text-slate-500">Hindi + English</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

function SparkleBadge() {
  return (
    <svg className="w-3.5 h-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.7-0.93 2.71 1 .08 2.01-.46 2.63-1.21z"/>
    </svg>
  );
}
