import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Fonts } from '@/constants/Fonts'
import { ConstantStyles } from '@/constants/Styles'

export default function More() {
  const [user, setUser] = useState({
    username: 'JamesMap',
    email: 'info@jamesmap.com',
    mobile: '+201234567890',
    image: require('../../assets/images/profile.png')
  })

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>More</Text>
        <AntDesign name='hearto' size={26} color={Colors.light.tint} />
      </View>
      <ScrollView style={ConstantStyles.scrollViewTag}>
        {/* Profile */}
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: Colors.light.background,
        }}>
          {user ? (
            <>
              <Image source={user.image} style={{ width: 100, height: 100, borderRadius: 50 }} />
              <Text style={{ fontSize: 20, fontFamily: Fonts.family.bold, color: Colors.light.tint, marginBottom: 5 }}>{user.username}</Text>
              <Text style={{ fontSize: 16, fontFamily: Fonts.family.regular, color: 'gray' }}>{user.mobile}</Text>
              <Text style={{ fontSize: 16, fontFamily: Fonts.family.regular, color: 'gray' }}>{user.email}</Text>
            </>
          ) : (
            <Image source={require('../../assets/images/profile.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
          )}
        </View>

        {/* More Pages */}
        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <MaterialCommunityIcons name="account-circle-outline" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Account Information</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="home" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Sell Your Property</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Feather name="phone" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Contact Us</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Feather name="bookmark" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Favourites</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Feather name="info" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>About Us</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Entypo name="language" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Languages</Text>
          </View>
          <Text style={{ fontSize: 18, fontFamily: Fonts.family.medium, color: 'gray' }}>English</Text>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="Safety" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Terms & Conditions</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonMorePage}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <MaterialCommunityIcons name="police-badge-outline" size={24} color={Colors.light.tint} />
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </View>
          <AntDesign name="arrowright" size={16} color={Colors.light.tint} />
        </TouchableOpacity>

        {/* Version and copyrights */}
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          backgroundColor: Colors.light.background,
          marginVertical: 10,
        }}>
          <Text style={{ fontSize: 14, fontFamily: Fonts.family.medium, color: 'gray' }}>Version 1.0.0</Text>
          <Text style={{ fontSize: 14, fontFamily: Fonts.family.medium, color: 'gray' }}>© Copyright {new Date().getFullYear()} JamesMap</Text>
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
    padding: 10,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.family.bold,
    color: Colors.light.tint,

  },
  buttonMorePage: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f1f8fb',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: Fonts.family.medium,
    color: Colors.light.tint,
    marginHorizontal: 10,
  }
})