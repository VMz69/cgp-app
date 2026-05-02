import { Picker } from "@react-native-picker/picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { EXPENSE_CATEGORIES } from "../../constants/categories";
import { useExpenses } from "../../hooks/useExpenses";
import { consumeEditId } from "../../lib/editStore";
import * as ExpenseService from "../../lib/expenses";

export default function AddExpense() {
  const router = useRouter();
  const { addExpense, updateExpense } = useExpenses();

  // Fernando — detectar modo edición leyendo el editStore al recibir foco
  // Se usa un store en lugar de query params para evitar que el ID persista en el cache del tab
  const [editId, setEditId] = useState<string | null>(null);
  const isEditing = Boolean(editId);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  // Fernando — categoría vacía para forzar al usuario a seleccionar explícitamente
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Fernando — al recibir foco, consume el ID pendiente del editStore (se limpia automáticamente)
  // Si no hay ID (usuario tocó la tab o canceló) el formulario se reinicia
  useFocusEffect(
    useCallback(() => {
      const id = consumeEditId();
      setEditId(id);
      if (!id) {
        setName("");
        setAmount("");
        setCategory("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    }, []),
  );

  // Fernando — precargar los datos del gasto cuando hay un ID de edición
  useEffect(() => {
    if (!editId) return;

    const loadExpense = async () => {
      setLoadingData(true);
      try {
        const expense = await ExpenseService.getExpenseById(editId);
        if (expense) {
          setName(expense.name);
          setAmount(String(expense.amount));
          setCategory(expense.category);
          setDate(expense.date.split("T")[0]);
        }
      } catch (error: any) {
        Alert.alert("Error", "No se pudo cargar el gasto para editar");
      } finally {
        setLoadingData(false);
      }
    };

    loadExpense();
  }, [editId]);

  // Fernando — validaciones completas y guardado (modo crear o modo edición)
  const handleSave = async () => {
    if (!name.trim()) {
      return Alert.alert(
        "Campo requerido",
        "El nombre del gasto es obligatorio",
      );
    }

    if (!category) {
      return Alert.alert("Campo requerido", "Debes seleccionar una categoría");
    }

    if (!date.trim()) {
      return Alert.alert("Campo requerido", "La fecha es obligatoria");
    }
    // Fernando — validar fecha creando Date local (evita desfase UTC)
    const [y, m, d] = date.split("-").map(Number);
    const parsedDate = new Date(y, m - 1, d);
    if (
      isNaN(parsedDate.getTime()) ||
      parsedDate.getMonth() !== m - 1 ||
      String(y).length !== 4
    ) {
      return Alert.alert(
        "Fecha inválida",
        "Ingresa la fecha en formato AAAA-MM-DD (ejemplo: 2025-05-20)",
      );
    }

    if (!amount.trim()) {
      return Alert.alert("Campo requerido", "El monto es obligatorio");
    }
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      return Alert.alert("Monto inválido", "El monto debe ser un número");
    }
    if (numericAmount <= 0) {
      return Alert.alert(
        "Monto inválido",
        "El monto debe ser un número positivo mayor a $0.00",
      );
    }

    setSaving(true);
    try {
      if (isEditing && editId) {
        await updateExpense(editId, {
          name: name.trim(),
          amount: numericAmount,
          category,
          date: date,
        });
        Alert.alert("¡Listo!", "Gasto actualizado correctamente");
        router.replace("/(tabs)/expenses");
      } else {
        await addExpense(name.trim(), numericAmount, category, date);
        Alert.alert("¡Listo!", "Gasto agregado correctamente", [
          { text: "OK", onPress: () => router.replace("/(tabs)/expenses") },
        ]);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Cargando gasto...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>
        {isEditing ? "Editar Gasto" : "Nuevo Gasto"}
      </Text>

      {/* Fernando — campo nombre del gasto */}
      <Text style={styles.label}>Nombre *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Almuerzo, Uber, Netflix..."
        placeholderTextColor="#aaa"
      />

      {/* Fernando — selector de categoría con placeholder inicial no seleccionable */}
      <Text style={styles.label}>Categoría *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(value: string) => {
            if (value !== "") setCategory(value);
          }}
        >
          <Picker.Item
            label="Seleccione una categoría..."
            value=""
            enabled={false}
            color="#aaa"
          />
          {EXPENSE_CATEGORIES.map((cat) => (
            <Picker.Item
              key={cat.id}
              label={`${cat.icon} ${cat.label}`}
              value={cat.id}
            />
          ))}
        </Picker>
      </View>

      {/* Fernando — campo fecha en formato AAAA-MM-DD */}
      <Text style={styles.label}>Fecha * (AAAA-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="2025-05-20"
        placeholderTextColor="#aaa"
        keyboardType="numbers-and-punctuation"
      />

      {/* Fernando — campo monto numérico positivo */}
      <Text style={styles.label}>Monto *</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="0.00"
        placeholderTextColor="#aaa"
      />

      {/* Fernando — botón guardar con indicador de carga mientras se procesa */}
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>
            {isEditing ? "Actualizar Gasto" : "Guardar Gasto"}
          </Text>
        )}
      </TouchableOpacity>

      {isEditing && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.replace("/(tabs)/expenses")}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#666", fontSize: 14 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, marginTop: 8 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 14,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 14,
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonDisabled: { backgroundColor: "#a0c4e8" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  cancelButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cancelButtonText: { color: "#666", fontSize: 15 },
});
