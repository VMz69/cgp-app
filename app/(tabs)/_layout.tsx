// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Inicio" }} />
      <Tabs.Screen name="expenses" options={{ title: "Gastos" }} />
      <Tabs.Screen name="add" options={{ title: "Agregar" }} />
    </Tabs>
  );
}
