import { ExpenseItem } from "@/components/ExpenseItem";
import { useExpenses } from "@/hooks/useExpenses";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function ExpensesScreen() {
  const { expenses, loading } = useExpenses();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando gastos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Gastos</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});
