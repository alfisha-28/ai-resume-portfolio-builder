"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ResumeData } from "@/types/resume";

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  loadResume: (resume: ResumeData) => void;
  updateField: <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const initialResume: ResumeData = {
  title: "",
  template: "classic",
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  github: "",
  portfolio: "",
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  achievements: [],
  interests: [],
};

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  const loadResume = useCallback((resume: ResumeData) => {
    setResumeData(resume);
  }, []);

  const updateField = useCallback(<K extends keyof ResumeData>(
    field: K,
    value: ResumeData[K]
  ) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  }, []);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData, loadResume, updateField }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used inside ResumeProvider");
  }
  return context;
}
