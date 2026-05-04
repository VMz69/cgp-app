import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterScreen() {
  const { register, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (!email.trim()) {
        return Alert.alert("Error", "El email es obligatorio");
      }

      if (!password.trim()) {
        return Alert.alert("Error", "La contraseña es obligatoria");
      }

      if (password.length < 6) {
        return Alert.alert("Error", "Mínimo 6 caracteres");
      }

      await register(email, password);
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
      {/* Logo */}
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
        Crear cuenta
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
        placeholder="Contraseña (mín. 6 caracteres)"
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

      {/* Botón Registrar */}
      <Pressable
        onPress={handleRegister}
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 16 }}>
          Registrarme
        </Text>
      </Pressable>

      {/* Link a login */}
      <Link
        href="/(auth)/login"
        style={{ textAlign: "center", color: "#2563EB" }}
      >
        ¿Ya tienes cuenta? Inicia sesión
      </Link>
    </View>
  );
}
