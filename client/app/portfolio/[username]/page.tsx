import { notFound } from "next/navigation";
import type { Resume } from "@/types/resume";

interface Props {
  params: Promise<{ username: string }>;
}

// Placeholder until portfolio API is built — returns null so notFound() fires
async function fetchPortfolioData(_username: string): Promise<Resume | null> {
  return null;
}

export default async function PortfolioPage({ params }: Props) {
  const { username } = await params;
  const resume = await fetchPortfolioData(username);

  if (!resume) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold">{resume.fullName}</h1>
        <p className="text-xl text-blue-600 mt-2">{resume.jobTitle}</p>

        {resume.summary && (
          <p className="mt-6 text-gray-600 leading-relaxed">{resume.summary}</p>
        )}

        {resume.skills.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s) => (
                <span key={s.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                  {s.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {resume.experience.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Experience</h2>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-600 pl-4">
                  <h3 className="font-semibold">{exp.jobTitle}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-400">
                    {exp.startDate} — {exp.currentlyWorking ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.projects.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="space-y-6">
              {resume.projects.map((project) => (
                <div key={project.id} className="border rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">{project.title}</h3>
                    <div className="flex gap-3 text-sm">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="mt-2 text-sm text-gray-600">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 pt-8 border-t text-center text-sm text-gray-400">
          Built with ResumeAI
        </div>
      </div>
    </main>
  );
}
