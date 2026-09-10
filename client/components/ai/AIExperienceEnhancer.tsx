"use client";

import { useState } from "react";
<<<<<<< HEAD
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { aiEnhanceExperience, ExperienceMode } from "@/services/ai.service";
import AIPreviewModal, { AIModeOption } from "./AIPreviewModal";

const EXPERIENCE_MODES: AIModeOption<ExperienceMode>[] = [
  { id: "action_verbs", label: "Action Verbs", description: "Start every bullet with an authoritative verb" },
  { id: "achievement_oriented", label: "Impact & Results", description: "Focus on problem-action-outcomes" },
  { id: "improve", label: "ATS Polish", description: "Format as clean 3-4 professional bullets" },
  { id: "concise", label: "Make Concise", description: "Tighten points without fluff" },
  { id: "generate", label: "Draft from Role", description: "Draft realistic core responsibilities" },
];

interface Props {
  jobTitle: string;
  company: string;
  description: string;
  onEnhanced: (text: string) => void;
}

export default function AIExperienceEnhancer({
  jobTitle,
  company,
  description,
  onEnhanced,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<ExperienceMode>(description ? "action_verbs" : "generate");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const triggerAI = async (selectedMode: ExperienceMode) => {
    if (!description.trim() && selectedMode !== "generate") {
      toast.error("Enter a few rough notes or responsibilities first, or choose 'Draft from Role'.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const enhanced = await aiEnhanceExperience({
        jobTitle,
        company,
        description,
        mode: selectedMode,
      });
      setGeneratedText(enhanced);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Failed to enhance experience. Please try again.";
      setError(msg);
      toast.error(msg);
=======
import { Sparkles, Loader2 } from "lucide-react";
import { improveExperience } from "@/services/ai.service";
import toast from "react-hot-toast";

interface Props {
  description: string;
  jobTitle: string;
  onResult: (text: string) => void;
}

export default function AIExperienceEnhancer({ description, jobTitle, onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!description.trim()) {
      toast.error("Add a description first.");
      return;
    }
    try {
      setLoading(true);
      const text = await improveExperience({ text: description, context: jobTitle });
      onResult(text);
      toast.success("Description enhanced!");
    } catch {
      toast.error("AI is not configured yet.");
>>>>>>> origin/main
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleOpenModal = () => {
    const initialMode: ExperienceMode = description.trim() ? "action_verbs" : "generate";
    setMode(initialMode);
    setModalOpen(true);
    triggerAI(initialMode);
  };

  const handleModeChange = (newMode: ExperienceMode) => {
    setMode(newMode);
    triggerAI(newMode);
  };

  const handleApply = (finalText: string) => {
    onEnhanced(finalText.trim());
    setModalOpen(false);
    toast.success("Experience updated!");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-medium rounded-lg transition-colors"
      >
        <Sparkles className="w-3 h-3 text-purple-600" />
        <span>{description ? "Enhance with AI" : "Draft with AI"}</span>
      </button>

      <AIPreviewModal<ExperienceMode>
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Experience Enhancer"
        subtitle={`${jobTitle || "Role"} at ${company || "Company"}`}
        modes={EXPERIENCE_MODES}
        activeMode={mode}
        onModeChange={handleModeChange}
        originalText={description || ""}
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
      onClick={handleEnhance}
      disabled={loading}
      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition disabled:opacity-60"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Enhancing..." : "AI Enhance"}
    </button>
>>>>>>> origin/main
  );
}
