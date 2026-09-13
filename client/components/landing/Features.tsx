"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Wand2,
  Globe,
  FileCheck2,
  CheckCircle2,
  Cpu,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    badge: "AI Resume Builder",
    title: "AI-Powered Content & Summaries",
    description:
      "Transform draft bullets into high-impact, active-voice achievements. Generate executive summaries and relevant skill sets instantly.",
    color: "bg-indigo-50 text-indigo-600 border-indigo-100",
  },
  {
    icon: Target,
    badge: "ATS Optimization",
    title: "Real-Time ATS Scoring & Insights",
    description:
      "Scan your resume against real Applicant Tracking System rules. Receive deterministic score feedback on formatting, keyword density, and section completeness.",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    id: "ats",
  },
  {
    icon: Cpu,
    badge: "Job Matching",
    title: "Job Description Match Analysis",
    description:
      "Paste any job description to discover matching strengths, critical qualification gaps, and tailored action plans before submitting.",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
  {
    icon: Wand2,
    badge: "AI Tailoring",
    title: "Context-Aware Resume Tailoring",
    description:
      "Align experience bullets directly to targeted role requirements. Accept or decline individual AI recommendations with one click.",
    color: "bg-violet-50 text-violet-600 border-violet-100",
  },
  {
    icon: Globe,
    badge: "Portfolio Builder",
    title: "Live Public Portfolio Website",
    description:
      "Turn your resume into a personalized online portfolio (/portfolio/yourname) with Modern, Minimal, Professional, or Creative templates.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    id: "portfolio",
  },
  {
    icon: FileCheck2,
    badge: "PDF Export",
    title: "Pixel-Perfect ATS PDF Export",
    description:
      "Export high-fidelity, machine-readable PDFs that match your selected template layout with zero formatting shifts.",
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 bg-white border-t border-slate-100 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-3.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Built for Career Growth</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything You Need to Get Hired
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            From first draft to recruiter interview, ResuMind provides an end-to-end suite designed to highlight your true professional value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              id={feature.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="p-7 rounded-3xl border border-slate-200/80 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Production Ready</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
