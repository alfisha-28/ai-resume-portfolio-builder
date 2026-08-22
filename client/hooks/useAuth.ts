import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/services/auth.service";

export const useAuth = () => {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setEnabled(true);
    setMounted(true);
  }, []);

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return { ...query, isLoading: !mounted || query.isLoading };
};