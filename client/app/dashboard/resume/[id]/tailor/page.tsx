"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Wand2,
  FileText,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Target,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TailorJobInput from "@/components/ai-tailor/TailorJobInput";
import TailorLoadingState from "@/components/ai-tailor/TailorLoadingState";
import TailorScoreCard from "@/components/ai-tailor/TailorScoreCard";
import TailorSummarySuggestion from "@/components/ai-tailor/TailorSummarySuggestion";
import TailorExperienceSuggestions from "@/components/ai-tailor/TailorExperienceSuggestions";
import TailorProjectSuggestions from "@/components/ai-tailor/TailorProjectSuggestions";
import TailorSkillsSuggestion from "@/components/ai-tailor/TailorSkillsSuggestion";
import TailorKeywordAnalysis from "@/components/ai-tailor/TailorKeywordAnalysis";
import TailorRecommendationList from "@/components/ai-tailor/TailorRecommendationList";
import TailorApplyPanel from "@/components/ai-tailor/TailorApplyPanel";
import TailorPreviewModal from "@/components/ai-tailor/TailorPreviewModal";

import { getResumeById, updateResume, duplicateResume } from "@/services/resume.service";
import { aiTailorResumeToJob, type ResumeTailorResult } from "@/services/ai.service";
import type { Resume, ResumeData } from "@/types/resume";

export default function ResumeTailorPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = params.id as string;

  const [resume, setResume] = useState<Resume | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AI Tailor Result
  const [tailorResult, setTailorResult] = useState<ResumeTailorResult | null>(null);

  // User accept/reject decisions map
  // Key format: "summary", "exp-${expId}-${bulletIndex}", "proj-${projId}"
  // Value: "accepted" | "rejected" | "pending"
  const [decisions, setDecisions] = useState<Record<string, "accepted" | "rejected" | "pending">>({});

  // Draft state representing the modified resume after applying accepted suggestions
  const [draftResume, setDraftResume] = useState<ResumeData | null>(null);
  const [hasAppliedDraft, setHasAppliedDraft] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // 1. Fetch target resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        setInitialLoading(true);
        const fetched = await getResumeById(resumeId);
        setResume(fetched);
        setDraftResume(fetched);
      } catch {
        setError("Failed to load resume. Please check permissions and try again.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (resumeId) {
      fetchResume();
    }
  }, [resumeId]);

  // Check if job description was passed from Job Match page via query param or sessionStorage
  useEffect(() => {
    const jdFromQuery = searchParams.get("jd");
    if (jdFromQuery) {
      try {
        setJobDescription(decodeURIComponent(jdFromQuery));
      } catch {
        setJobDescription(jdFromQuery);
      }
    } else {
      const jdFromSession = sessionStorage.getItem("pending_tailor_jd");
      if (jdFromSession) {
        setJobDescription(jdFromSession);
        sessionStorage.removeItem("pending_tailor_jd");
      }
    }
  }, [searchParams]);

  // Handle analysis
  const handleAnalyze = async () => {
    const trimmed = jobDescription.trim();
    if (!trimmed) {
      toast.error("Please provide a job description to tailor against.");
      return;
    }
    if (trimmed.length < 50) {
      toast.error("Job description is too short (minimum 50 characters).");
      return;
    }
    if (trimmed.length > 25000) {
      toast.error("Job description is too long (maximum 25,000 characters).");
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);

      const result = await aiTailorResumeToJob({
        resumeId,
        resume: resume || undefined,
        jobDescription: trimmed,
      });

      setTailorResult(result);

      // Reset decisions
      const initialDecisions: Record<string, "accepted" | "rejected" | "pending"> = {};
      if (result.summary) {
        initialDecisions["summary"] = "pending";
      }
      (result.experience || []).forEach((exp) => {
        initialDecisions[`exp-${exp.experienceId}-${exp.bulletIndex}`] = "pending";
      });
      (result.projects || []).forEach((proj) => {
        initialDecisions[`proj-${proj.projectId}`] = "pending";
      });

      setDecisions(initialDecisions);
      setHasAppliedDraft(false);
      if (resume) {
        setDraftResume(JSON.parse(JSON.stringify(resume)));
      }

      toast.success("Tailoring suggestions generated successfully!");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed to generate tailoring suggestions. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setAnalyzing(false);
    }
  };

  // Handle individual decision
  const handleDecision = (key: string, decision: "accepted" | "rejected" | "pending") => {
    setDecisions((prev) => ({
      ...prev,
      [key]: decision,
    }));
    // If draft was previously applied and user toggles, mark draft as needing re-apply
    setHasAppliedDraft(false);
  };

  // Accepted counts & affected sections calculation
  const { acceptedCount, sectionsAffectedCount } = useMemo(() => {
    let count = 0;
    const sections = new Set<string>();

    Object.entries(decisions).forEach(([key, val]) => {
      if (val === "accepted") {
        count++;
        if (key === "summary") sections.add("Summary");
        if (key.startsWith("exp-")) sections.add("Experience");
        if (key.startsWith("proj-")) sections.add("Projects");
      }
    });

    return {
      acceptedCount: count,
      sectionsAffectedCount: sections.size,
    };
  }, [decisions]);

  // Apply accepted decisions to draftResume
  const handleApplyDraft = () => {
    if (!resume || !tailorResult) return;

    // Deep clone original resume
    const draft: ResumeData = JSON.parse(JSON.stringify(resume));

    // 1. Apply summary
    if (decisions["summary"] === "accepted" && tailorResult.summary?.after) {
      draft.summary = tailorResult.summary.after;
    }

    // 2. Apply experience bullet rewrites
    if (Array.isArray(draft.experience) && Array.isArray(tailorResult.experience)) {
      draft.experience = draft.experience.map((exp, eIdx) => {
        const expId = exp.id || `exp-${eIdx}`;
        // Find accepted rewrites for this experience
        const rewrites = tailorResult.experience.filter(
          (item) =>
            item.experienceId === expId &&
            decisions[`exp-${item.experienceId}-${item.bulletIndex}`] === "accepted"
        );

        if (rewrites.length === 0) return exp;

        // Split current bullets
        const rawDesc = exp.description || "";
        let bullets = rawDesc
          .split(/\r?\n|•/)
          .map((b) => b.trim().replace(/^[-*•]\s*/, ""))
          .filter((b) => b.length > 5);

        if (bullets.length === 0 && rawDesc.trim().length > 0) {
          bullets = [rawDesc.trim()];
        }

        // Replace matched bullets
        rewrites.forEach((rw) => {
          if (rw.bulletIndex >= 0 && rw.bulletIndex < bullets.length) {
            bullets[rw.bulletIndex] = rw.after.replace(/^[•\-*]\s*/, "");
          } else {
            // Append if out of range
            bullets.push(rw.after.replace(/^[•\-*]\s*/, ""));
          }
        });

        return {
          ...exp,
          description: bullets.map((b) => `• ${b}`).join("\n"),
        };
      });
    }

    // 3. Apply project description rewrites
    if (Array.isArray(draft.projects) && Array.isArray(tailorResult.projects)) {
      draft.projects = draft.projects.map((proj, pIdx) => {
        const projId = proj.id || `proj-${pIdx}`;
        const isAccepted = decisions[`proj-${projId}`] === "accepted";
        if (isAccepted) {
          const rw = tailorResult.projects.find((item) => item.projectId === projId);
          if (rw?.after) {
            return {
              ...proj,
              description: rw.after,
            };
          }
        }
        return proj;
      });
    }

    setDraftResume(draft);
    setHasAppliedDraft(true);
    toast.success(`${acceptedCount} accepted modifications applied to local draft.`);
  };

  // Discard all changes
  const handleDiscard = () => {
    if (!resume) return;
    const resetDecisions: Record<string, "accepted" | "rejected" | "pending"> = {};
    Object.keys(decisions).forEach((k) => {
      resetDecisions[k] = "rejected";
    });
    setDecisions(resetDecisions);
    setDraftResume(JSON.parse(JSON.stringify(resume)));
    setHasAppliedDraft(false);
    toast("All suggestions discarded.", { icon: "↩️" });
  };

  // Save tailored resume
  const handleSave = async (asDuplicate: boolean) => {
    if (!resume || !draftResume) return;

    try {
      setIsSaving(true);

      if (asDuplicate) {
        // Step 1: Duplicate original resume using existing endpoint
        const duplicated = await duplicateResume(resumeId);

        // Target job title from JD analysis or fallback
        const inferredTitle = tailorResult?.summary?.suggestion?.includes("for")
          ? "Tailored"
          : resume.jobTitle || "Tailored";

        // Step 2: Update the newly created duplicate with draft data
        const tailoredTitle = `${resume.title || "Resume"} - ${inferredTitle} Tailored`;
        await updateResume(duplicated.id, {
          ...draftResume,
          title: tailoredTitle,
        });

        toast.success(`Created tailored resume: "${tailoredTitle}"!`);

        // Navigate to ATS analyzer for immediate re-analysis
        router.push(`/dashboard/resume/${duplicated.id}/analyze`);
      } else {
        // Update current resume directly
        await updateResume(resumeId, draftResume);
        toast.success("Current resume updated successfully with tailored content!");

        // Navigate to ATS analyzer
        router.push(`/dashboard/resume/${resumeId}/analyze`);
      }
    } catch {
      toast.error("Failed to save tailored resume. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-24">
        {/* Top Navigation Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link
              href="/dashboard"
              className="hover:text-gray-900 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link
              href={`/dashboard/resume/edit/${resumeId}`}
              className="hover:text-gray-900 transition truncate max-w-[150px]"
            >
              {resume?.title || "Resume"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-900 font-semibold">AI Resume Tailor</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/resume/${resumeId}/match`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition shadow-2xs"
            >
              <Target className="w-3.5 h-3.5 text-blue-600" />
              <span>Job Match</span>
            </Link>
            <Link
              href={`/dashboard/resume/${resumeId}/analyze`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>ATS Analyzer</span>
            </Link>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs font-bold underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Section */}
        <TailorJobInput
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onAnalyze={handleAnalyze}
          analyzing={analyzing}
          disabled={initialLoading}
        />

        {/* Loading Progress State */}
        {analyzing && <TailorLoadingState />}

        {/* Tailoring Results Section */}
        {!analyzing && tailorResult && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* 1. Score Card */}
            <TailorScoreCard
              scoreBefore={tailorResult.scoreBefore}
              estimatedScoreAfter={tailorResult.estimatedScoreAfter}
            />

            {/* 2. Professional Summary Suggestion */}
            {tailorResult.summary && (
              <TailorSummarySuggestion
                summary={tailorResult.summary}
                status={decisions["summary"] || "pending"}
                onAccept={() => handleDecision("summary", "accepted")}
                onReject={() => handleDecision("summary", "rejected")}
                onReset={() => handleDecision("summary", "pending")}
              />
            )}

            {/* 3. Work Experience Suggestions */}
            {tailorResult.experience && tailorResult.experience.length > 0 && (
              <TailorExperienceSuggestions
                suggestions={tailorResult.experience}
                experiences={resume?.experience || []}
                decisions={decisions}
                onDecision={handleDecision}
              />
            )}

            {/* 4. Projects Suggestions */}
            {tailorResult.projects && tailorResult.projects.length > 0 && (
              <TailorProjectSuggestions
                suggestions={tailorResult.projects}
                projects={resume?.projects || []}
                decisions={decisions}
                onDecision={handleDecision}
              />
            )}

            {/* 5. Skills Suggestions */}
            {tailorResult.skills && <TailorSkillsSuggestion skills={tailorResult.skills} />}

            {/* 6. Keyword Density Analysis */}
            {tailorResult.keywords && <TailorKeywordAnalysis keywords={tailorResult.keywords} />}

            {/* 7. Actionable Recommendations */}
            {tailorResult.recommendations && tailorResult.recommendations.length > 0 && (
              <TailorRecommendationList recommendations={tailorResult.recommendations} />
            )}

            {/* 8. Sticky Apply & Save Bottom Panel */}
            <TailorApplyPanel
              acceptedCount={acceptedCount}
              sectionsAffectedCount={sectionsAffectedCount}
              hasAppliedDraft={hasAppliedDraft}
              isSaving={isSaving}
              onPreview={() => setShowPreviewModal(true)}
              onApplyDraft={handleApplyDraft}
              onSave={handleSave}
              onDiscard={handleDiscard}
            />

            {/* Preview Modal */}
            {resume && draftResume && (
              <TailorPreviewModal
                isOpen={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                originalResume={resume}
                draftResume={draftResume}
              />
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
