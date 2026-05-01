import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [user, setUser] = useState<any>(null);

  /**
   * ❗ SIN PROXY (esto es lo que rompe tu caso actual)
   */
  const redirectUri = AuthSession.makeRedirectUri();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "609110420341-60joj8652u8v3k5s3uv44tnlu06ros5q.apps.googleusercontent.com",

    redirectUri,
  });

  useEffect(() => {
    const login = async () => {
      if (response?.type === "success") {
        const token = response.authentication?.accessToken;

        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userInfo = await res.json();
        setUser(userInfo);
      }
    };

    login();
  }, [response]);

  return {
    user,
    promptAsync,
  };
};
