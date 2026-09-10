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
<<<<<<< HEAD
  const isFirstRender = useRef(true);
  const isSavingRef = useRef(false);
  const onSaveRef = useRef(onSave);
  const lastSavedDataRef = useRef<string>("");
=======
  const firstRender = useRef(true);
  const onSaveRef = useRef(onSave);
  const savingRef = useRef(false);
>>>>>>> origin/main

  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
<<<<<<< HEAD
  const [saveError, setSaveError] = useState(false);

  // Keep onSave ref current without triggering effects
=======

  // Keep onSave ref current without adding it to effect deps
>>>>>>> origin/main
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

<<<<<<< HEAD
    // Skip the very first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      lastSavedDataRef.current = serialized;
      return;
    }

    // Skip if data hasn't actually changed
    if (serialized === lastSavedDataRef.current) return;
=======
    if (!enabled) return;
>>>>>>> origin/main

    setHasUnsavedChanges(true);
    setSaveError(false);

    const timer = setTimeout(async () => {
<<<<<<< HEAD
      // Prevent overlapping saves
      if (isSavingRef.current) return;

      isSavingRef.current = true;
=======
      if (savingRef.current) return;
      savingRef.current = true;
>>>>>>> origin/main
      setIsSaving(true);

      try {
        await onSaveRef.current(data);
<<<<<<< HEAD
        lastSavedDataRef.current = serialized;
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
        setSaveError(false);
      } catch {
        setSaveError(true);
=======
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      } catch {
        // save failed — keep unsaved state so user knows
>>>>>>> origin/main
      } finally {
        isSavingRef.current = false;
        setIsSaving(false);
        savingRef.current = false;
      }
    }, delay);

    return () => clearTimeout(timer);
<<<<<<< HEAD
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
=======
  }, [data, delay, enabled]); // onSave intentionally excluded — using ref

  return { isSaving, hasUnsavedChanges, lastSaved };
>>>>>>> origin/main
}
