import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";
import type { ReactNode } from "react";

export function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
