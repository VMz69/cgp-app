import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";

export default function Add() {
  const { addExpense } = useExpenses();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = async () => {
    try {
      await addExpense(
        name,
        Number(amount),
        "general",
        new Date().toISOString(),
      );

      Alert.alert("OK", "Gasto guardado");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput
        placeholder="Monto"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <Button title="Guardar" onPress={handleAdd} />
    </View>
  );
}
