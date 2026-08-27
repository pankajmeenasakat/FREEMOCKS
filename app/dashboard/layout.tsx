import React from "react";
import { DashboardSidebar } from "../../components/dashboard/DashboardSidebar";
import Link from "next/link";
import { Search, Bell, Sparkles } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Dark Theme Left Sidebar (Ref Image 6) */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        
        {/* Dashboard Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search test series, exams, sectional tests..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Pass Active (72 Days)</span>
            </div>

            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5" />
            </button>

            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                PK
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>
    </div>
  );
}
