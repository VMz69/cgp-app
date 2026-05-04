// app/(tabs)/_layout.tsx
import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../hooks/useAuth";

function TabIcon({
  type,
  color,
}: {
  type: "home" | "expenses" | "add";
  color: string;
}) {
  switch (type) {
    case "home":
      return (
        <View style={[styles.iconContainer, { borderColor: color }]}>
          <View style={[styles.houseRoof, { borderBottomColor: color }]} />
          <View style={[styles.houseBody, { borderColor: color }]} />
        </View>
      );
    case "expenses":
      return (
        <View style={styles.iconContainer}>
          <View style={[styles.bar, { backgroundColor: color, width: 18 }]} />
          <View style={[styles.bar, { backgroundColor: color, width: 14 }]} />
          <View style={[styles.bar, { backgroundColor: color, width: 10 }]} />
        </View>
      );
    case "add":
      return (
        <View style={[styles.iconContainer, { borderColor: color }]}>
          <View style={[styles.plusCircle, { borderColor: color }]}>
            <View style={[styles.plusLine, { backgroundColor: color }]} />
            <View
              style={[styles.plusLineVertical, { backgroundColor: color }]}
            />
          </View>
        </View>
      );
    default:
      return <Text style={{ color }}>?</Text>;
  }
}

export default function TabsLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <TabIcon type="home" color={color ?? "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: "Gastos",
          tabBarIcon: ({ color }) => (
            <TabIcon type="expenses" color={color ?? "#000"} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Agregar",
          tabBarIcon: ({ color }) => (
            <TabIcon type="add" color={color ?? "#000"} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#000",
    marginBottom: -2,
  },
  houseBody: {
    width: 16,
    height: 12,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 2,
    backgroundColor: "transparent",
  },
  bar: {
    height: 3,
    borderRadius: 2,
    marginVertical: 1,
  },
  plusCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  plusLine: {
    position: "absolute",
    width: 10,
    height: 2,
    borderRadius: 1,
  },
  plusLineVertical: {
    position: "absolute",
    width: 2,
    height: 10,
    borderRadius: 1,
  },
});
