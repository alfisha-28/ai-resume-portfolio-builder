"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";
import AIProjectGenerator from "@/components/ai/AIProjectGenerator";

export default function ProjectsForm() {
  const { resumeData, setResumeData } = useResume();

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          technologies: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter(
        (project) => project.id !== id
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
      projects: prev.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: value,
            }
          : project
      ),
    }));
  };

  return (
    <SectionCard title="Projects">
      {resumeData.projects.map((project, index) => (
        <div
          key={project.id}
          className="border rounded-xl p-5 mb-6 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              Project {index + 1}
            </h3>

            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600"
            >
              Remove
            </button>
          </div>

          <div className="space-y-4">

            <input
              placeholder="Project Title"
              value={project.title}
              onChange={(e) =>
                handleChange(
                  project.id,
                  "title",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-600">Description</label>
              <AIProjectGenerator
                description={project.description}
                title={project.title}
                onResult={(text) => handleChange(project.id, "description", text)}
              />
            </div>
            <textarea
              rows={4}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                handleChange(project.id, "description", e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Technologies (React, Node.js, PostgreSQL)"
              value={project.technologies}
              onChange={(e) =>
                handleChange(
                  project.id,
                  "technologies",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="GitHub URL"
              value={project.githubUrl}
              onChange={(e) =>
                handleChange(
                  project.id,
                  "githubUrl",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              placeholder="Live Demo URL"
              value={project.liveUrl}
              onChange={(e) =>
                handleChange(
                  project.id,
                  "liveUrl",
                  e.target.value
                )
              }
              className="w-full border rounded-lg p-3"
            />

          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Project
      </button>
    </SectionCard>
  );
}