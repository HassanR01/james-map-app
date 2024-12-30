import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { ConstantStyles } from '@/constants/Styles'
import { Fonts } from '@/constants/Fonts'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { Audio } from 'expo-av'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import AIVoiceAssistant from '@/components/Elements/AIVoiceAssistant'


export default function Welcome() {
  const animation = useRef<LottieView>(null)
  const [audioWorking, setAudioWorking] = useState(false)

  const playAudio = async () => {
    try {

      const sound = await Audio.Sound.createAsync(
        require('../../assets/voice/welcome.mp3')
      )
      await sound.sound.playAsync()
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     playAudio()
  //     setAudioWorking(true)
  //   }, 1000);

  //   setTimeout(() => {
  //     setAudioWorking(false)
  //   }, 3500);

  //   return () => {
  //     Audio.Sound.createAsync(
  //       require('../../assets/voice/welcome.mp3')
  //     ).then(sound => {
  //       sound.sound.unloadAsync()
  //     })
  //   }
  // }, [])

  // const slides = [
  //   {
  //     id: 1,
  //     title: 'Welcome to James Map App',
  //     description: 'This is a map app that helps you find your perfect place to live',
  //     animation: require('../../assets/Animations/search.json')
  //   },
  //   {
  //     id: 2,
  //     title: 'Invest in your future',
  //     description: 'Manage your properties and investments in one place',
  //     animation: require('../../assets/Animations/investment.json')
  //   },
  //   {
  //     id: 3,
  //     title: 'Close deals faster',
  //     description: 'Get fast and profitable deals for your investment',
  //     animation: require('../../assets/Animations/deal.json')
  //   }
  // ]


  return (

    <LinearGradient
      colors={['#00008b', Colors.light.tint]}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      start={{ x: 0, y: -0.2 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar barStyle={'light-content'} />
      <Image source={require('../../assets/images/blue.png')} style={{
        width: 300,
        height: 300,
        position: 'absolute',
        top: 100,
        right: -100,
        zIndex: -1,
        opacity: 0.9
      }} />

      <Image source={require('../../assets/images/purple.png')} style={{
        width: 200,
        height: 200,
        position: 'absolute',
        bottom: 150,
        left: 0,
        zIndex: -1,
      }} />

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginBottom: 20
        }}>
        <AIVoiceAssistant />
        <Animated.View entering={FadeInDown.duration(1000).delay(1000)}>
          <Text style={styles.title}>Welcome to James Map</Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(1000).delay(1200)}>
          <Text style={styles.description}>Your humble assistant to achieve your investment goals</Text>
        </Animated.View>
      </View>

      {/* LogIn Or signUp */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: 20
        }}>
        <Animated.View style={{ width: '100%' }} entering={FadeIn.duration(1000).delay(1400)}>
          <TouchableOpacity onPress={() => router.navigate('/(SignIn)/LogIn')}>
            <Text style={ConstantStyles.button}>LogIn</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ width: '100%' }} entering={FadeIn.duration(1000).delay(1600)}>
          <TouchableOpacity onPress={() => router.navigate('/(SignIn)/SignUp')}>
            <Text style={ConstantStyles.button}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      }}>
        <View style={styles.line} />
        <Text style={{ color: Colors.light.background, fontSize: 20, fontFamily: Fonts.family.medium }}>Or</Text>
        <View style={styles.line} />
      </View>

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: 20
        }}>
        <Animated.View style={{ width: '100%' }} entering={FadeIn.duration(1000).delay(1800)}>
          <TouchableOpacity onPress={() => router.replace('/(Ai)/launching')}>
            <Text style={[ConstantStyles.button, { backgroundColor: '#00b8ff', color: Colors.light.background }]}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: Fonts.family.bold,
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.light.background

  },
  description: {
    fontSize: 20,
    fontFamily: Fonts.family.medium,
    textAlign: 'center',
    color: Colors.light.background
  },
  line: {
    height: 0.5,
    backgroundColor: '#333366',
    width: '42%',
    marginVertical: 20,
  },
})