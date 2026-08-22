"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function CertificationsForm() {
  const { resumeData, setResumeData } = useResume();

  const addCertification = () => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now().toString(),
          name: "",
          organization: "",
          issueDate: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter(
        (cert) => cert.id !== id
      ),
    }));
  };

  const handleChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id
          ? { ...cert, [field]: value }
          : cert
      ),
    }));
  };

  return (
    <SectionCard title="Certifications">
      {resumeData.certifications.map((cert, index) => (
        <div
          key={cert.id}
          className="border rounded-xl p-5 mb-6 bg-gray-50"
        >
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">
              Certification {index + 1}
            </h3>

            <button
              onClick={() => removeCertification(cert.id)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>

          <div className="space-y-4">

            <input
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e)=>
                handleChange(cert.id,"name",e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Organization"
              value={cert.organization}
              onChange={(e)=>
                handleChange(cert.id,"organization",e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              type="month"
              value={cert.issueDate}
              onChange={(e)=>
                handleChange(cert.id,"issueDate",e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Credential ID"
              value={cert.credentialId}
              onChange={(e)=>
                handleChange(cert.id,"credentialId",e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Credential URL"
              value={cert.credentialUrl}
              onChange={(e)=>
                handleChange(cert.id,"credentialUrl",e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        + Add Certification
      </button>
    </SectionCard>
  );
}