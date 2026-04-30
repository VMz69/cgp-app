import { Button, Text, View } from "react-native";
import { useExpenses } from "../../hooks/useExpenses";

export default function Expenses() {
  const { expenses, loadExpenses } = useExpenses();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Recargar" onPress={loadExpenses} />

      {expenses.map((item) => (
        <Text key={item.id}>
          {item.name} - ${item.amount}
        </Text>
      ))}
    </View>
  );
}
