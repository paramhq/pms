import { useState, useCallback } from "react";
import type { Label } from "@/types/label";

export function useLabelState(initial: Label[]) {
  const [labels, setLabels] = useState<Label[]>(initial);

  const createLabel = useCallback((data: { name: string; color: string }): Label => {
    const label: Label = { id: crypto.randomUUID(), name: data.name.trim(), color: data.color };
    setLabels((prev) => [...prev, label]);
    return label;
  }, []);

  const updateLabel = useCallback((id: string, updates: Partial<Label>) => {
    setLabels((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  }, []);

  const deleteLabel = useCallback((id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return { labels, createLabel, updateLabel, deleteLabel };
}
