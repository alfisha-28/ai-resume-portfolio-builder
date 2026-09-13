"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  const router = useRouter();

  return (
    <section className="py-24 bg-linear-to-b from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-300 text-xs font-semibold backdrop-blur-xs mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>ResuMind · Build Smarter. Get Hired.</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-5 leading-tight">
          Ready to Build a Resume That Gets Noticed?
        </h2>

        <p className="text-slate-300 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Create, optimize, tailor, and showcase your professional profile with AI-powered tools built to help you land more interviews.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-slate-950 hover:bg-indigo-50 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all text-base active:scale-98 cursor-pointer group"
          >
            <span>Build My Resume</span>
            <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-xs text-slate-400 mt-6 font-medium">
          Free to start · Instant ATS Score · No credit card required
        </p>
      </div>
    </section>
  );
}
