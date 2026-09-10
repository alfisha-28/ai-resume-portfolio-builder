"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { aiGenerateProjectDescription, ProjectMode } from "@/services/ai.service";
import AIPreviewModal, { AIModeOption } from "./AIPreviewModal";

const PROJECT_MODES: AIModeOption<ProjectMode>[] = [
  { id: "generate", label: "Overview", description: "Clear 2-3 sentence technical overview" },
  { id: "bullets", label: "Bullet Points", description: "Convert to key technical accomplishment bullets" },
  { id: "improve", label: "Technical Polish", description: "Elevate technical terminology and clarity" },
  { id: "ats", label: "ATS Keyword Match", description: "Emphasize frameworks and tech stack" },
  { id: "concise", label: "Make Concise", description: "Shorten into 1-2 punchy sentences" },
];

interface Props {
  title: string;
  technologies: string;
  description?: string;
  onGenerated: (text: string) => void;
}

export default function AIProjectGenerator({
  title,
  technologies,
  description = "",
  onGenerated,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<ProjectMode>(description ? "improve" : "generate");
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const triggerAI = async (selectedMode: ProjectMode) => {
    if (!title.trim() && !description.trim()) {
      toast.error("Please add a Project Title first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await aiGenerateProjectDescription({
        title,
        technologies,
        description,
        mode: selectedMode,
      });
      setGeneratedText(res);
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      const msg = e.response?.data?.message || "Failed to generate project description.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    const initialMode: ProjectMode = description.trim() ? "improve" : "generate";
    setMode(initialMode);
    setModalOpen(true);
    triggerAI(initialMode);
  };

  const handleModeChange = (newMode: ProjectMode) => {
    setMode(newMode);
    triggerAI(newMode);
  };

  const handleApply = (finalText: string) => {
    onGenerated(finalText.trim());
    setModalOpen(false);
    toast.success("Project description updated!");
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex items-center gap-1 px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-medium rounded-lg transition-colors"
      >
        <Sparkles className="w-3 h-3 text-purple-600" />
        <span>{description ? "Refine with AI" : "Generate with AI"}</span>
      </button>

      <AIPreviewModal<ProjectMode>
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Project Assistant"
        subtitle={title ? `Project: "${title}"` : "New Project"}
        modes={PROJECT_MODES}
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
  );
}
