"use client";

import { useState } from "react";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition disabled:opacity-60"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
      {loading ? "Generating..." : "AI Generate"}
    </button>
  );
}
