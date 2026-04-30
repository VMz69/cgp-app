import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { EXPENSE_CATEGORIES } from "../../constants/categories";
import { useExpenses } from "../../hooks/useExpenses";

export default function Add() {
  const { addExpense } = useExpenses();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id);

  const handleAdd = async () => {
    try {
      // 🔴 VALIDACIONES

      // 1. Nombre vacío
      if (!name.trim()) {
        return Alert.alert("Error", "El nombre es obligatorio");
      }

      // 2. Monto vacío
      if (!amount.trim()) {
        return Alert.alert("Error", "El monto es obligatorio");
      }

      const numericAmount = Number(amount);

      // 3. Monto no numérico
      if (isNaN(numericAmount)) {
        return Alert.alert("Error", "El monto debe ser un número");
      }

      // 4. Monto <= 0
      if (numericAmount <= 0) {
        return Alert.alert("Error", "El monto debe ser mayor a 0");
      }

      // 🔹 Si pasa validaciones → guardar
      await addExpense(
        name.trim(),
        numericAmount,
        category,
        new Date().toISOString(),
      );

      Alert.alert("OK", "Gasto guardado");

      // limpiar campos
      setName("");
      setAmount("");
      setCategory(EXPENSE_CATEGORIES[0].id);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Monto</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Text>Categoría</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue: string) => setCategory(itemValue)}
      >
        {EXPENSE_CATEGORIES.map((cat) => (
          <Picker.Item
            key={cat.id}
            label={`${cat.icon} ${cat.label}`}
            value={cat.id}
          />
        ))}
      </Picker>

      <Button title="Guardar" onPress={handleAdd} />
    </View>
  );
}
