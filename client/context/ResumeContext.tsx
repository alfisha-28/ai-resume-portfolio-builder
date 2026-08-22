"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import { ResumeData } from "@/types/resume";


const ResumeContext = createContext<
  ResumeContextType | undefined
>(undefined);

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
  achievements:[],
  interests: [],
};

export function ResumeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [resumeData, setResumeData] =
    useState<ResumeData>(initialResume);

  const loadResume = (resume: ResumeData) => {
    setResumeData(resume);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        loadResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
export function useResume() {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error(
      "useResume must be used inside ResumeProvider"
    );
  }

  return context;
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  loadResume: (resume: ResumeData) => void;
}

