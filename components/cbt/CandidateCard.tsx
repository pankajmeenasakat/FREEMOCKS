import React from "react";
import { User } from "lucide-react";

export const CandidateCard: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 shrink-0 overflow-hidden shadow-inner">
        <User className="w-7 h-7 text-slate-500" />
      </div>
      <div className="overflow-hidden leading-tight">
        <div className="text-xs font-bold text-slate-900 truncate">Pankaj Kumar</div>
        <div className="text-[10px] text-slate-500 font-mono">Roll: 2201048291</div>
        <div className="text-[10px] text-blue-600 font-medium">Node: C-104 (Lab 2)</div>
      </div>
    </div>
  );
};
