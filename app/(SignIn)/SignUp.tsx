import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { ConstantStyles } from '@/constants/Styles'
import LottieView from 'lottie-react-native'
import { Fonts } from '@/constants/Fonts'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { router } from 'expo-router'
import axios from 'axios'
import Constants from 'expo-constants'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState('')
  const animation = useRef<LottieView>(null)

  const handleSignUp = async () => {
    if (email === '') {
      setAlert('Please Enter Email')
      return
    }

    if (username === '') {
      setAlert('Please Enter Username')
      return
    }

    if (password === '') {
      setAlert('Please Enter Password')
      return
    }

    if (confirmPassword === '') {
      setAlert('Please Enter Confirm Password')
      return
    }

    if (password !== confirmPassword) {
      setAlert('Password and Confirm Password must be same')
      return
    }

    setAlert('Processing...')

    try {
      await axios.post(`${Constants.expoConfig?.extra?.API_URL}/users/register`, {
        username, password, email
      }).then(res => {
        if (res.data.message == 'User created') {
          setAlert('User Registered Successfully')
          router.replace('/(SignIn)/LogIn')
        } else {
          Alert.alert('User Already Exist', res.data.message)
          setAlert('')
        }
      })
    } catch (error) {
      setAlert('Error Occured')
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
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LottieView
            source={require('../../assets/Animations/investment.json')}
            ref={animation}
            autoPlay
            loop
            style={{ width: 250, height: 250 }}
          />
        </LinearGradient>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>SignUp</Text>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingBottom: 10,
          width: '100%',
        }}>
          <View style={ConstantStyles.inputContainer}>
            <MaterialIcons name="alternate-email" size={24} color="gray" />
            <TextInput
              style={ConstantStyles.inputs}
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder='Email'
              placeholderTextColor={'gray'}
              keyboardType='email-address'
            />
          </View>

          <View style={ConstantStyles.inputContainer}>
            <FontAwesome5 name="user" size={24} color="gray" />
            <TextInput
              style={ConstantStyles.inputs}
              placeholder='Username'
              placeholderTextColor={'gray'}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

          <View style={ConstantStyles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="gray" />
            <TextInput
              style={ConstantStyles.inputs}
              placeholder='Password'
              placeholderTextColor={'gray'}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>

          <View style={ConstantStyles.inputContainer}>
            <MaterialIcons name="security" size={24} color="gray" />
            <TextInput
              style={ConstantStyles.inputs}
              placeholder='Confirm Password'
              placeholderTextColor={'gray'}
              secureTextEntry
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
          </View>

          <View>
            <Text style={{ color: 'red', fontSize: 16, fontFamily: Fonts.family.bold }}>{alert}</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleSignUp()}
            style={{
              width: '100%',
            }}>
            <Text style={[ConstantStyles.button, { backgroundColor: Colors.light.tint, color: Colors.light.background }]}>SignUp</Text>
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

        {/* Signup With Google */}

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
            }}>SignUp With Google</Text>
          </View>
        </View>

        {/* I have account */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
          <Text style={{ color: Colors.light.tint, fontSize: 18, fontFamily: Fonts.family.medium }}>Already Have Account? </Text>
          <TouchableOpacity onPress={() => router.navigate('/(SignIn)/LogIn')}>
            <Text style={{ color: Colors.light.tint, fontSize: 18, fontFamily: Fonts.family.bold }}>LogIn</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
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
    marginVertical: 0,
  },
})