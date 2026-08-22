import { useMemo } from "react";
import { useResume } from "@/context/ResumeContext";
import { calculateResumeCompletion } from "@/utils/resumeCompletion";

export default function useResumeCompletion() {
  const { resumeData } = useResume();

  return useMemo(
    () => calculateResumeCompletion(resumeData),
    [resumeData]
  );
}