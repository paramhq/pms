import { useState, useCallback, useRef, useEffect } from "react";
import type { Issue } from "@/types/issue";
import type { CreateIssueFormData } from "@/lib/validations/issue";

export function useIssueState(initialIssues: Issue[], initialCounter: number) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [isLoading, setIsLoading] = useState(true);
  const counterRef = useRef(initialCounter);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const createIssue = useCallback((data: CreateIssueFormData): Issue => {
    counterRef.current += 1;
    const now = new Date().toISOString();
    const issue: Issue = {
      id: crypto.randomUUID(),
      number: counterRef.current,
      key: `PMS-${counterRef.current}`,
      title: data.title,
      description: data.description ?? "",
      status: data.status,
      priority: data.priority,
      type: data.type,
      assigneeId: data.assigneeId || null,
      reporterId: "usr_001",
      storyPoints: data.storyPoints ? Number(data.storyPoints) : null,
      dueDate: null,
      labels: data.labels
        ? data.labels
            .split(",")
            .map((l) => l.trim())
            .filter(Boolean)
        : [],
      createdAt: now,
      updatedAt: now,
    };
    setIssues((prev) => [issue, ...prev]);
    return issue;
  }, []);

  const updateIssue = useCallback((id: string, updates: Partial<Issue>) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
          : issue,
      ),
    );
  }, []);

  const deleteIssue = useCallback((id: string) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  }, []);

  return { issues, isLoading, createIssue, updateIssue, deleteIssue };
}
