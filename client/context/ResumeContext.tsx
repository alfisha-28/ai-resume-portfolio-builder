"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ResumeData } from "@/types/resume";
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

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  loadResume: (resume: ResumeData) => void;
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  isDirty: boolean;
  setIsDirty: (dirty: boolean) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [resumeData, setResumeDataState] = useState<ResumeData>(initialResume);
  const [isDirty, setIsDirty] = useState(false);

  const loadResume = useCallback((resume: ResumeData) => {
    setResumeDataState(resume);
    setIsDirty(false);
  }, []);

  const setResumeData: React.Dispatch<React.SetStateAction<ResumeData>> = useCallback(
    (action) => {
      setResumeDataState((prev) => {
        const next = typeof action === "function" ? action(prev) : action;
        return next;
      });
      setIsDirty(true);
    },
    []
  );

  const updateField = useCallback(
    <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
      setResumeDataState((prev) => ({ ...prev, [key]: value }));
      setIsDirty(true);
    },
    []
  );

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        loadResume,
        updateField,
        isDirty,
        setIsDirty,
      }}
    >
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
