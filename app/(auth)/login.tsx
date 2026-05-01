// app/(auth)/login.tsx

import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useGoogleAuth } from "../../lib/googleAuth";

export default function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, promptAsync } = useGoogleAuth();

  const handleLogin = async () => {
    try {
      if (!email.trim()) {
        return Alert.alert("Error", "El email es obligatorio");
      }

      if (!password.trim()) {
        return Alert.alert("Error", "La contraseña es obligatoria");
      }

      await login(email, password);
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Login con Google" onPress={() => promptAsync()} />

      <Link href="/register">Ir a registro</Link>
    </View>
  );
}
