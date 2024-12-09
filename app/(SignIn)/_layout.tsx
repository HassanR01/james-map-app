import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{
      flex: 1,
      backgroundColor: Colors.light.background
    }}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Welcome" />
        <Stack.Screen name="SignUp" />
        <Stack.Screen name="LogIn" />
      </Stack>
    </SafeAreaView>
  )
}