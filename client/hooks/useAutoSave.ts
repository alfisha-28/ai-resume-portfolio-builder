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
  const isFirstRender = useRef(true);
  const isSavingRef = useRef(false);
  const onSaveRef = useRef(onSave);
  const lastSavedDataRef = useRef<string>("");

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState(false);

  // Keep onSave ref current without triggering effects
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  useEffect(() => {
    const serialized = JSON.stringify(data);

    // Skip if auto-save is not enabled yet (e.g. still fetching from server)
    if (!enabled) {
      lastSavedDataRef.current = serialized;
      return;
    }

    // Skip the very first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastSavedDataRef.current = serialized;
      return;
    }

    // Skip if data hasn't actually changed
    if (serialized === lastSavedDataRef.current) return;

    setHasUnsavedChanges(true);
    setSaveError(false);

    const timer = setTimeout(async () => {
      // Prevent overlapping saves
      if (isSavingRef.current) return;

      isSavingRef.current = true;
      setIsSaving(true);

      try {
        await onSaveRef.current(data);
        lastSavedDataRef.current = serialized;
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        setSaveError(false);
      } catch {
        setSaveError(true);
      } finally {
        isSavingRef.current = false;
        setIsSaving(false);
      }
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, delay, enabled]);

  const manualSave = async () => {
    if (isSavingRef.current) return;
    isSavingRef.current = true;
    setIsSaving(true);
    setSaveError(false);
    try {
      await onSaveRef.current(data);
      lastSavedDataRef.current = JSON.stringify(data);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch {
      setSaveError(true);
    } finally {
      isSavingRef.current = false;
      setIsSaving(false);
    }
  };

  return { isSaving, hasUnsavedChanges, lastSaved, saveError, manualSave };
}
