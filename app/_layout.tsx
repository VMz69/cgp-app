// app/_layout.tsx

import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { user, loading } = useAuth();

  // 🔹 Mientras carga estado de auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 🔹 Si NO hay usuario → auth */}
      {!user ? (
        <Stack.Screen name="(auth)" />
      ) : (
        // 🔹 Si hay usuario → app
        <Stack.Screen name="(tabs)" />
      )}
      console.log(user);
    </Stack>
  );
}
