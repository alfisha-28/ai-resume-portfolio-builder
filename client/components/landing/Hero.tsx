"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Target,
  Wand2,
  Globe,
  FileCheck2,
  CheckCircle2,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-linear-to-b from-slate-50 via-indigo-50/30 to-white pt-24 pb-20 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[400px] bg-linear-to-r from-blue-200/40 via-indigo-200/40 to-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* ============================================================
              1. MAIN VISUAL BRANDING: CENTERED LOGO + WORDMARK
          ============================================================ */}
          <div className="flex items-center justify-center gap-3.5 sm:gap-4 md:gap-5 mb-2.5">
            <img
              src="/logos/logo.png"
              alt="ResuMind Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain shrink-0 drop-shadow-xs hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/logos/wordmarkDark.png"
              alt="ResuMind"
              className="h-10 sm:h-16 md:h-16 w-auto object-contain"
            />
          </div>

          {/* ============================================================
              2. BRAND TAGLINE (DIRECTLY BELOW BRANDING)
          ============================================================ */}
          <p className="text-xs sm:text-sm font-bold tracking-widest text-indigo-600 uppercase mb-6 sm:mb-8">
            Build Smarter. Get Hired.
          </p>

          {/* ============================================================
              3. MAIN HEADLINE
          ============================================================ */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6 max-w-3xl">
            Build a Resume That{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Gets Noticed.
            </span>
          </h1>

          {/* ============================================================
              4. SUPPORTING DESCRIPTION
          ============================================================ */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-9">
            Create, optimize, tailor, and showcase your professional profile with AI-powered tools built to help you get hired.
          </p>

          {/* ============================================================
              5. CTA BUTTONS
          ============================================================ */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-base active:scale-98 group cursor-pointer"
            >
              <span>Build My Resume</span>
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl hover:border-slate-300 shadow-2xs transition-all text-base active:scale-98 cursor-pointer"
            >
              Explore Features
            </a>
          </div>

          {/* ============================================================
              TRUST & CAPABILITY BADGES
          ============================================================ */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              AI Resume Builder
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-blue-500" />
              ATS Optimization
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Wand2 className="w-3.5 h-3.5 text-purple-500" />
              AI Job Tailoring
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              Public Portfolio
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-slate-600" />
              PDF Export
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
