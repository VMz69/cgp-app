import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "../lib/auth";
import { auth } from "../lib/firebase";
import { useGoogleAuth } from "../lib/googleAuth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: typeof AuthService.login;
  register: typeof AuthService.register;
  logout: typeof AuthService.logout;
  loginWithGoogle: typeof AuthService.loginWithGoogle;
  signInWithGoogle: () => Promise<void>;
  googleAuthLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { promptAsync } = useGoogleAuth();
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setGoogleAuthLoading(true);
      const result = await promptAsync();
      if (result?.type === "success") {
        const idToken = result.authentication?.idToken;
        if (idToken) {
          await AuthService.loginWithGoogle(idToken);
        }
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setGoogleAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: AuthService.login,
        register: AuthService.register,
        logout: AuthService.logout,
        loginWithGoogle: AuthService.loginWithGoogle,
        signInWithGoogle,
        googleAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
