import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerShown: false,
          title: "Index"
        }}
      />
      <Stack.Screen name="Welcome"
        options={{
          headerShown: false,
          title: "Welcome"
        }}
      />
      <Stack.Screen name="SignUp"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
      <Stack.Screen name="LogIn"
        options={{
          title: "Log In",
          headerShown: false,
        }}
      />
    </Stack>
  )
}