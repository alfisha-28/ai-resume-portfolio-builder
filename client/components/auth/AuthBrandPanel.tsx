"use client";

import Link from "next/link";
import { CheckCircle2, Sparkles, Globe, Target } from "lucide-react";

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 xl:p-16 relative bg-slate-950 text-white overflow-hidden border-r border-slate-850 select-none">
      {/* Subtle Background Glow & Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Brand Header */}
      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3.5 group focus:outline-hidden"
          aria-label="ResuMind Home"
        >
          <img
            src="/logos/logo.png"
            alt="ResuMind Logo"
            className="w-20 h-20 object-contain shrink-0 group-hover:scale-105 transition-transform duration-200"
          />
          <img
            src="/logos/wordmark.png"
            alt="ResuMind"
            className="h-20 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Center Showcase */}
      <div className="relative z-10 my-auto py-6 max-w-lg">
        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Career Platform</span>
        </div>

        <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Build Smarter.{" "}
          <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Get Hired.
          </span>
        </h2>

        <p className="text-slate-400 text-sm xl:text-base leading-relaxed mb-8">
          AI-powered tools to help you build better resumes, match
          opportunities, and showcase your work with a live portfolio.
        </p>

        {/* Feature Value Points */}
        <div className="space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Build ATS-friendly resumes
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Engineered with industry keywords to bypass automated screening filters.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5 text-indigo-400">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Tailor your resume for every opportunity
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Instantly customize your bullet points to match any job description.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-6 h-6 rounded-md bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5 text-purple-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Turn your resume into a personal portfolio
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Generate a live, responsive portfolio site directly from your credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
              98%
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-200">
                ATS Compatibility Score
              </p>
              <p className="text-[11px] text-slate-400">
                Senior Full-Stack Developer target
              </p>
            </div>
          </div>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Optimized
          </span>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
        <span>© {new Date().getFullYear()} ResuMind</span>
        <span>Build Smarter. Get Hired.</span>
      </div>
    </div>
  );
}
