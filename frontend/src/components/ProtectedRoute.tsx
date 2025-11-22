import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";  // ✅ Import from hooks
import { Loader2 } from "lucide-react";
import type { JSX } from "react";

export const ProtectedRoute = (): JSX.Element => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
