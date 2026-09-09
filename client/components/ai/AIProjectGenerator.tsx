"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { improveProject } from "@/services/ai.service";
import toast from "react-hot-toast";

interface Props {
  description: string;
  title: string;
  onResult: (text: string) => void;
}

export default function AIProjectGenerator({ description, title, onResult }: Props) {
  const [loading, setLoading] = useState(false);

  const handleImprove = async () => {
    if (!description.trim() && !title.trim()) {
      toast.error("Add a project title or description first.");
      return;
    }
    try {
      setLoading(true);
      const text = await improveProject({ text: description, context: title });
      onResult(text);
      toast.success("Description improved!");
    } catch {
      toast.error("AI is not configured yet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleImprove}
      disabled={loading}
      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition disabled:opacity-60"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Improving..." : "AI Improve"}
    </button>
  );
}
