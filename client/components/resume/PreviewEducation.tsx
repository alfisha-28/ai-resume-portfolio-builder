"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewEducation() {
  const { resumeData } = useResume();

  if (!resumeData.education.length) return null;

  return (
    <>
      <SectionTitle title="Education" />

      <div className="space-y-5">
        {resumeData.education.map((edu) => (
          <div
            key={edu.id}
            className="border-l-2 border-blue-600 pl-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {edu.degree}
                </h3>

                <p className="text-gray-700">
                  {edu.institution}
                </p>

                {edu.location && (
                  <p className="text-sm text-gray-500">
                    {edu.location}
                  </p>
                )}
              </div>

              <span className="text-sm text-gray-500 whitespace-nowrap">
                {edu.startYear} - {edu.endYear}
              </span>
            </div>

            {edu.cgpa && (
              <p className="mt-2 text-sm font-medium text-gray-700">
                CGPA: {edu.cgpa}
              </p>
            )}

            {edu.description && (
              <p className="mt-2 text-sm text-gray-600 leading-6">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}