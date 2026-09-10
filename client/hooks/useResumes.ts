import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getResumes } from "@/services/resume.service";

export const useResumes = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setEnabled(true);
  }, []);

  return useQuery({
    queryKey: ["resumes"],
    queryFn: getResumes,
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
