"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function SummaryForm() {
  const { resumeData, setResumeData } = useResume();

  return (
    <SectionCard title="Professional Summary">
      <textarea
        rows={6}
        placeholder="Write a professional summary..."
        value={resumeData.summary}
        onChange={(e) =>
          setResumeData((prev) => ({
            ...prev,
            summary: e.target.value,
          }))
        }
        className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </SectionCard>
  );
}