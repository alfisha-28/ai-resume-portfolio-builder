"use client";

import { useState } from "react";
import { Sparkles, Loader2, Plus, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useResume } from "@/context/ResumeContext";
import { aiSuggestSkills } from "@/services/ai.service";

export default function AISkillsSuggester() {
  const { resumeData, setResumeData } = useResume();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [addedSkills, setAddedSkills] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  const handleFetchSuggestions = async () => {
    if (!resumeData.jobTitle && resumeData.skills.length === 0) {
      toast.error("Please add a Job Title or at least one skill first.");
      return;
    }

    try {
      setLoading(true);
      setIsOpen(true);
      const skills = await aiSuggestSkills({
        jobTitle: resumeData.jobTitle,
        existingSkills: resumeData.skills,
        experience: resumeData.experience,
        projects: resumeData.projects,
      });

      if (skills.length === 0) {
        toast("No additional skills found. Your skills look comprehensive!");
      } else {
        setSuggestions(skills);
        setAddedSkills(new Set());
      }
    } catch {
      toast.error("Failed to fetch skill suggestions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = (skillName: string) => {
    // Check if already in resume skills
    const alreadyExists = resumeData.skills.some(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );
    if (alreadyExists) return;

    setResumeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
          name: skillName,
        },
      ],
    }));

    setAddedSkills((prev) => new Set(prev).add(skillName));
    toast.success(`Added "${skillName}"`);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleFetchSuggestions}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 disabled:opacity-50 text-xs font-medium rounded-lg transition-colors"
        >
          {loading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          )}
          {loading ? "Analyzing Profile..." : "Suggest Skills with AI"}
        </button>

        {isOpen && suggestions.length > 0 && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-xs flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Dismiss
          </button>
        )}
      </div>

      {isOpen && (
        <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-900">
              Recommended for {resumeData.jobTitle || "your profile"}:
            </span>
            <span className="text-[11px] text-gray-500">Click to add to resume</span>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 py-3 text-xs text-purple-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning industry trends for your role...</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 pt-1">
              {suggestions.map((skillName) => {
                const isAdded = addedSkills.has(skillName);
                return (
                  <button
                    key={skillName}
                    type="button"
                    onClick={() => !isAdded && handleAddSkill(skillName)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isAdded
                        ? "bg-green-100 text-green-700 border border-green-200 cursor-default"
                        : "bg-white text-gray-700 border border-purple-200 hover:border-purple-400 hover:bg-purple-100/50 cursor-pointer shadow-2xs"
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-3 h-3 text-green-600" />
                    ) : (
                      <Plus className="w-3 h-3 text-purple-600" />
                    )}
                    <span>{skillName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
