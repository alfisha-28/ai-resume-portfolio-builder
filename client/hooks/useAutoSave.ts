"use client";

import { useEffect, useRef, useState } from "react";

interface AutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 2000,
}: AutoSaveOptions<T>) {
  const firstRender = useRef(true);

  const [isSaving, setIsSaving] = useState(false);

  const [hasUnsavedChanges, setHasUnsavedChanges] =
    useState(false);

  const [lastSaved, setLastSaved] =
    useState<Date | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setHasUnsavedChanges(true);

    const timer = setTimeout(async () => {
      setIsSaving(true);

      try {
        await onSave(data);

        setLastSaved(new Date());

        setHasUnsavedChanges(false);
      } finally {
        setIsSaving(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay, onSave]);

  return {
    isSaving,
    hasUnsavedChanges,
    lastSaved,
  };
}