import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";

export default function Home() {
  const { total, monthlyTotal, loadExpenses } = useExpenses();
  const { logout } = useAuth();
  const router = useRouter();

  // Fernando — recargar los totales al recibir foco (tras agregar o editar un gasto)
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
      <Text style={styles.title}>Resumen</Text>

      {/* Fernando — card total del mes actual */}
      <View style={[styles.card, styles.cardGreen]}>
        <Text style={styles.cardLabel}>Total del mes</Text>
        <Text style={styles.cardAmountLarge}>${monthlyTotal.toFixed(2)}</Text>
      </View>

      {/* Fernando — card total general de todos los gastos */}
      <View style={[styles.card, styles.cardBlue]}>
        <Text style={styles.cardLabel}>Total general</Text>
        <Text style={styles.cardAmountMedium}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { padding: 20, borderRadius: 10, marginBottom: 15 },
  cardGreen: { backgroundColor: "#4CAF50" },
  cardBlue: { backgroundColor: "#2196F3" },
  cardLabel: { color: "white", fontSize: 16 },
  cardAmountLarge: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  cardAmountMedium: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  logoutContainer: { marginTop: "auto" as any },
});
