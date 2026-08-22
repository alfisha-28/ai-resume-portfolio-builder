"use client";

import { useResume } from "@/context/ResumeContext";

export default function PreviewHeader() {
  const { resumeData } = useResume();

  return (
    <header className="text-center pb-6 border-b border-gray-300">
      <h1 className="text-4xl font-bold text-gray-900">
        {resumeData.fullName || "Your Name"}
      </h1>

      <p className="text-lg text-blue-600 mt-2">
        {resumeData.jobTitle || "Professional Title"}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
        {resumeData.email && <span>{resumeData.email}</span>}
        {resumeData.phone && <span>{resumeData.phone}</span>}
        {resumeData.location && <span>{resumeData.location}</span>}
        {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
        {resumeData.github && <span>{resumeData.github}</span>}
        {resumeData.portfolio && <span>{resumeData.portfolio}</span>}
      </div>
    </header>
  );
}