import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function LoadingPage() {
  return (
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1, width: '100%', height: '100%', backgroundColor: '#010224' }}>
      <Image source={require('../../assets/images/loading.gif')} style={{ width: 300, height: 300 }} />
    </View>
  )
}

const styles = StyleSheet.create({})