"use client";

import { useState } from "react";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnhance}
      disabled={loading}
      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition disabled:opacity-60"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Enhancing..." : "AI Enhance"}
    </button>
  );
}
