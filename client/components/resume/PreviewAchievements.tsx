"use client";

import { useResume } from "@/context/ResumeContext";
import SectionTitle from "./SectionTitle";

export default function PreviewAchievements() {
  const { resumeData } = useResume();

  const validAchievements = resumeData.achievements.filter(
    (achievement) => achievement.title?.trim() || achievement.description?.trim()
  );

  if (!validAchievements.length) return null;

  return (
    <>
      <SectionTitle title="Achievements" />

      <div className="space-y-4">
        {validAchievements.map((achievement) => (
          <div key={achievement.id}>
            <h3 className="font-semibold">
              {achievement.title}
            </h3>

            <p className="text-sm text-gray-600">
              {achievement.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}