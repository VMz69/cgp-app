import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";

export default function Home() {
  const { total, monthlyTotal } = useExpenses();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 🔥 Título */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Resumen
      </Text>

      {/* 🔥 Card: Total mensual (IMPORTANTE) */}
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "#4CAF50",
          marginBottom: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Total del mes</Text>

        <Text
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          ${monthlyTotal}
        </Text>
      </View>

      {/* 🔹 Card: Total general */}
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: "#2196F3",
          marginBottom: 30,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Total general</Text>

        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          ${total}
        </Text>
      </View>

      {/* 🔥 Botón logout separado */}
      <View style={{ marginTop: "auto" }}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
}
