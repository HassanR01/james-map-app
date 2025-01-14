import LoadingPage from "@/components/views/LoadingPage";
import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const [comparisones, setComparisones] = useState([]);
  const GetComparizons = async () => {
    const comparisonesExist = await AsyncStorage.getItem("comparisones");
    if (comparisonesExist) {
      setComparisones(JSON.parse(comparisonesExist));
    }
  }
  useEffect(() => {

    setInterval(() => {
      GetComparizons();
    }, 500);
  }, [])

  if (comparisones.length < 0) {
    return <LoadingPage />

  } else {
    return (
      <SafeAreaView edges={['top', 'left', 'right']} style={{
        flex: 1,
        backgroundColor: Colors.light.background
      }} >
        <StatusBar barStyle='dark-content' />

        {comparisones.length > 0 && (

          <TouchableOpacity
            onPress={() => router.push('/(supPages)/Comparizone')}
            style={{
              position: 'absolute',
              bottom: 100,
              left: 10,
              zIndex: 10,
              height: 50,
              width: 50,
              backgroundColor: Colors.light.background,
              padding: 5,
              borderRadius: 5,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: Colors.light.tint
            }}>
            <MaterialCommunityIcons name="book-open-page-variant-outline" size={30} color={Colors.light.tint} />
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              backgroundColor: Colors.light.tint,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: -5,
              right: -5,
            }}>

              <Text style={{
                color: Colors.light.background,
                fontSize: 14,
              }}>{comparisones.length}</Text>
            </View>
          </TouchableOpacity>
        )}

        <Stack screenOptions={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back-circle-outline" size={30} color={Colors.light.tint} style={{ marginHorizontal: 5 }} />
              </TouchableOpacity>
            )
          }
        }} >
          <Stack.Screen name='index' />
          <Stack.Screen name="unit" />
        </Stack>
      </SafeAreaView>
    )
  }
}