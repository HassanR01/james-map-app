import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/constants/Styles'
import { router } from 'expo-router'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'

export default function Maps() {


  const Maps = [
    {
      name: 'North Coast',
      image: require('@/assets/images/maps/ncMap.png'),
      zone: 'North Coast',
      coordinates: [31.032901117975193, 28.54474060624909]
    },
    {
      name: 'Red Sea',
      image: require('@/assets/images/maps/RedMap.png'),
      zone: 'Red Sea',
      coordinates: [27.483747177719422, 33.39086620488008]
    },
    {
      name: 'Alexandria',
      image: require('@/assets/images/maps/AlexMap.png'),
      zone: 'Alexandria',
      coordinates: [31.205831827355244, 29.965339050803056]
    },
    {
      name: 'Cairo',
      image: require('@/assets/images/maps/cairoMap.png'),
      zone: 'Cairo',
      coordinates: [30.043040938713617, 31.231435145817702]
    },
  ]

  return (
    <ScrollView style={ConstantStyles.scrollViewTag}>
      <View style={{ paddingVertical: 20, width: '100%' }}>
        <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Maps In Egypt</Text>
        <View style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
          {Maps.map((map, index) => (
            <View key={index} style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 5,
            }}>
              <Text style={[ConstantStyles.text, { textAlign: 'left', width: '100%', fontFamily: Fonts.family.bold, fontSize: 18 }]}>{map.name}</Text>
              <View style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: '/(Maps)/zone',
                    params: {
                      coordinates: JSON.stringify(map.coordinates)
                    }
                  })}
                  style={{
                    width: "100%",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: Colors.light.loading,
                  }}
                >
                  <Image source={map.image} style={{ width: "100%", height: 100 }} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
      <View style={{ paddingVertical: 20 }}>
        <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Maps In UAE</Text>
      </View>
    </ScrollView>)
}