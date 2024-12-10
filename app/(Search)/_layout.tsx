import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerLeft: () => {
                return (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                )
            }
        }}>
            <Stack.Screen name="index" options={{
                title: "Search",
            }} />
            <Stack.Screen name='searchResults' options={{
                title: "Search Results",
            }} />
            <Stack.Screen name='filterData' options={{
                title: "Filter Requirments",
            }} />
        </Stack>
    )
}