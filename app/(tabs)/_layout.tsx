import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2e2e2e",
        tabBarInactiveTintColor: "#bfbfbf",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="customers"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "Produtos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="tags" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sales"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="book" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
