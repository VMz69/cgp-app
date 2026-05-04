import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";

export default function Home() {
  const { total, monthlyTotal, loadExpenses } = useExpenses();
  const { logout } = useAuth();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, []),
  );

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.smallLogo}
        />
        <Text style={styles.title}>Resumen</Text>
      </View>

      {/* Total del mes */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total del mes</Text>
        <Text style={styles.amountLarge}>${monthlyTotal.toFixed(2)}</Text>
      </View>

      {/* Total general */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total general</Text>
        <Text style={styles.amountMedium}>${total.toFixed(2)}</Text>
      </View>

      {/* Logout */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  smallLogo: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  amountLarge: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },
  amountMedium: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
