import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="zone" />
        <Stack.Screen name="unit" />
        <Stack.Screen name="project" />
      </Stack>
    </>
  )
}