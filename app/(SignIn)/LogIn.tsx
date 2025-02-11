import { View, Text, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import { ConstantStyles } from '@/constants/Styles'
import LottieView from 'lottie-react-native'
import { Colors } from '@/constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Fonts } from '@/constants/Fonts'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useDataContext } from '@/components/context/DataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LogIn() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState('')
  const animation = useRef<LottieView>(null)

  const { users } = useDataContext()

  if (!users) {
    return <Text>Loading...</Text>
  } else {


    const HandleLogIn = async () => {
      if (emailOrUsername === '') {
        setAlert('Please Enter Email or Username')
        return
      }

      if (password === '') {
        setAlert('Please Enter Password')
        return
      }

      setAlert('Processing...')
      const user = users.find(u => u.email === emailOrUsername || u.username === emailOrUsername)
      if (user) {
        if (user.password === password) {
          setAlert('Logged In Successfully')
          await AsyncStorage.setItem('user', JSON.stringify(user))
          router.replace('/(Ai)/launching')
        } else {
          setAlert('Password is incorrect')
        }
      } else {
        setAlert('User not found')
      }

    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
        <ScrollView style={[ConstantStyles.scrollViewTag, { padding: 0 }]}>
          <LinearGradient
            colors={['#00008b', Colors.light.tint]}
            start={{ x: 0, y: -0.2 }}
            end={{ x: 0, y: 1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: Colors.light.tint,
              padding: 20,
              marginBottom: 5,
            }}>
            <LottieView ref={animation} source={require('../../assets/Animations/search.json')} autoPlay loop style={{ width: 250, height: 250 }} />
          </LinearGradient>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>LogIn</Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            width: '100%',
          }}>
            <View style={ConstantStyles.inputContainer}>
              <MaterialIcons name="alternate-email" size={24} color="gray" />
              <TextInput
                style={ConstantStyles.inputText}
                keyboardType="email-address"
                placeholder='Email or Username'
                placeholderTextColor={"gray"}
                value={emailOrUsername}
                onChangeText={(e) => setEmailOrUsername(e)}
              />
            </View>

            <View style={ConstantStyles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="gray" />
              <TextInput
                style={ConstantStyles.inputText}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor={"gray"}
                value={password}
                onChangeText={(e) => setPassword(e)}
              />
            </View>
            <View>
              <Text style={{ color: 'red', fontSize: 16, fontFamily: Fonts.family.bold }}>{alert}</Text>
            </View>
            <TouchableOpacity onPress={() => HandleLogIn()} style={{ width: '100%' }}>
              <Text style={[ConstantStyles.button, { backgroundColor: Colors.light.tint, color: Colors.light.background }]}>LogIn</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <View style={styles.line} />
            <Text style={{ color: Colors.light.tint, fontSize: 20, fontFamily: Fonts.family.medium, marginHorizontal: 10 }}>Or</Text>
            <View style={styles.line} />
          </View>

          {/* Log In With Google */}

          <View style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            width: '100%',
          }}>
            <View style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.light.background,
              borderRadius: 10,
              padding: 5,
              borderWidth: 2,
            }}>
              <Image source={require('../../assets/images/Google.gif')} style={{ width: 40, height: 50 }} />
              <Text style={{
                color: Colors.light.tint,
                fontSize: 16,
                marginHorizontal: 10,
                fontFamily: Fonts.family.bold,
                textAlign: 'center',
              }}>LogIn With Google</Text>
            </View>
          </View>

          {/* Don't Have Account */}
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            padding: 20,
          }}>
            <Text style={{ color: Colors.light.tint, fontSize: 16, fontFamily: Fonts.family.medium }}>Don't Have Account?</Text>
            <Text onPress={() => router.push('/(SignIn)/SignUp')} style={{ color: Colors.light.tint, fontSize: 16, fontFamily: Fonts.family.bold, marginHorizontal: 5 }}>Register</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: Colors.light.tint,
    fontFamily: Fonts.family.bold,
    textAlign: 'center',
  },
  line: {
    height: 0.5,
    backgroundColor: '#ccc',
    width: '38%',
    marginVertical: 20,
  },
})