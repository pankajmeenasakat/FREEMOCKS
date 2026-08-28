"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  ListChecks,
  BookOpen,
  Settings,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { section: "OVERVIEW" },
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { section: "CONTENT" },
  { label: "All Tests", href: "/admin/tests", icon: ListChecks },
  { label: "Create Test", href: "/admin/tests/create", icon: PlusCircle },
  { label: "Add Question", href: "/admin/questions/create", icon: BookOpen },
  { section: "SYSTEM" },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("fm_admin_token");
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#0F1117] border-r border-slate-800 flex flex-col h-full">
      {/* Brand */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800 shrink-0">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            F
          </div>
          <span className="text-base font-black text-white tracking-tight">
            freemocks<span className="text-blue-500">.in</span>
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-slate-500 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Admin badge */}
      <div className="px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold px-3 py-1.5 rounded-full w-fit">
          <ShieldAlert className="w-3 h-3" />
          ADMIN PANEL
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5 text-xs">
        {navItems.map((item, idx) => {
          if (item.section) {
            return (
              <div key={idx} className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-600 tracking-widest uppercase">
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
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-all group ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 border-l-2 border-blue-500"
                  : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-200"}`} />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
        <div className="mt-2 px-3 py-2 rounded-lg bg-slate-800/60">
          <div className="text-[10px] text-slate-500 font-medium">Logged in as</div>
          <div className="text-xs text-white font-bold">admin@freemocks.in</div>
        </div>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecked(true);
      return;
    }
    const token = localStorage.getItem("fm_admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-slate-400 text-sm">Verifying access...</span>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0F1117] flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64">
        <AdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 flex flex-col w-64">
            <AdminSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 bg-[#181D24] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold text-slate-500 hidden sm:block">
              Admin Panel
              <span className="mx-2 text-slate-700">/</span>
              <span className="text-slate-300 capitalize">
                {pathname.replace("/admin/", "").replace("/admin", "Dashboard").replace("-", " ")}
              </span>
            </div>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[11px] font-semibold text-slate-500 hover:text-blue-400 transition-colors"
          >
            View Live Site →
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
