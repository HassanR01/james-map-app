import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={Colors.light.tint} style={{ marginHorizontal: 5 }} />
        </TouchableOpacity>
      )
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="Project" />
    </Stack>
  )
}