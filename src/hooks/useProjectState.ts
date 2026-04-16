import { useState, useCallback, useRef, useEffect } from "react";
import type { Project } from "@/types/project";
import type { CreateProjectFormData } from "@/lib/validations/project";

export function useProjectState(initialProjects: Project[], initialCounter: number) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isLoading, setIsLoading] = useState(true);
  const counterRef = useRef(initialCounter);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const createProject = useCallback((data: CreateProjectFormData): Project => {
    counterRef.current += 1;
    const now = new Date().toISOString();
    const project: Project = {
      id: crypto.randomUUID(),
      name: data.name,
      key: data.key,
      description: data.description,
      color: data.color,
      memberIds: ["usr_001"],
      createdAt: now,
      updatedAt: now,
    };
    setProjects((prev) => [project, ...prev]);
    return project;
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, isLoading, createProject, deleteProject };
}
