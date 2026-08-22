"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewCertifications() {
  const { resumeData } = useResume();

  if (!resumeData.certifications.length) return null;

  return (
    <>
      <SectionTitle title="Certifications" />

      <div className="space-y-4">
        {resumeData.certifications.map((cert) => (
          <div
            key={cert.id}
            className="border-l-2 border-blue-600 pl-4"
          >
            <h3 className="font-semibold">
              {cert.name}
            </h3>

            <p className="text-gray-700">
              {cert.organization}
            </p>

            <p className="text-sm text-gray-500">
              Issued: {cert.issueDate}
            </p>

            {cert.credentialId && (
              <p className="text-sm">
                Credential ID: {cert.credentialId}
              </p>
            )}

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline"
              >
                View Credential
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}