import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as AuthService from "../lib/auth";
import { auth } from "../lib/firebase";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: typeof AuthService.login;
  register: typeof AuthService.register;
  logout: typeof AuthService.logout;
  signInWithGoogle: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "609110420341-60joj8652u8v3k5s3uv44tnlu06ros5q.apps.googleusercontent.com",

    // 🔥 ESTO ES LA CLAVE
    scopes: ["openid", "profile", "email"],
    responseType: "id_token",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("🔥 FIREBASE USER:", user);
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleGoogle = async () => {
      console.log("GOOGLE RESPONSE:", response);

      if (response?.type === "success") {
        const idToken = response.params?.id_token;

        console.log("ID TOKEN:", idToken);

        if (!idToken) {
          console.log("❌ NO ID TOKEN");
          return;
        }

        await AuthService.loginWithGoogle(idToken);
      }
    };

    handleGoogle();
  }, [response]);

  const signInWithGoogle = async () => {
    if (!request) {
      console.log("❌ REQUEST NOT READY");
      return;
    }

    console.log("🚀 OPEN GOOGLE");
    await promptAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: AuthService.login,
        register: AuthService.register,
        logout: AuthService.logout,
        signInWithGoogle,
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
