import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
  const { isSignedIn, isLoaded, getToken } = useClerkAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  // Auto-print token and send to backend when user signs in
  useEffect(() => {
    async function handleAuthentication() {
      if (isSignedIn && isLoaded && getToken) {
        try {
          // Fetch the Clerk token
          const token = await getToken();

          if (token) {
            // Print to console with formatting
            console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("🔑 CLERK JWT TOKEN (Auto-generated)");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log(token);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("📋 Authorization Header:");
            console.log(`Bearer ${token}`);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("👤 User ID:", user?.id);
            console.log("📧 Email:", user?.primaryEmailAddress?.emailAddress);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

            // Send token to backend to verify authentication
            try {
              console.log("🚀 Sending token to backend for verification...");

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

              const response = await fetch(
                `${API_URL}/api/auth/verify`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: user?.id,
                    email: user?.primaryEmailAddress?.emailAddress,
                  }),
                }
              );

              if (response.ok) {
                const data = await response.json();
                console.log("✅ Backend verification successful:", data);
              } else {
                console.warn(
                  "⚠️ Backend verification failed:",
                  response.status
                );
              }
            } catch (backendError) {
              console.log(
                "⚠️ Backend not reachable (this is okay during development):",
                backendError
              );
            }
          }
        } catch (error) {
          console.error("❌ Error getting/sending token:", error);
        }
      }
    }

    handleAuthentication();
  }, [isSignedIn, isLoaded, getToken, user]);

  const logout = useCallback(async () => {
    console.log("🚪 User logged out");
    navigate("/login");
  }, [navigate]);

  // Export getToken so other components can use it
  const getAuthToken = useCallback(async () => {
    if (!isSignedIn) {
      console.warn("⚠️ User not signed in, cannot get token");
      return null;
    }
    return await getToken();
  }, [isSignedIn, getToken]);

  return {
    isAuthenticated: isSignedIn ?? false,
    isLoading: !isLoaded,
    user: user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || "",
          name: user.fullName || user.username || "User",
          createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
        }
      : null,
    logout,
    getToken: getAuthToken, // Expose getToken for manual use
  };
};
