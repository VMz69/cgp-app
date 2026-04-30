import { StyleSheet, Text, View } from "react-native";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.description}>{expense.description}</Text>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.date}>{expense.date}</Text>
      </View>
      <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 8,
  },
  left: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
    marginLeft: 12,
  },
});
