"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function EducationForm() {
  const { resumeData, setResumeData } = useResume();

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: "",
          institution: "",
          location: "",
          startYear: "",
          endYear: "",
          cgpa: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleChange = (
    id: string,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id
          ? {
              ...edu,
              [field]: value,
            }
          : edu
      ),
    }));
  };

  return (
    <SectionCard title="Education">

      {resumeData.education.map((edu, index) => (

        <div
          key={edu.id}
          className="border rounded-xl p-5 mb-6 bg-gray-50"
        >

          <div className="flex justify-between items-center mb-4">

            <h3 className="font-semibold text-lg">
              Education {index + 1}
            </h3>

            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>

          </div>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleChange(
                  edu.id,
                  "degree",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleChange(
                  edu.id,
                  "institution",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Location"
              value={edu.location}
              onChange={(e) =>
                handleChange(
                  edu.id,
                  "location",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Start Year"
                value={edu.startYear}
                onChange={(e) =>
                  handleChange(
                    edu.id,
                    "startYear",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

              <input
                type="text"
                placeholder="End Year"
                value={edu.endYear}
                onChange={(e) =>
                  handleChange(
                    edu.id,
                    "endYear",
                    e.target.value
                  )
                }
                className="border rounded-lg p-3"
              />

            </div>

            <input
              type="text"
              placeholder="CGPA / Percentage"
              value={edu.cgpa}
              onChange={(e) =>
                handleChange(
                  edu.id,
                  "cgpa",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <textarea
              rows={4}
              placeholder="Description"
              value={edu.description}
              onChange={(e) =>
                handleChange(
                  edu.id,
                  "description",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3 resize-none"
            />

          </div>

        </div>

      ))}

      <button
        onClick={addEducation}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Education
      </button>

    </SectionCard>
  );
}