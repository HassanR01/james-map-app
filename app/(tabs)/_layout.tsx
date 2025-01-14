import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, Tabs } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "@/components/views/LoadingPage";


export default function _layout() {
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
            <>
                <SafeAreaView edges={['top', 'left', 'right']} style={{
                    flex: 1,
                    backgroundColor: Colors.light.background
                }} >
                    <StatusBar barStyle={'dark-content'} />
                    {comparisones.length > 0 && (

                        < TouchableOpacity
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
                    )
                    }

                    <Tabs screenOptions={{
                        tabBarStyle: {
                            paddingVertical: 10,
                        }
                    }}>
                        <Tabs.Screen name="Articles" options={{
                            title: "Articles",
                            tabBarActiveTintColor: Colors.light.text2,
                            tabBarInactiveBackgroundColor: Colors.light.background,
                            tabBarInactiveTintColor: Colors.light.tint,
                            tabBarHideOnKeyboard: true,
                            tabBarAllowFontScaling: true,
                            headerShown: false,
                            tabBarIcon: ({ color }) => <MaterialIcons name="article" size={24} color={color} />
                        }}
                        />
                        <Tabs.Screen name="Search" options={{
                            title: "Search",
                            tabBarActiveTintColor: Colors.light.text2,
                            tabBarInactiveBackgroundColor: Colors.light.background,
                            tabBarInactiveTintColor: Colors.light.tint,
                            tabBarHideOnKeyboard: true,
                            tabBarAllowFontScaling: true,
                            headerShown: false,
                            tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />
                        }}
                        />
                        <Tabs.Screen name="index" options={{
                            title: "Home",
                            tabBarActiveTintColor: Colors.light.text2,
                            tabBarInactiveBackgroundColor: Colors.light.background,
                            tabBarInactiveTintColor: Colors.light.tint,
                            tabBarHideOnKeyboard: true,
                            tabBarAllowFontScaling: true,
                            headerShown: false,
                            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />
                        }}
                        />
                        <Tabs.Screen name="Maps" options={{
                            title: "Maps",
                            tabBarActiveTintColor: Colors.light.text2,
                            tabBarInactiveBackgroundColor: Colors.light.background,
                            tabBarInactiveTintColor: Colors.light.tint,
                            tabBarHideOnKeyboard: true,
                            tabBarAllowFontScaling: true,
                            headerShown: false,
                            tabBarIcon: ({ color }) => <FontAwesome5 name="map-marker-alt" size={24} color={color} />
                        }}
                        />
                        <Tabs.Screen name="More" options={{
                            title: "More",
                            tabBarActiveTintColor: Colors.light.text2,
                            tabBarInactiveBackgroundColor: Colors.light.background,
                            tabBarInactiveTintColor: Colors.light.tint,
                            tabBarHideOnKeyboard: true,
                            tabBarAllowFontScaling: true,
                            headerShown: false,
                            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-page-variant-outline" size={24} color={color} />
                        }}
                        />
                    </Tabs>
                </SafeAreaView >
            </>
        )
    }
}