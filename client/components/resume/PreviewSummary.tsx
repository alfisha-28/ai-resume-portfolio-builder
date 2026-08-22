"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewSummary() {
  const { resumeData } = useResume();

  if (!resumeData.summary) return null;

  return (
    <>
      <SectionTitle title="Professional Summary" />

      <p className="text-sm text-gray-700 leading-7">
        {resumeData.summary}
      </p>
    </>
  );
}