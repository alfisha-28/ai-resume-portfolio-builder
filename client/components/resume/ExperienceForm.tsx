"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";
import AIExperienceEnhancer from "@/components/ai/AIExperienceEnhancer";

export default function ExperienceForm() {
  const { resumeData, setResumeData } = useResume();

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: "",
          jobTitle: "",
          employmentType: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter(
        (exp) => exp.id !== id
      ),
    }));
  };

  const handleChange = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              [field]: value,
            }
          : exp
      ),
    }));
  };

  return (
    <SectionCard title="Experience">

      {resumeData.experience.map((exp, index) => (

        <div
          key={exp.id}
          className="border rounded-xl p-5 mb-6 bg-gray-50"
        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold">
              Experience {index + 1}
            </h3>

            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-600"
            >
              Remove
            </button>

          </div>

          <div className="space-y-4">

            <input
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleChange(
                  exp.id,
                  "company",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) =>
                handleChange(
                  exp.id,
                  "jobTitle",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Employment Type"
              value={exp.employmentType}
              onChange={(e) =>
                handleChange(
                  exp.id,
                  "employmentType",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Location"
              value={exp.location}
              onChange={(e) =>
                handleChange(
                  exp.id,
                  "location",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="month"
                value={exp.startDate}
                onChange={(e) =>
                  handleChange(
                    exp.id,
                    "startDate",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

              <input
                type="month"
                value={exp.endDate}
                disabled={exp.currentlyWorking}
                onChange={(e) =>
                  handleChange(
                    exp.id,
                    "endDate",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

            </div>

            <label className="flex gap-3 items-center">

              <input
                type="checkbox"
                checked={exp.currentlyWorking}
                onChange={(e) =>
                  handleChange(
                    exp.id,
                    "currentlyWorking",
                    e.target.checked
                  )
                }
              />

              Currently Working Here

            </label>

            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-600">Responsibilities</label>
              <AIExperienceEnhancer
                description={exp.description}
                jobTitle={exp.jobTitle}
                onResult={(text) => handleChange(exp.id, "description", text)}
              />
            </div>
            <textarea
              rows={5}
              placeholder="Responsibilities..."
              value={exp.description}
              onChange={(e) =>
                handleChange(exp.id, "description", e.target.value)
              }
              className="w-full border rounded-lg p-3 resize-none"
            />

          </div>

        </div>

      ))}

      <button
        onClick={addExperience}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        + Add Experience
      </button>

    </SectionCard>
  );
}