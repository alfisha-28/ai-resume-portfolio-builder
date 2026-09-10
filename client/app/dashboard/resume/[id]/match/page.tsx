"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Target,
  Sparkles,
  FileText,
  Loader2,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  FileSearch,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import JobMatchScoreCard from "@/components/ai/JobMatchScoreCard";
import JobSkillKeywordCard from "@/components/ai/JobSkillKeywordCard";
import JobSectionMatchCard from "@/components/ai/JobSectionMatchCard";
import JobMatchRecommendations from "@/components/ai/JobMatchRecommendations";

import { getResumeById } from "@/services/resume.service";
import { aiMatchResumeToJob, type JobMatchResult } from "@/services/ai.service";
import type { Resume } from "@/types/resume";

const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: "Full Stack Developer",
    text: `We are looking for a skilled Full Stack Developer to build scalable web applications.
Responsibilities:
- Build responsive web frontends using React, TypeScript, and modern CSS.
- Architect backend services using Node.js, Express, and PostgreSQL with Prisma ORM.
- Design and integrate RESTful APIs with secure JWT authentication and role-based access control.
- Collaborate with product designers and engineers to deliver clean, maintainable features.
Requirements:
- 2+ years of experience with modern JavaScript, React, and Node.js.
- Strong understanding of relational databases (PostgreSQL preferred) and SQL.
- Familiarity with Git version control, CI/CD pipelines, and automated testing.
- Experience with Docker or cloud deployments is a plus.
- Bachelor's degree in Computer Science or equivalent practical experience.`,
  },
  {
    title: "Frontend React Engineer",
    text: `Seeking a talented Frontend Engineer specializing in modern web interfaces.
Responsibilities:
- Develop rich, responsive user experiences with React, Next.js, and TypeScript.
- Implement polished UI component libraries using Tailwind CSS and accessible design patterns.
- Optimize frontend bundle size, caching, and Lighthouse web vitals performance.
- Work closely with backend teams to integrate GraphQL and REST endpoints.
Qualifications:
- 3+ years experience with React, TypeScript, and modern CSS frameworks.
- Deep understanding of state management, browser rendering, and DOM performance.
- Experience with unit and integration testing (Jest, React Testing Library, or Cypress).
- Bachelor's degree in Computer Science, Software Engineering, or related discipline.`,
  },
  {
    title: "Backend Node.js Engineer",
    text: `We are hiring a Backend Engineer to scale our core API services and data infrastructure.
Responsibilities:
- Design, implement, and maintain high-throughput REST APIs and microservices in Node.js.
- Model database schemas in PostgreSQL, write performant migrations, and optimize queries.
- Build secure user authentication flows, rate limiting, and caching layers with Redis.
- Ensure 99.9% uptime with robust error handling, monitoring, and telemetry logging.
Requirements:
- 3+ years developing backend architectures using Node.js, Express, or Fastify.
- Strong relational database experience with PostgreSQL or MySQL.
- Familiarity with cloud platforms (AWS, GCP), Docker containerization, and Kubernetes.
- Solid understanding of software engineering fundamentals, algorithms, and security practices.`,
  },
];

export default function JobMatchPage() {
  const params = useParams();
  const resumeId = params.id as string;

  const [resume, setResume] = useState<Resume | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  const [initialLoading, setInitialLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Load the target resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        setInitialLoading(true);
        const fetched = await getResumeById(resumeId);
        setResume(fetched);
      } catch {
        setError("Failed to load resume. Please check your credentials and try again.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  // Handle Job Match Evaluation
  const handleAnalyze = async () => {
    const trimmed = jobDescription.trim();
    if (!trimmed) {
      toast.error("Please enter a job description to analyze.");
      return;
    }
    if (trimmed.length < 50) {
      toast.error("Job description is too short. Please provide at least 50 characters.");
      return;
    }
    if (trimmed.length > 25000) {
      toast.error("Job description exceeds 25,000 characters limit.");
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);
      setAnalysisStage(1);

      // Staged visual animation for user feedback
      const stageTimer1 = setTimeout(() => setAnalysisStage(2), 1200);
      const stageTimer2 = setTimeout(() => setAnalysisStage(3), 2600);

      const result = await aiMatchResumeToJob({
        resumeId,
        resume: resume || undefined,
        jobDescription: trimmed,
      });

      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      setMatchResult(result);
      toast.success("Job match analysis complete!");
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Failed to analyze job match. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setAnalyzing(false);
      setAnalysisStage(0);
    }
  };

  const handleReset = () => {
    setMatchResult(null);
    setError(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-16">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/resume/edit/${resumeId}`}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Editor
            </Link>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600" />
              <h1 className="text-base font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                {resume?.title ? `${resume.title} — Job Match` : "Job Description Matcher"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/resume/${resumeId}/analyze`}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded-xl transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>General ATS Score</span>
            </Link>

            {matchResult && (
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Job Match</span>
              </button>
            )}
          </div>
        </div>

        {/* Initial Loading */}
        {initialLoading && (
          <div className="p-16 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center justify-center gap-4 text-center">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <p className="text-xs text-gray-500">Loading resume profile...</p>
          </div>
        )}

        {/* Error Notification */}
        {!initialLoading && error && (
          <div className="p-6 bg-white rounded-2xl border border-red-200 shadow-xs flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Analysis Issue</h3>
            <p className="text-xs text-gray-500 max-w-md">{error}</p>
            <button
              onClick={handleAnalyze}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Input Form State (Visible when no match result yet or re-evaluating) */}
        {!initialLoading && !matchResult && !analyzing && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                  <FileSearch className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-gray-900">Compare Resume with a Target Job</h2>
              </div>
              <p className="text-xs text-gray-500 max-w-2xl">
                Paste any job opening description below. We will calculate a deterministic match score,
                cross-reference required skills, detect keyword coverage, and highlight actionable ways to align
                your resume.
              </p>
            </div>

            {/* Quick Sample Presets */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Quick-fill with sample roles:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_JOB_DESCRIPTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setJobDescription(preset.text)}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 border border-gray-200 hover:border-blue-300 rounded-lg text-xs font-medium transition"
                  >
                    + {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Description Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="job-description-input" className="font-semibold text-gray-800">
                  Job Description Text <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-[11px] ${
                    jobDescription.length > 25000
                      ? "text-red-600 font-bold"
                      : jobDescription.length >= 50
                      ? "text-emerald-600"
                      : "text-gray-400"
                  }`}
                >
                  {jobDescription.length.toLocaleString()} / 25,000 chars (min 50)
                </span>
              </div>

              <textarea
                id="job-description-input"
                rows={12}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here (responsibilities, qualifications, required technologies, preferred skills)..."
                className="w-full p-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-xs text-gray-800 font-mono leading-relaxed transition resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-100">
              <span className="text-[11px] text-gray-400">
                Your resume content remains secure and will not be altered during analysis.
              </span>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing || jobDescription.trim().length < 50 || jobDescription.length > 25000}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition"
              >
                <Target className="w-4 h-4" />
                <span>Analyze Job Compatibility</span>
              </button>
            </div>
          </div>
        )}

        {/* Loading Progress State */}
        {analyzing && (
          <div className="p-16 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center justify-center gap-6 text-center">
            <div className="relative w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-8 h-8 animate-pulse text-blue-600" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-base font-bold text-gray-900">
                Evaluating Resume-to-Job Alignment...
              </h3>
              <p className="text-xs text-gray-500">
                Comparing candidate qualifications with employer specifications using deterministic matching and qualitative AI analysis.
              </p>
            </div>

            {/* Staged Progress Indicator */}
            <div className="w-full max-w-sm space-y-2 text-left bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2.5 text-xs text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">Parsing job requirements & technical stack</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-700">
                {analysisStage >= 2 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
                )}
                <span className={analysisStage >= 2 ? "font-medium" : "text-blue-700 font-semibold"}>
                  Scanning experience & project overlap
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-700">
                {analysisStage >= 3 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-300 shrink-0" />
                )}
                <span className={analysisStage >= 3 ? "text-blue-700 font-semibold" : "text-gray-400"}>
                  Synthesizing anti-fabrication recommendations
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {!analyzing && matchResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Match Score Gauge Card */}
            <JobMatchScoreCard
              score={matchResult.matchScore}
              tier={matchResult.matchTier}
              jobTitle={matchResult.jobTitle}
              summary={matchResult.summary}
            />

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Skills & Keywords (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <JobSkillKeywordCard
                  matchingSkills={matchResult.matchingSkills}
                  missingSkills={matchResult.missingSkills}
                  matchingKeywords={matchResult.matchingKeywords}
                  missingKeywords={matchResult.missingKeywords}
                />
              </div>

              {/* Right Column: Experience, Project, & Education Match (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <JobSectionMatchCard
                  experienceMatch={matchResult.experienceMatch}
                  projectMatch={matchResult.projectMatch}
                  educationMatch={matchResult.educationMatch}
                />
              </div>
            </div>

            {/* Recommendations & Phase 4 Entry Point */}
            <JobMatchRecommendations
              recommendations={matchResult.recommendations}
              resumeId={resumeId}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
