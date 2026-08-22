"use client";

import PersonalInfoForm from "./PersonalInfoForm";
import SummaryForm from "./SummaryForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import ProjectsForm from "./ProjectsForm";
import SkillsForm from "./SkillsForm";
import CertificationsForm from "./CertificationsForm";
import LanguagesForm from "./LanguagesForm";
import AchievementsForm from "./AchievementsForm";
import InterestsForm from "./InterestsForm";

export default function ResumeForm() {
  return (
    <div className="space-y-6">
      <PersonalInfoForm />
      <SummaryForm />
      <EducationForm />
      <ExperienceForm />
      <ProjectsForm />
      <SkillsForm />
      <CertificationsForm />
      <LanguagesForm />
      <AchievementsForm />
      <InterestsForm />
    </div>
  );
}