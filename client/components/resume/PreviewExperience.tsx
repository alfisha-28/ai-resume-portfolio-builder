"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewExperience() {
  const { resumeData } = useResume();

  const validExperience = resumeData.experience.filter(
    (exp) => exp.jobTitle?.trim() || exp.company?.trim()
  );

  if (!validExperience.length) return null;

  return (
    <>
      <SectionTitle title="Experience" />

      <div className="space-y-6">
        {validExperience.map((exp) => (
          <div
            key={exp.id}
            className="border-l-2 border-blue-600 pl-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {exp.jobTitle}
                </h3>

                <p className="text-gray-700 font-medium">
                  {exp.company}
                </p>

                {exp.location && (
                  <p className="text-sm text-gray-500">
                    {exp.location}
                  </p>
                )}

                {exp.employmentType && (
                  <p className="text-sm italic text-gray-500">
                    {exp.employmentType}
                  </p>
                )}
              </div>

              <span className="text-sm text-gray-500 whitespace-nowrap">
                {exp.startDate} -{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
              </span>
            </div>

            {exp.description && (
              <div className="mt-3 space-y-1">
                {exp.description
                  .split("\n")
                  .filter((line) => line.trim())
                  .map((line, index) => (
                    <p key={index} className="text-sm text-gray-700 leading-6 flex">
                      <span className="mr-2 shrink-0">
                        {line.startsWith("•") ? "" : "•"}
                      </span>
                      <span>{line.startsWith("•") ? line.slice(1).trim() : line}</span>
                    </p>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}