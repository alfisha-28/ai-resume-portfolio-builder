"use client";

import SectionCard from "./SectionCard";
import { ResumeData } from "@/types/resume";
import { useResume } from "@/context/ResumeContext";

export default function PersonalInfoForm() {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (
    field: keyof ResumeData,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SectionCard title="Personal Information" defaultOpen>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Resume Title</label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer Resume"
            value={resumeData.title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={resumeData.fullName ?? ""}
            onChange={(e) =>
              handleChange("fullName", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Professional Title
          </label>
          <input
            type="text"
            placeholder="Frontend Developer"
           value={resumeData.jobTitle ?? ""}
            onChange={(e) =>
              handleChange("jobTitle", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={resumeData.email ?? ""}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="text"
            placeholder="+91 9876543210"
            value={resumeData.phone ?? ""}
            onChange={(e) =>
              handleChange("phone", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Ahmedabad, India"
            value={resumeData.location ?? ""}
            onChange={(e) =>
              handleChange("location", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            LinkedIn
          </label>
          <input
            type="text"
            placeholder="linkedin.com/in/johndoe"
            value={resumeData.linkedin ?? ""}
            onChange={(e) =>
              handleChange("linkedin", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            GitHub
          </label>
          <input
            type="text"
            placeholder="github.com/johndoe"
            value={resumeData.github ?? ""}
            onChange={(e) =>
              handleChange("github", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Portfolio
          </label>
          <input
            type="text"
            placeholder="portfolio.com"
            value={resumeData.portfolio ?? ""}
            onChange={(e) =>
              handleChange("portfolio", e.target.value)
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>
    </SectionCard>
  );
}