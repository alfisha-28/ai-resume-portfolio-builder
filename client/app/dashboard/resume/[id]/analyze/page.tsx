"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Sparkles, FileText, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ATSScoreCard from "@/components/ai/ATSScoreCard";
import AnalysisSectionCard from "@/components/ai/AnalysisSectionCard";
import KeywordAnalysis from "@/components/ai/KeywordAnalysis";
import ActionPlan from "@/components/ai/ActionPlan";

import { getResumeById } from "@/services/resume.service";
import { aiAnalyzeResume, type ATSAnalysisResult } from "@/services/ai.service";
import type { Resume } from "@/types/resume";

export default function ResumeAnalyzePage() {
  const params = useParams();
  const resumeId = params.id as string;

  const [resume, setResume] = useState<Resume | null>(null);
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performAnalysis = useCallback(async (resumeData: Resume) => {
    try {
      setAnalyzing(true);
      setError(null);
      const result = await aiAnalyzeResume({
        resumeId: resumeData.id,
        resume: resumeData,
      });
      setAnalysis(result);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Failed to analyze resume. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setAnalyzing(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAndAnalyze = async () => {
      try {
        setLoading(true);
        const fetchedResume = await getResumeById(resumeId);
        setResume(fetchedResume);
        await performAnalysis(fetchedResume);
      } catch {
        setError("Failed to load resume. Please verify your permissions and try again.");
        setLoading(false);
      }
    };

    if (resumeId) {
      fetchAndAnalyze();
    }
  }, [resumeId, performAnalysis]);

  const handleReanalyze = () => {
    if (resume) {
      performAnalysis(resume);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Top Navigation & Actions */}
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
              <FileText className="w-4 h-4 text-blue-600" />
              <h1 className="text-base font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                {resume?.title || "Resume Analysis"}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReanalyze}
            disabled={analyzing || loading}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition shadow-xs self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${analyzing ? "animate-spin" : ""}`} />
            <span>{analyzing ? "Analyzing..." : "Re-run Analysis"}</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-16 bg-white rounded-2xl border border-gray-200 shadow-xs flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-gray-900">Evaluating Resume Compatibility...</h2>
              <p className="text-xs text-gray-500 max-w-sm">
                Running deterministic checks, keyword density scans, and qualitative impact scoring with Gemini.
              </p>
            </div>
            <Loader2 className="w-5 h-5 text-purple-600 animate-spin mt-2" />
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 bg-white rounded-2xl border border-red-200 shadow-xs flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">Analysis Unavailable</h3>
            <p className="text-xs text-gray-500 max-w-md">{error}</p>
            <button
              onClick={handleReanalyze}
              className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition"
            >
              Retry Analysis
            </button>
          </div>
        )}

        {/* Success / Report Display */}
        {!loading && !error && analysis && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Score Overview */}
            <ATSScoreCard
              score={analysis.overallScore}
              status={analysis.atsReadiness.status}
              summary={analysis.atsReadiness.summary}
            />

            {/* Two Column Layout: Sections on left, Keywords & Actions on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Section Breakdowns (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Section Performance Breakdown</h3>
                  <span className="text-xs text-gray-400">Click section to view details</span>
                </div>

                <div className="space-y-3">
                  <AnalysisSectionCard
                    sectionKey="personalInfo"
                    name="Personal Information & Contact"
                    analysis={analysis.sections.personalInfo}
                    resumeId={resumeId}
                  />
                  <AnalysisSectionCard
                    sectionKey="summary"
                    name="Professional Summary"
                    analysis={analysis.sections.summary}
                    resumeId={resumeId}
                  />
                  <AnalysisSectionCard
                    sectionKey="experience"
                    name="Work Experience & Impact"
                    analysis={analysis.sections.experience}
                    resumeId={resumeId}
                  />
                  <AnalysisSectionCard
                    sectionKey="projects"
                    name="Key Projects & Technical Scope"
                    analysis={analysis.sections.projects}
                    resumeId={resumeId}
                  />
                  <AnalysisSectionCard
                    sectionKey="skills"
                    name="Skills & Technical Breadth"
                    analysis={analysis.sections.skills}
                    resumeId={resumeId}
                  />
                  <AnalysisSectionCard
                    sectionKey="education"
                    name="Education & Credentials"
                    analysis={analysis.sections.education}
                    resumeId={resumeId}
                  />
                </div>
              </div>

              {/* Right Column: Keywords & Action Plan (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <KeywordAnalysis
                  found={analysis.keywords.found}
                  recommended={analysis.keywords.recommended}
                  missing={analysis.keywords.missing}
                />

                <ActionPlan
                  strengths={analysis.strengths}
                  weaknesses={analysis.weaknesses}
                  actionItems={analysis.actionItems}
                  resumeId={resumeId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
