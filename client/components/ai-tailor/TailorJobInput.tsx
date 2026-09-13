"use client";

import React from "react";
import { Sparkles, Wand2, FileText, ArrowRight } from "lucide-react";

interface TailorJobInputProps {
  jobDescription: string;
  setJobDescription: (val: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  disabled?: boolean;
}

const SAMPLE_PRESETS = [
  {
    title: "Full Stack Developer",
    text: `We are seeking a talented Full Stack Developer to build robust, scalable applications.
Key Responsibilities:
- Develop responsive, user-friendly frontend components using React, TypeScript, and modern styling.
- Design performant RESTful APIs and microservices using Node.js, Express, and PostgreSQL with Prisma.
- Implement secure authentication flows (JWT/OAuth), role-based permissions, and caching.
- Write maintainable code with thorough unit and integration test coverage.
- Collaborate with designers and product managers in an agile development lifecycle.
Requirements:
- 2+ years practical engineering experience with React, TypeScript, and Node.js.
- Strong knowledge of relational databases, SQL schema design, and query optimization.
- Proficiency in Git, CI/CD workflows, Docker, and modern web application security practices.
- Bachelor's degree in Computer Science, Software Engineering, or equivalent practical experience.`,
  },
  {
    title: "Frontend React Engineer",
    text: `Looking for a Senior Frontend Engineer to champion user experience and performance.
Key Responsibilities:
- Build and maintain accessible, component-driven web interfaces using Next.js and TypeScript.
- Optimize rendering performance, asset delivery, and Core Web Vitals across diverse devices.
- Collaborate closely with UI/UX designers to translate Figma prototypes into pixel-perfect code.
- Write automated tests using Jest and React Testing Library.
Requirements:
- 3+ years deep experience with React, TypeScript, and state management architectures.
- Expert knowledge of HTML5 semantic structure, CSS modern layout techniques, and responsive design.
- Demonstrated experience in client-side caching, bundle analysis, and performance tuning.
- Bachelor's degree in Computer Science or related field.`,
  },
  {
    title: "Backend Engineer (Node.js/Cloud)",
    text: `We are looking for a Backend Engineer to scale our distributed cloud backend services.
Key Responsibilities:
- Architect high-throughput API services using Node.js, TypeScript, and cloud-native services.
- Design database migrations, indexes, and caching strategies using PostgreSQL and Redis.
- Ensure 99.9% uptime with automated error monitoring, logging, and health metrics.
- Build reliable third-party API integrations and asynchronous message processing.
Requirements:
- 3+ years backend software development experience in Node.js or similar modern stack.
- Solid experience with relational databases (PostgreSQL/MySQL) and ORMs.
- Familiarity with cloud platforms (AWS, GCP), Docker containers, and CI/CD pipelines.
- Strong foundations in algorithms, data structures, and secure API architectures.`,
  },
];

export default function TailorJobInput({
  jobDescription,
  setJobDescription,
  onAnalyze,
  analyzing,
  disabled,
}: TailorJobInputProps) {
  const charCount = jobDescription.length;
  const isTooShort = charCount < 50;
  const isTooLong = charCount > 25000;
  const isValid = !isTooShort && !isTooLong;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Wand2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">AI Resume Tailor</h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Optimize your resume for this job without changing the facts.
          </p>
        </div>

        {/* Preset quick links */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-gray-400 mr-1 flex items-center gap-1">
            <FileText className="w-3 h-3" /> Quick Presets:
          </span>
          {SAMPLE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setJobDescription(preset.text)}
              disabled={analyzing}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 transition-colors font-medium"
            >
              + {preset.title}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="job-description-tailor" className="font-semibold text-gray-800">
            Paste Job Description <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-[11px] font-medium transition-colors ${
              isTooLong
                ? "text-red-600 font-bold"
                : isValid
                ? "text-emerald-600"
                : "text-gray-400"
            }`}
          >
            {charCount.toLocaleString()} / 25,000 characters {isTooShort && "(min 50)"}
          </span>
        </div>

        <textarea
          id="job-description-tailor"
          rows={10}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          disabled={analyzing || disabled}
          placeholder="Paste the target job description here (responsibilities, required qualifications, key technologies, methodologies, and candidate expectations)..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none text-xs text-gray-800 font-mono leading-relaxed transition resize-y placeholder:font-sans placeholder:text-gray-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="text-[11px] text-gray-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
          <span>Strict Anti-Fabrication Guarantee: Your facts and employment history will never be invented.</span>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={analyzing || !isValid || disabled}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze & Tailor Resume</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
