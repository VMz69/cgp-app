import { Button } from "@/components/Button";
import { useExpenses } from "@/hooks/useExpenses";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { expenses } = useExpenses();

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const currentMonth = new Date().toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const recentExpenses = expenses.slice(0, 5);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>Resumen - {currentMonth}</Text>
      </View>

      {/* Total Expenses Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total del mes</Text>
        <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{expenses.length}</Text>
          <Text style={styles.statLabel}>Transacciones</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>
            ${(totalExpenses / (expenses.length || 1)).toFixed(2)}
          </Text>
          <Text style={styles.statLabel}>Promedio</Text>
        </View>
      </View>

      {/* Recent Expenses */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastos Recientes</Text>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense) => (
            <View key={expense.id} style={styles.expenseRow}>
              <View>
                <Text style={styles.expenseDesc}>{expense.description}</Text>
                <Text style={styles.expenseCategory}>{expense.category}</Text>
              </View>
              <Text style={styles.expenseAmount}>
                ${expense.amount.toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Sin gastos registrados</Text>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Link href="/(tabs)/add" asChild>
          <Button title="Agregar Gasto" onPress={() => {}} />
        </Link>
        <Link href="/(tabs)/expenses" asChild>
          <Button
            title="Ver Historial"
            variant="secondary"
            onPress={() => {}}
          />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 12,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.8,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3498db",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  section: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  expenseDesc: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  expenseCategory: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e74c3c",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    paddingVertical: 20,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
  },
});
