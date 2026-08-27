import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, X } from "lucide-react";

interface AnnouncementBarProps {
  onClose?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onClose }) => {
  return (
    <div className="bg-[#00B074] text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 mx-auto">
        <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm">
          <Zap className="w-3 h-3 fill-current animate-pulse" /> LIVE
        </span>
        <span className="hidden sm:inline">Access All Live Classes, Mocks, PYP & Notes for 375+ Exams!</span>
        <span className="sm:hidden">Access 375+ Exam Mocks & PYPs!</span>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded transition-colors ml-2 shadow-sm inline-flex items-center gap-1"
        >
          Start ₹1 Trial <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close announcement"
          className="text-white/80 hover:text-white transition-colors ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
