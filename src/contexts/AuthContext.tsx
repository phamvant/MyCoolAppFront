import { createContext } from "react";
import { AuthInfo } from "../providers/AuthProvider";

interface AuthContextType {
  authentication: AuthInfo | false;
  checkAuth: () => Promise<void>;
  loading: boolean; // Add loading to the context type
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
