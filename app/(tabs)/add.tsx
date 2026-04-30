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
      await addExpense(
        name,
        Number(amount),
        category, // 🔥 AQUÍ estaba el error
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
        onValueChange={(itemValue) => setCategory(itemValue)}
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
