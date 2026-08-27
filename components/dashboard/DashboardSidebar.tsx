"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Radio,
  FileSpreadsheet,
  StickyNote,
  Dumbbell,
  HelpCircle,
  CheckCircle,
  Sparkles,
  Trophy,
  Menu,
  X,
} from "lucide-react";

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/dashboard", icon: Home },
    { section: "TESTS" },
    { label: "Test Series", href: "/dashboard/test-series", icon: FileText, active: true },
    { label: "Live Tests & Quizzes", href: "/dashboard", icon: Radio },
    { label: "Previous Year Papers", href: "/dashboard", icon: FileSpreadsheet },
    { label: "Study Notes", href: "/dashboard", icon: StickyNote, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
    { label: "Practice", href: "/dashboard/sectional", icon: Dumbbell },
    { label: "Free Quizzes", href: "/dashboard/sectional", icon: HelpCircle, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
    { label: "Attempted Tests", href: "/dashboard/sectional", icon: CheckCircle },
    { label: "Pass", href: "/dashboard", icon: Sparkles, subtitle: "72 Days Left" },
    { label: "Rank Predictor", href: "/dashboard", icon: Trophy, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-slate-900 text-white shadow-md"
          aria-label="Toggle Navigation"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Overlay on mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container matching Reference Image 6 */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#181D24] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-6 flex items-center gap-2 border-b border-slate-800 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              F
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              freemocks<span className="text-blue-500">.in</span>
            </span>
          </Link>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 text-xs">
          {navItems.map((item, idx) => {
            if (item.section) {
              return (
                <div key={idx} className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-500 tracking-wider">
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
              <Link
                key={idx}
                href={item.href!}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all group ${
                  isActive
                    ? "bg-slate-800 text-white font-semibold border-l-4 border-cyan-400"
                    : "hover:bg-slate-800/60 hover:text-white text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.subtitle && (
                    <span className="text-[10px] text-slate-400 font-normal">{item.subtitle}</span>
                  )}
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Footer Profile in Sidebar */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/80">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              PK
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Pankaj Kumar</div>
              <div className="text-[10px] text-emerald-400 font-medium">Pass Pro Active</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
