"use client";

import { useResume } from "@/context/ResumeContext";

export default function PreviewHeader() {
  const { resumeData } = useResume();

  const contacts = [
    resumeData.email,
    resumeData.phone,
    resumeData.location,
    resumeData.linkedin,
    resumeData.github,
    resumeData.portfolio,
  ].filter(Boolean);

  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold leading-tight">
        {resumeData.fullName || "Your Name"}
      </h1>

      {resumeData.jobTitle && (
        <p className="text-base mt-1 opacity-80">
          {resumeData.jobTitle}
        </p>
      )}

      {contacts.length > 0 && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-3 text-xs opacity-75">
          {contacts.map((item, i) => (
            <span key={i} className="flex items-center gap-3">
              {item}
              {i < contacts.length - 1 && (
                <span className="opacity-40">·</span>
              )}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
