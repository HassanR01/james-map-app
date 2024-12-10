import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function Developer() {
    const { developer } = useLocalSearchParams()
    const [developerHear] = useState(typeof developer === 'string' ? JSON.parse(developer) : null)
    

  return (
    <View>
      <Text>{developerHear.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})