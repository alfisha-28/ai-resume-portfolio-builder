"use client";

import SectionCard from "./SectionCard";
import { useResume } from "@/context/ResumeContext";

export default function AchievementsForm() {
  const { resumeData, setResumeData } = useResume();

  const addAchievement = () => {
    setResumeData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        { id: Date.now().toString(), title: "", description: "" },
      ],
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, [field]: value } : a
      ),
    }));
  };

  return (
    <SectionCard title="Achievements">
      {resumeData.achievements.map((achievement, index) => (
        <div key={achievement.id} className="border rounded-xl p-5 mb-4 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Achievement {index + 1}</h3>
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
          <div className="space-y-4">
            <input
              placeholder="Achievement Title"
              value={achievement.title}
              onChange={(e) => handleChange(achievement.id, "title", e.target.value)}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows={3}
              placeholder="Brief description..."
              value={achievement.description}
              onChange={(e) => handleChange(achievement.id, "description", e.target.value)}
              className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}

      <button
        onClick={addAchievement}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
      >
        + Add Achievement
      </button>
    </SectionCard>
  );
}
