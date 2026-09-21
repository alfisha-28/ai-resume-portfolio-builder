"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewProjects() {
  const { resumeData } = useResume();

  const validProjects = resumeData.projects.filter(
    (project) => project.title?.trim()
  );

  if (!validProjects.length) return null;

  return (
    <>
      <SectionTitle title="Projects" />

      <div className="space-y-6">
        {validProjects.map((project) => (
          <div
            key={project.id}
            className="border-l-2 border-blue-600 pl-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-base font-semibold text-gray-900">
                {project.title}
              </h3>

              <div className="flex gap-3 text-sm">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    Live
                  </a>
                )}
              </div>
            </div>

            {project.technologies && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies
                  .split(",")
                  .map((tech) => tech.trim())
                  .filter(Boolean)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            )}

            {project.description && (
              <p className="mt-2 text-sm text-gray-600 leading-6">
                {project.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}