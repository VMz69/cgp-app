import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { useExpenses } from "../../hooks/useExpenses";

export default function Home() {
  const { total } = useExpenses();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)/login"); // necesita navegación manual

      // Firebase + _layout hacen el redirect automático
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Total: ${total}</Text>

      <Button title="Cerrar sesión" onPress={handleLogout} />
    </View>
  );
}
