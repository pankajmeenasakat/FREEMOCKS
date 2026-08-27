"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
            F
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            freemocks<span className="text-blue-600">.in</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-xs text-slate-600">
          Or{" "}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
            create a free student account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/60 rounded-2xl border border-slate-200/80 sm:px-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700">Email Address / Roll No</label>
              <div className="mt-1 relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="student@freemocks.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 font-medium cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" defaultChecked />
                Remember me
              </label>
              <Link href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
            >
              Sign In to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Bank-grade 256-bit SSL secured auth</span>
          </div>
        </div>
      </div>
    </div>
  );
}
