"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* ResuMind Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group focus:outline-hidden shrink-0 min-w-0"
          aria-label="ResuMind Home"
        >
          <img
            src="/logos/logo.png"
            alt="ResuMind Logo"
            className="w-8 h-8 sm:w-11 sm:h-11 object-contain shrink-0 group-hover:scale-105 transition-transform"
          />
          <img
            src="/logos/wordmarkDark.png"
            alt="ResuMind"
            className="h-6 sm:h-9 w-auto object-contain shrink-0"
          />
        </Link>

        {/* Center Navigation / Anchors */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Features
          </a>
          <a
            href="#ats"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            ATS Optimization
          </a>
          <a
            href="#portfolio"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Portfolio Builder
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={() => router.push("/login")}
            className="px-2.5 sm:px-4 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors rounded-xl whitespace-nowrap shrink-0 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4.5 py-2 sm:py-2.5 text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-white rounded-xl shadow-xs hover:shadow-md transition-all active:scale-98 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="hidden sm:inline">Build My Resume</span>
            <span className="inline sm:hidden">Build Resume</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </nav>
  );
}
