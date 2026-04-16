import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router";
import { AppLayout } from "@/layouts/AppLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";

// Public pages
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/ForgotPasswordPage"),
);

// Authed pages
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const ProjectListPage = lazy(
  () => import("@/pages/projects/ProjectListPage"),
);
const ProjectOverviewPage = lazy(
  () => import("@/pages/projects/ProjectOverviewPage"),
);
const IssueListPage = lazy(
  () => import("@/pages/projects/IssueListPage"),
);
const IssueDetailPage = lazy(
  () => import("@/pages/projects/IssueDetailPage"),
);
const BacklogPage = lazy(() => import("@/pages/projects/BacklogPage"));
const ProjectSettingsPage = lazy(
  () => import("@/pages/projects/ProjectSettingsPage"),
);
const UserSettingsPage = lazy(
  () => import("@/pages/settings/UserSettingsPage"),
);
const WorkspaceSettingsPage = lazy(
  () => import("@/pages/settings/WorkspaceSettingsPage"),
);
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));

export const routes: RouteObject[] = [
  // Public routes (auth layout)
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  // Protected routes (app layout)
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/projects", element: <ProjectListPage /> },
      { path: "/projects/:key", element: <ProjectOverviewPage /> },
      { path: "/projects/:key/issues", element: <IssueListPage /> },
      { path: "/projects/:key/issues/:id", element: <IssueDetailPage /> },
      { path: "/projects/:key/backlog", element: <BacklogPage /> },
      { path: "/projects/:key/settings", element: <ProjectSettingsPage /> },
      { path: "/settings", element: <UserSettingsPage /> },
      { path: "/settings/workspace", element: <WorkspaceSettingsPage /> },
      { path: "/notifications", element: <NotificationsPage /> },
    ],
  },
  // Catch-all
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
