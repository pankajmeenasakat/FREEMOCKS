"use client";

import React from "react";
import { Settings, Lock, Bell, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Settings</h1>
        <p className="text-sm text-slate-400 mt-1">Admin panel configuration</p>
      </div>

      {[
        { icon: Lock, label: "Admin Credentials", desc: "Change admin email or password", action: "Edit" },
        { icon: Bell, label: "Notifications", desc: "Configure alerts for new signups or test attempts", action: "Configure" },
        { icon: Globe, label: "Site Config", desc: "Update site name, logo or meta tags", action: "Edit" },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} className="bg-[#181D24] border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Icon className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 transition-colors">
              {item.action}
            </button>
          </div>
        );
      })}

      <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-4 text-xs text-slate-500">
        <Settings className="w-4 h-4 inline mr-1.5 text-slate-600" />
        Settings are coming soon. Wire these to Supabase or environment variables for production.
      </div>
    </div>
  );
}
