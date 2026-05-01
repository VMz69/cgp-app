import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  EXPENSE_CATEGORIES,
  getCategoryIcon,
  getCategoryLabel,
} from "../../constants/categories";
import { useExpenses } from "../../hooks/useExpenses";
import { setEditId } from "../../lib/editStore";
import type { Expense } from "../../lib/expenses";

type SortOption = "date" | "amount";

export default function Expenses() {
  const { expenses, loadExpenses, deleteExpense } = useExpenses();
  const router = useRouter();

  // Fernando — estado de filtros y ordenamiento
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterMonth, setFilterMonth] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  // Fernando — recargar la lista al recibir foco (al volver de add o edición)
  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, []),
  );

  // Fernando — meses disponibles derivados de los gastos, usando partes de fecha locales
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    expenses.forEach((expense) => {
      const [year, month] = expense.date.split("T")[0].split("-");
      months.add(`${year}-${month}`);
    });
    return Array.from(months).sort().reverse();
  }, [expenses]);

  // Fernando — filtrado por categoría y mes, luego ordenamiento combinados
  const filteredExpenses = useMemo(() => {
    let result = [...expenses];

    if (filterCategory !== "all") {
      result = result.filter((e) => e.category === filterCategory);
    }

    if (filterMonth !== "all") {
      result = result.filter((e) => {
        const [year, month] = e.date.split("T")[0].split("-");
        return `${year}-${month}` === filterMonth;
      });
    }

    if (sortBy === "date") {
      result.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else {
      result.sort((a, b) => b.amount - a.amount);
    }

    return result;
  }, [expenses, filterCategory, filterMonth, sortBy]);

  // Fernando — confirmación y eliminación de un gasto con refresco de lista
  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar gasto",
      "¿Estás seguro de que deseas eliminar este gasto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteExpense(id);
              await loadExpenses();
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  };

  // Fernando — guardar el ID en editStore y navegar al formulario sin params en URL
  const handleEdit = (id: string) => {
    setEditId(id);
    router.push("/(tabs)/add");
  };

  // Fernando — render de cada ítem con botones de editar y eliminar
  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>
          {getCategoryIcon(item.category)} {item.name}
        </Text>
        <Text style={styles.itemCategory}>
          {getCategoryLabel(item.category)}
        </Text>
        <Text style={styles.itemDate}>
          {(() => {
            const [y, m, d] = item.date.split("T")[0].split("-").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("es-ES");
          })()}
        </Text>
      </View>

      <View style={styles.itemRight}>
        <Text style={styles.itemAmount}>${item.amount.toFixed(2)}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleEdit(item.id)}
          >
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => handleDelete(item.id)}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Gastos</Text>

      {/* Filtro por categoría */}
      <Text style={styles.filterLabel}>Categoría</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={filterCategory}
          onValueChange={(value) => setFilterCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Todas las categorías" value="all" />
          {EXPENSE_CATEGORIES.map((cat) => (
            <Picker.Item
              key={cat.id}
              label={`${cat.icon} ${cat.label}`}
              value={cat.id}
            />
          ))}
        </Picker>
      </View>

      {/* Filtro por mes */}
      <Text style={styles.filterLabel}>Mes</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={filterMonth}
          onValueChange={(value) => setFilterMonth(value)}
          style={styles.picker}
        >
          <Picker.Item label="Todos los meses" value="all" />
          {availableMonths.map((month) => {
            const [year, m] = month.split("-");
            const label = new Date(
              parseInt(year),
              parseInt(m) - 1,
            ).toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            });
            return <Picker.Item key={month} label={label} value={month} />;
          })}
        </Picker>
      </View>

      {/* Fernando — selector de ordenamiento */}
      <Text style={styles.filterLabel}>Ordenar por</Text>
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[styles.chip, sortBy === "date" && styles.chipActive]}
          onPress={() => setSortBy("date")}
        >
          <Text
            style={[
              styles.chipText,
              sortBy === "date" && styles.chipTextActive,
            ]}
          >
            Más recientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, sortBy === "amount" && styles.chipActive]}
          onPress={() => setSortBy("amount")}
        >
          <Text
            style={[
              styles.chipText,
              sortBy === "amount" && styles.chipTextActive,
            ]}
          >
            Mayor monto
          </Text>
        </TouchableOpacity>
      </View>

      {/* Fernando — lista filtrada y ordenada con mensaje cuando este vacía */}
      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>
              No hay gastos con los filtros seleccionados
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  picker: { height: 48 },
  sortRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    marginRight: 6,
  },
  chipActive: { backgroundColor: "#3498db", borderColor: "#3498db" },
  chipText: { fontSize: 13, color: "#444" },
  chipTextActive: { color: "#fff" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemInfo: { flex: 1, paddingRight: 8 },
  itemName: { fontSize: 15, fontWeight: "500", color: "#222" },
  itemCategory: { fontSize: 12, color: "#777", marginTop: 2 },
  itemDate: { fontSize: 11, color: "#aaa", marginTop: 2 },
  itemRight: { alignItems: "flex-end" },
  itemAmount: { fontSize: 16, fontWeight: "bold", color: "#e74c3c" },
  actions: { flexDirection: "row", marginTop: 6, gap: 10 },
  actionBtn: { padding: 4 },
  actionIcon: { fontSize: 18 },
  emptyContainer: { alignItems: "center", marginTop: 48 },
  emptyIcon: { fontSize: 42, marginBottom: 10 },
  emptyText: { color: "#999", fontSize: 14, textAlign: "center" },
});
