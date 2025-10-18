import type { Auth } from "@/types/Auth";
import { createContext, useContext } from "react";

export const AuthContext = createContext<Auth | undefined>(undefined);

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return auth;
}
