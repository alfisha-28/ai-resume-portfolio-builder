"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function InterestsForm() {
  const { resumeData, setResumeData } = useResume();
  const [input, setInput] = useState("");

  const addInterest = () => {
    if (!input.trim()) return;
    setResumeData((prev) => ({
      ...prev,
      interests: [
        ...prev.interests,
        { id: Date.now().toString(), name: input.trim() },
      ],
    }));
    setInput("");
  };

  const removeInterest = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i.id !== id),
    }));
  };

  return (
    <SectionCard title="Interests">
      <input
        placeholder="Type an interest and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addInterest();
          }
        }}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-3 mt-5">
        {resumeData.interests.map((interest) => (
          <div
            key={interest.id}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            {interest.name}
            <button
              onClick={() => removeInterest(interest.id)}
              className="font-bold hover:text-blue-900"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
