import { useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import configuration from "../configuration/EnvConfig";

export interface AuthInfo {
  id: number;
  username: string;
  email: string;
  role: string;
  picture: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authentication, setAuthentication] = useState<AuthInfo | false>(false);
  const [loading, setLoading] = useState(true); // Add loading state

  const checkAuth = async () => {
    if (authentication) {
      return;
    }

    try {
      const response = await fetch(`${configuration.BACKEND_URL}/auth/status`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Not authenticated");
      }

      const authenticatedInfo = (await response.json()) as AuthInfo;
      setAuthentication(authenticatedInfo);
    } catch (error) {
      console.error("Error checking authentication status:", error);
      setAuthentication(false);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authentication, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
