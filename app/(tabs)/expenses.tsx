import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
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
    }, [])
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
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
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
      ]
    );
  };

  // Fernando — guardar el ID en editStore y navegar al formulario sin params en URL
  const handleEdit = (id: string) => {
    setEditId(id);
    router.push("/(tabs)/add");
  };

  // Fernando — render de cada ítem con botones de editar y eliminar
  const renderItem = ({ item }: { item: Expense }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.itemName}>
          {getCategoryIcon(item.category)} {item.name}
        </Text>
        <Text style={styles.itemCategory}>
          {getCategoryLabel(item.category)}
        </Text>
        <Text style={styles.itemDate}>
          {(() => {
            const [y, m, d] = item.date
              .split("T")[0]
              .split("-")
              .map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("es-ES");
          })()}
        </Text>
      </View>

      <View style={styles.cardRight}>
        <Text style={styles.itemAmount}>
          ${item.amount.toFixed(2)}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleEdit(item.id)}>
            <Text style={styles.actionIcon}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <Text style={styles.title}>Mis gastos</Text>
      </View>

      {/* Filtro por categoría */}
      <Text style={styles.filterLabel}>Categoría</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filterCategory}
          onValueChange={(value) => setFilterCategory(value)}
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
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={filterMonth}
          onValueChange={(value) => setFilterMonth(value)}
        >
          <Picker.Item label="Todos los meses" value="all" />
          {availableMonths.map((month) => {
            const [year, m] = month.split("-");
            const label = new Date(
              parseInt(year),
              parseInt(m) - 1
            ).toLocaleDateString("es-ES", {
              month: "long",
              year: "numeric",
            });
            return (
              <Picker.Item key={month} label={label} value={month} />
            );
          })}
        </Picker>
      </View>

      {/* Fernando — selector de ordenamiento */}
      <Text style={styles.filterLabel}>Ordenar por</Text>
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[
            styles.chip,
            sortBy === "date" && styles.chipActive,
          ]}
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
          style={[
            styles.chip,
            sortBy === "amount" && styles.chipActive,
          ]}
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

      {/* Fernando — lista filtrada y ordenada con mensaje cuando está vacía */}
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 6,
    opacity: 0.9,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#111827",
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },
  sortRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  chipActive: {
    backgroundColor: "#2563EB",
  },
  chipText: {
    fontSize: 13,
    color: "#374151",
    fontWeight: "500",
  },
  chipTextActive: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardLeft: {
    flex: 1,
    paddingRight: 8,
  },
  cardRight: {
    alignItems: "flex-end",
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
  itemCategory: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  itemDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  actionIcon: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 48,
  },
  emptyIcon: {
    fontSize: 42,
    marginBottom: 8,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
  },
});