"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, Sparkles, LogOut, User } from "lucide-react";
import { createSupabaseBrowser } from "@/lib/supabase-browser";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createSupabaseBrowser();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                freemocks<span className="text-blue-600">.in</span>
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-slate-100 hover:text-blue-600 transition-colors">
                Exams <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white border border-slate-200 shadow-xl rounded-lg p-2 z-50">
                <Link href="/dashboard?category=ssc" className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded">
                  SSC Exams (CGL, CHSL, MTS)
                </Link>
                <Link href="/dashboard?category=railways" className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded">
                  Railways (NTPC, Group D, ALP)
                </Link>
                <Link href="/dashboard?category=banking" className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded">
                  Banking & Insurance (IBPS, SBI)
                </Link>
                <Link href="/dashboard?category=teaching" className="block px-3 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded">
                  Teaching (CTET, State TET)
                </Link>
              </div>
            </div>


            <Link href="/dashboard/test-series" className="px-3 py-2 rounded-md text-blue-600 font-semibold bg-blue-50 transition-colors">
              Test Series
            </Link>
            <Link href="/dashboard/sectional" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-blue-600 transition-colors">
              Sectional Tests
            </Link>
            <Link href="/dashboard" className="px-3 py-2 rounded-md hover:bg-slate-100 hover:text-blue-600 transition-colors flex items-center gap-1">
              Pass <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            </Link>
          </nav>
        </div>

        {/* Search Input Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search for SSC CGL, RRB NTPC, IBPS PO, mock tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100/80 border border-slate-200 rounded-full focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="w-20 h-8 bg-slate-100 rounded-lg animate-pulse" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 transition-colors"
              >
                <User className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-blue-600 px-3 py-1.5 transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/dashboard"
                className="bg-[#00B074] hover:bg-[#009663] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
