import * as AuthService from "@/lib/auth";
import { useState } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await AuthService.login(email, password);
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error de login";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await AuthService.register(email, password, name);
      setUser(userData);
      return userData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error de registro";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error de logout";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
