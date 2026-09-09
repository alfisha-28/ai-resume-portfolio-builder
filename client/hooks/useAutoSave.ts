"use client";

import { useEffect, useRef, useState } from "react";

interface AutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 2000,
  enabled = true,
}: AutoSaveOptions<T>) {
  const firstRender = useRef(true);
  const onSaveRef = useRef(onSave);
  const savingRef = useRef(false);

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Keep onSave ref current without adding it to effect deps
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!enabled) return;

    setHasUnsavedChanges(true);

    const timer = setTimeout(async () => {
      if (savingRef.current) return;
      savingRef.current = true;
      setIsSaving(true);

      try {
        await onSaveRef.current(data);
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } catch {
        // save failed — keep unsaved state so user knows
      } finally {
        setIsSaving(false);
        savingRef.current = false;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [data, delay, enabled]); // onSave intentionally excluded — using ref

  return { isSaving, hasUnsavedChanges, lastSaved };
}
