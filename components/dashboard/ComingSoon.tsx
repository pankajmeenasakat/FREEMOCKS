import React from "react";
import Link from "next/link";
import { Clock, ArrowLeft, Bell } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor?: string;
  features?: string[];
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  icon: Icon,
  accentColor = "text-blue-500",
  features = [],
}) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner">
          <Icon className={`w-10 h-10 ${accentColor}`} />
        </div>
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          Soon
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-extrabold text-slate-900 mb-2">{title}</h1>
      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">{description}</p>

      {/* Feature Pills */}
      {features.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {features.map((f, i) => (
            <span
              key={i}
              className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Coming Soon Badge */}
      <div className="flex items-center gap-2 px-5 py-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-700 text-sm font-semibold mb-8 shadow-sm">
        <Clock className="w-4 h-4 animate-pulse" />
        We&apos;re building this — launching very soon!
      </div>

      {/* Notify Button (placeholder) */}
      <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-md transition-colors mb-6">
        <Bell className="w-4 h-4" />
        Notify Me When Live
      </button>

      {/* Back Link */}
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-600 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
};
