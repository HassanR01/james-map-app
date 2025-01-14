import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
    return (
        <SafeAreaView edges={['top', 'left', 'right']} style={{
            flex: 1,
            backgroundColor: Colors.light.background
        }} >

            <Stack screenOptions={{
                headerLeft: () => {
                    return (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back-circle-outline" size={30} color={Colors.light.tint} style={{ marginHorizontal: 5 }} />
                        </TouchableOpacity>
                    )
                }
            }}>
                <Stack.Screen name='Comparizone' options={{
                    title: "Comparizone",
                }} />
            </Stack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})