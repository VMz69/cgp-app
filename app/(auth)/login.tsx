import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen() {
  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email.trim()) {
        return Alert.alert("Error", "El email es obligatorio");
      }

      if (!password.trim()) {
        return Alert.alert("Error", "La contraseña es obligatoria");
      }

      await login(email, password);

      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F9FAFB",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Logo perron */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          width: 150,
          height: 150,
          alignSelf: "center",
          marginBottom: 16,
        }}
        resizeMode="contain"
      />

      {/* Título */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "600",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Iniciar sesión
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          backgroundColor: "#FFFFFF",
          padding: 14,
          borderRadius: 10,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      />

      {/* Password */}
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          backgroundColor: "#FFFFFF",
          padding: 14,
          borderRadius: 10,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      />

      {/* Botón Login */}
      <Pressable
        onPress={handleLogin}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
          Entrar
        </Text>
      </Pressable>

      {/* Botón Google */}
      <Pressable
        onPress={signInWithGoogle}
        style={{
          backgroundColor: "#FFFFFF",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "500" }}>Entrar con Google</Text>
      </Pressable>

      {/* Link a registro */}
      <Link
        href="/(auth)/register"
        style={{ textAlign: "center", color: "#2563EB" }}
      >
        ¿No tienes cuenta? Regístrate
      </Link>
    </View>
  );
}
