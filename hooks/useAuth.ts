// hooks/useAuth.ts

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import * as AuthService from "../lib/auth";
import { auth } from "../lib/firebase";

/**
 * Hook de autenticación global
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Detectar usuario logueado automáticamente
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return {
    user,
    loading,
    login: AuthService.login,
    register: AuthService.register,
    logout: AuthService.logout,
  };
};
