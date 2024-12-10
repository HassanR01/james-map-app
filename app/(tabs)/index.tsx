import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function Home() {
  return (
    <>
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={{ width: 30, height: 50, margin: 10 }} />
        <View style={[ConstantStyles.inputsCont, { width: '70%' }]}>
          <Ionicons name="search-circle-sharp" size={30} color='gray' />
          <TextInput placeholder="North Coast, Mountain View" focusable={false} onPressIn={() => router.push('/Search')} style={ConstantStyles.inputs} />
        </View>
        <TouchableOpacity style={styles.IconButton}>
          <AntDesign name="filter" size={26} color={Colors.light.tint} />
        </TouchableOpacity>
      </View>
      <ScrollView style={ConstantStyles.scrollViewTag}>
        <View style={styles.OffersBanner}>

        </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  IconButton: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    marginLeft: 10
  },
  OffersBanner: {
    backgroundColor: Colors.light.background,
    padding: 10, 
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.tint,
    width: '100%',
    height: 200,
  }
})