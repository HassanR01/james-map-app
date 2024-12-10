import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useDataContext } from '@/components/context/DataContext'

export default function Home() {

  const { units, projects, developers, zones } = useDataContext()

  if (!units || !projects || !developers || !zones) {
    return <Text>Loading...</Text>
  } else {


    return (
      <>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={{ width: 30, height: 50, margin: 10 }} />
          <View style={[ConstantStyles.inputsCont, { width: '70%' }]}>
            <Ionicons name="search-circle-sharp" size={30} color='gray' />
            <TextInput placeholder="North Coast, Mountain View" focusable={false} onPressIn={() => router.push('/(Search)')} style={ConstantStyles.inputs} />
          </View>
          <TouchableOpacity style={styles.IconButton} onPress={() => router.push('/(Search)/filterData')}>
            <AntDesign name="filter" size={26} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>
        <ScrollView style={ConstantStyles.scrollViewTag}>
          <View style={styles.OffersBanner}>

          </View>

          <FlatList
            data={developers.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, ind) => ind.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push({
                pathname: '/(Developers)/developer',
                params: { developer: JSON.stringify(item) }
              })}>
                <Image source={{ uri: `${item.image}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={{ margin: 10, width: 100, height: 100 , borderRadius: 50 , display: 'flex' , alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.light.tint }} onPress={() => router.push('/(Developers)')}>
                <Text style={{color: Colors.light.background, fontFamily: Fonts.family.bold, fontSize: 20}}>More</Text>
              </TouchableOpacity>
            )}
            
          />

        </ScrollView>
      </>
    )
  }
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
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    height: 200,
    marginBottom: 10,
  },

})