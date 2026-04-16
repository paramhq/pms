import type { Project } from "@/types/project";

export const MOCK_PROJECTS: Project[] = [
  {
    id: "prj_001",
    name: "PMS",
    key: "PMS",
    description: "Project Management System — the app you're looking at right now. Built with React 19, MUI v9, and a Toggl-inspired purple theme.",
    color: "#7e22ce",
    memberIds: ["usr_001", "usr_002", "usr_003", "usr_004", "usr_005"],
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-04-16T10:00:00Z",
  },
  {
    id: "prj_002",
    name: "Mobile App",
    key: "MOB",
    description: "Cross-platform mobile app for iOS and Android. React Native + Expo.",
    color: "#10b981",
    memberIds: ["usr_001", "usr_003", "usr_004"],
    createdAt: "2026-03-15T10:00:00Z",
    updatedAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "prj_003",
    name: "Design System",
    key: "DSN",
    description: "Shared component library and design tokens. Figma + Storybook.",
    color: "#f59e0b",
    memberIds: ["usr_001", "usr_003"],
    createdAt: "2026-03-20T10:00:00Z",
    updatedAt: "2026-04-08T10:00:00Z",
  },
];

export const INITIAL_PROJECT_COUNTER = 3;
