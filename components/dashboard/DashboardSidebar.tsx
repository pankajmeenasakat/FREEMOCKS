"use client";

import React, { useState, useEffect } from "react";
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
  LogOut,
} from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { label: "Home", href: "/dashboard", icon: Home, exact: true },
  { section: "TESTS" },
  { label: "Test Series", href: "/dashboard/test-series", icon: FileText },
  { label: "Live Tests & Quizzes", href: "/dashboard/live", icon: Radio },
  { label: "Previous Year Papers", href: "/dashboard/pyq", icon: FileSpreadsheet },
  { label: "Study Notes", href: "/dashboard/notes", icon: StickyNote, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
  { label: "Practice", href: "/dashboard/sectional", icon: Dumbbell },
  { label: "Free Quizzes", href: "/dashboard/quizzes", icon: HelpCircle, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
  { label: "Attempted Tests", href: "/dashboard/attempts", icon: CheckCircle },
  { label: "Pass", href: "/dashboard/pass", icon: Sparkles, subtitle: "72 Days Left" },
  { label: "Rank Predictor", href: "/dashboard/rank", icon: Trophy, badge: "NEW", badgeColor: "bg-orange-500 text-white" },
];

function getInitials(user: User): string {
  const fullName = user.user_metadata?.full_name as string | undefined;
  if (fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  const email = user.email ?? "";
  return email.slice(0, 2).toUpperCase();
}

function getDisplayName(user: User): string {
  const fullName = user.user_metadata?.full_name as string | undefined;
  if (fullName) return fullName;
  const email = user.email ?? "";
  return email.split("@")[0];
}

export const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createSupabaseBrowser();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

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

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#181D24] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-6 flex items-center gap-2 border-b border-slate-800 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
              F
            </div>
            <span className="text-lg font-black text-white tracking-tight">
              freemocks<span className="text-blue-500">.in</span>
            </span>
          </Link>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 text-xs">
          {navItems.map((item, idx) => {
            if ("section" in item) {
              return (
                <div key={idx} className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-500 tracking-wider">
                  {item.section}
                </div>
              );
            }

            const Icon = item.icon!;
            const active = isActive(item.href!, item.exact);

            return (
              <Link
                key={idx}
                href={item.href!}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all group ${
                  active
                    ? "bg-slate-800 text-white border-l-4 border-cyan-400"
                    : "hover:bg-slate-800/60 hover:text-white text-slate-400 border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-200"}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.subtitle && (
                    <span className="text-[10px] text-slate-400 font-normal">{item.subtitle}</span>
                  )}
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/50">
          {user ? (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/80">
              {user.user_metadata?.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {getInitials(user)}
                </div>
              )}
              <div className="overflow-hidden flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate">{getDisplayName(user)}</div>
                <div className="text-[10px] text-slate-400 truncate">{user.email}</div>
              </div>
              <button
                onClick={handleSignOut}
                className="shrink-0 p-1 rounded text-slate-500 hover:text-red-400 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/80 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-slate-700" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-slate-700 rounded w-3/4" />
                <div className="h-2 bg-slate-700 rounded w-1/2" />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
