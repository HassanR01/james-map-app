import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {


  const [loaded] = useFonts({
    "Tajawal-Bold": require('./../assets/fonts/Tajawal-Bold.ttf'),
    "Tajawal-Black": require('./../assets/fonts/Tajawal-Black.ttf'),
    "Tajawal-Medium": require('./../assets/fonts/Tajawal-Medium.ttf'),
    "Tajawal-Regular": require('./../assets/fonts/Tajawal-Regular.ttf'),
    "Tajawal-Light": require('./../assets/fonts/Tajawal-Light.ttf'),
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
    </SafeAreaProvider>
  )
}
