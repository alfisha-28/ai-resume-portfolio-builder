"use client";

import { useState } from "react";
<<<<<<< HEAD
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useResume } from "@/context/ResumeContext";
import { aiGenerateSummary, SummaryMode } from "@/services/ai.service";
import AIPreviewModal, { AIModeOption } from "./AIPreviewModal";

const SUMMARY_MODES: AIModeOption<SummaryMode>[] = [
  { id: "generate", label: "Generate Fresh", description: "Create a 3-sentence summary from your background" },
  { id: "improve", label: "Improve Impact", description: "Elevate phrasing and clarity" },
  { id: "concise", label: "Make Concise", description: "Trim fluff to 2 punchy sentences" },
  { id: "professional", label: "Executive Tone", description: "Authoritative corporate phrasing" },
  { id: "ats", label: "ATS Optimized", description: "Integrate key skills and job titles naturally" },
];

export default function AISummaryGenerator() {
  const { resumeData, setResumeData } = useResume();
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<SummaryMode>(resumeData.summary ? "improve" : "generate");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const triggerAI = async (selectedMode: SummaryMode) => {
    if (!resumeData.jobTitle && !resumeData.summary) {
      toast.error("Please add a Job Title first so AI can tailor your summary.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await aiGenerateSummary({
        fullName: resumeData.fullName,
        jobTitle: resumeData.jobTitle,
        skills: resumeData.skills,
        experience: resumeData.experience,
        currentSummary: resumeData.summary,
        mode: selectedMode,
      });
      setGeneratedText(result);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Failed to generate summary. Please try again.";
      setError(msg);
      toast.error(msg);
=======
import { Sparkles, Loader2 } from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import { generateSummary } from "@/services/ai.service";
import toast from "react-hot-toast";

export default function AISummaryGenerator() {
  const { resumeData, updateField } = useResume();
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resumeData.jobTitle && !resumeData.fullName) {
      toast.error("Add your name and job title first.");
      return;
    }
    try {
      setLoading(true);
      const text = await generateSummary({
        fullName: resumeData.fullName,
        jobTitle: resumeData.jobTitle,
        experience: resumeData.experience.map((e) => ({
          jobTitle: e.jobTitle,
          company: e.company,
          description: e.description,
        })),
        skills: resumeData.skills,
      });
      updateField("summary", text);
      toast.success("Summary generated!");
    } catch {
      toast.error("AI is not configured yet. Add GEMINI_API_KEY or OPENAI_API_KEY to the server.");
>>>>>>> origin/main
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleOpenModal = () => {
    const initialMode = resumeData.summary?.trim() ? "improve" : "generate";
    setMode(initialMode);
    setModalOpen(true);
    triggerAI(initialMode);
  };

  const handleModeChange = (newMode: SummaryMode) => {
    setMode(newMode);
    triggerAI(newMode);
  };

  const handleApply = (finalText: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary: finalText.trim(),
    }));
    setModalOpen(false);
    toast.success("Summary updated!");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors shadow-2xs"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{resumeData.summary ? "Refine with AI" : "Generate with AI"}</span>
      </button>

      <AIPreviewModal<SummaryMode>
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Summary Assistant"
        subtitle={`Tailoring for ${resumeData.jobTitle || "your profile"}`}
        modes={SUMMARY_MODES}
        activeMode={mode}
        onModeChange={handleModeChange}
        originalText={resumeData.summary || ""}
        generatedText={generatedText}
        isLoading={loading}
        error={error}
        onRegenerate={() => triggerAI(mode)}
        onApply={handleApply}
      />
    </>
=======
  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition disabled:opacity-60"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
      {loading ? "Generating..." : "AI Generate"}
    </button>
>>>>>>> origin/main
  );
}
