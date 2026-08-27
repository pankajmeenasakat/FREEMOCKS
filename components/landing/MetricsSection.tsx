import React from "react";
import { ShieldCheck, Trophy, FileText, Video } from "lucide-react";

export const MetricsSection: React.FC = () => {
  const metrics = [
    {
      icon: ShieldCheck,
      iconBg: "bg-emerald-100 text-emerald-600",
      value: "8.8+ Crore",
      label: "Registered Students",
      highlight: "from across 28 Indian states",
    },
    {
      icon: Trophy,
      iconBg: "bg-amber-100 text-amber-600",
      value: "4+ Lacs",
      label: "Student Selections",
      highlight: "in SSC, Railway & Bank exams",
    },
    {
      icon: FileText,
      iconBg: "bg-blue-100 text-blue-600",
      value: "242+ Crore",
      label: "Tests Attempted",
      highlight: "zero-latency cloud delivery",
    },
    {
      icon: Video,
      iconBg: "bg-rose-100 text-rose-600",
      value: "5.5+ Crore",
      label: "Classes Attended",
      highlight: "high yield video analyses",
    },
  ];

  return (
    <section className="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`flex items-center gap-4 ${idx > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}>
                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
