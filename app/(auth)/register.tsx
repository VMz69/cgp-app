import { useAuth } from "@/hooks/useAuth";
import { StyleSheet, Text, View } from "react-native";

export default function RegisterScreen() {
  const { register } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {/* TODO: Agregar FormInput y Button aquí */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
