import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function _layout() {
    return (
        <>
            <SafeAreaView edges={['top', 'left', 'right']} style={{
                flex: 1,
                backgroundColor: Colors.light.background
            }} >

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
            </SafeAreaView>
        </>
    )
}