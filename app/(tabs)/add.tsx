import { Button } from "@/components/Button";
import { FormInput } from "@/components/FormInput";
import { useExpenses } from "@/hooks/useExpenses";
import { StyleSheet, Text, View } from "react-native";

export default function AddScreen() {
  const { addExpense } = useExpenses();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Gasto</Text>
      {/* TODO: Agregar formulario para nuevo gasto */}
      <FormInput placeholder="Descripción" />
      <FormInput placeholder="Monto" keyboardType="decimal-pad" />
      <Button title="Guardar Gasto" onPress={() => {}} />
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
    marginBottom: 20,
  },
});
