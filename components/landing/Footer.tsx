import React from "react";
import Link from "next/link";
import { Play } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181D24] text-slate-400 text-xs pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Contact info (Ref Image 5) */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xl">
                F
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                freemocks<span className="text-blue-500">.in</span>
              </span>
            </Link>

            <div className="space-y-1 text-slate-400">
              <div className="font-semibold text-slate-200">Freemocks Assessment Technologies Pvt. Ltd.</div>
              <div>Alwar, Rajasthan,</div>
              <div>India - 301001</div>
            </div>

            <div className="space-y-1 text-slate-400 pt-1">
              <div>support@freemocks.in</div>
              <div>Office Hours: 10:00 AM to 7:00 PM (All 7 days)</div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-white uppercase tracking-wider">Company</div>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li className="flex items-center gap-2">
                <Link href="#" className="hover:text-white transition-colors">Careers</Link>
                <span className="bg-slate-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">We are hiring</span>
              </li>
              <li><Link href="#" className="hover:text-white transition-colors">Teach Online with Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Media & Press</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sitemap</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-white uppercase tracking-wider">Products</div>
            <ul className="space-y-2">
              <li><Link href="/dashboard/test-series" className="hover:text-white transition-colors">Test Series</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Live Tests & Quizzes</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Freemocks Pass</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Online Video Solutions</Link></li>
              <li><Link href="/dashboard/sectional" className="hover:text-white transition-colors">Practice Drills</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Exam Calendar 2026</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">GK & Current Affairs</Link></li>
            </ul>
          </div>

          {/* Column 4: Our App & Socials */}
          <div className="space-y-4">
            <div className="text-sm font-bold text-white uppercase tracking-wider">Our App</div>
            <div className="space-y-2">
              <button className="w-full bg-slate-900 hover:bg-black border border-slate-700 text-white p-2.5 rounded-lg flex items-center gap-2.5 text-left transition-colors">
                <AppleIcon />
                <div>
                  <div className="text-[9px] uppercase text-slate-400">Download on the</div>
                  <div className="text-xs font-bold">App Store</div>
                </div>
              </button>
              <button className="w-full bg-slate-900 hover:bg-black border border-slate-700 text-white p-2.5 rounded-lg flex items-center gap-2.5 text-left transition-colors">
                <Play className="w-4 h-4 fill-white" />
                <div>
                  <div className="text-[9px] uppercase text-slate-400">GET IT ON</div>
                  <div className="text-xs font-bold">Google Play</div>
                </div>
              </button>
            </div>

            <div className="pt-1">
              <div className="text-xs font-semibold text-slate-300 mb-2">Follow us on</div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">f</span>
                <span className="w-7 h-7 rounded-full bg-slate-800 hover:bg-sky-500 hover:text-white flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">t</span>
                <span className="w-7 h-7 rounded-full bg-slate-800 hover:bg-blue-700 hover:text-white flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">in</span>
                <span className="w-7 h-7 rounded-full bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">ig</span>
                <span className="w-7 h-7 rounded-full bg-slate-800 hover:bg-red-600 hover:text-white flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">yt</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            Copyright © 2024-2026 Freemocks Edu Solutions Pvt. Ltd.: All rights reserved
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-slate-300 transition-colors">User Policy</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

function AppleIcon() {
  return (
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.7-0.93 2.71 1 .08 2.01-.46 2.63-1.21z"/>
    </svg>
  );
}
