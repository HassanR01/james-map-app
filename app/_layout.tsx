import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import DataProvider from "@/components/context/DataContext";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const [loaded] = useFonts({
    "Fustat-Bold": require('./../assets/fonts/Fustat-Bold.ttf'),
    "Fustat-Medium": require('./../assets/fonts/Fustat-Medium.ttf'),
    "Fustat-Regular": require('./../assets/fonts/Fustat-Regular.ttf'),
    "Fustat-Light": require('./../assets/fonts/Fustat-Light.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <DataProvider>

        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(Developers)" />
          <Stack.Screen name="(Projects)" />
          <Stack.Screen name="(Zones)" />
          <Stack.Screen name="(Units)" />
          <Stack.Screen name="(Maps)" />
          <Stack.Screen name="(SignIn)" />
        </Stack>
      </DataProvider>

    </SafeAreaProvider>
  )
}
