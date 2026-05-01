import { Button, FlatList, Text, View } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";

// 🔹 helpers de categorías (los que ya creaste)
import { getCategoryIcon, getCategoryLabel } from "../../constants/categories";

export default function Expenses() {
  const { expenses, loadExpenses } = useExpenses();

  /**
   * 🔹 Render de cada item
   */
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderColor: "#ccc",
        }}
      >
        {/* 🔥 Nombre + monto */}
        <Text>
          {getCategoryIcon(item.category)} {item.name} - ${item.amount}
        </Text>

        {/* 🔹 Categoría */}
        <Text style={{ color: "gray" }}>{getCategoryLabel(item.category)}</Text>

        {/* 🔹 Fecha simple */}
        <Text style={{ fontSize: 12, color: "gray" }}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      {/* 🔹 Botón recargar */}
      <Button title="Recargar" onPress={loadExpenses} />

      {/* 🔥 Lista de gastos */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>No hay gastos registrados</Text>
        }
      />
    </View>
  );
}
