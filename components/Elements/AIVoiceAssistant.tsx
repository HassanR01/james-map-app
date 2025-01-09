import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import * as Speech from 'expo-speech'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import LottieView from 'lottie-react-native'
import { router } from 'expo-router'
import { Fonts } from '@/constants/Fonts'

export default function AIVoiceAssistant() {
    const [text, setText] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [loading, setLoading] = useState(false)
    const [recording, setRecourding] = useState<Audio.Recording>()
    const [aiResponse, setAiResponse] = useState(false)

    const [conversationHistory, setConversationHistory] = useState<{ role: string, content: string }[]>([])

    const API_KEY = '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'

    useEffect(() => {
        if (text) {
            setConversationHistory(prevHistory => [...prevHistory, { role: 'user', content: text }])
        }
    }, [text])

    const sendToGPT = async (text: string) => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are James, a real estate consultant in Egypt and different places around the world who responds to customer inquiries in a friendly and helpful manner. You refer to yourself as James when speaking to customers and respond in both English and Arabic with a good accent. You are always available to help customers find their dream home, and you answer questions clearly and shortly.'
                    },
                    ...conversationHistory,
                    {
                        role: 'user',
                        content: text
                    }
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            })
            const aiMessage = response.data.choices[0].message.content
            setConversationHistory(prevHistory => [...prevHistory, { role: 'assistant', content: aiMessage }])
            setText(aiMessage)
            setLoading(false)
            return aiMessage
        } catch (error) {
            console.log(error)
        }
    }

    const getMicrophonePermission = async () => {
        try {
            const { granted } = await Audio.requestPermissionsAsync()
            if (!granted) {
                Alert.alert('Permission Required', 'Microphone permission is required to use this feature')
                return false
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const recordingOptions: any = {
        android: {
            extension: '.wav',
            outPutFormat: Audio.AndroidOutputFormat.MPEG_4,
            audioEncoder: Audio.AndroidAudioEncoder.AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000
        },
        ios: {
            extension: '.wav',
            audioQuality: Audio.IOSAudioQuality.HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false
        }
    }

    const startRecording = async () => {
        const hasPermission = await getMicrophonePermission()
        if (!hasPermission) return

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true
            })
            setIsRecording(true)
            const { recording } = await Audio.Recording.createAsync(recordingOptions)
            setRecourding(recording)
        } catch (error) {
            console.error('Failed to start recording', error)
            Alert.alert('Error', 'Failed to start recording')
        }
    }

    const stopRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false
            })
            setIsRecording(false)
            setLoading(true)
            await recording?.stopAndUnloadAsync()

            const uri = recording?.getURI()
            if (!uri) throw new Error('Recording URI is null')

            // Send the audio file to the server for processing
            const transcript = await sendAudioToWhisper(uri)
            setText(transcript)

            // Send the transcript to GPT-3 for further processing
            const response = await sendToGPT(transcript)
            setAiResponse(true)
            await speakText(response)
        } catch (error) {
            console.error('Failed to stop recording', error)
            Alert.alert('Error', 'Failed to stop recording')
        } finally {
            setLoading(false)
        }
    }

    const sendAudioToWhisper = async (uri: string) => {
        try {
            const formData: any = new FormData()
            formData.append('file', {
                uri,
                type: 'audio/wav',
                name: 'recording.wav'
            })
            formData.append('model', 'whisper-1')

            const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log(response.data.text)
            return response.data.text
        } catch (error) {
            console.log('Error', error)
        }
    }

    const speakText = async (text: string) => {
        try {
            const options = {
                voice: 'com.apple.voice.compact.ar-001.Maged',
                language: 'ar-EG',
                pitch: 1,
                rate: 1.1,
            }

            Speech.speak(text, {
                ...options,
                onDone: () => {
                    setAiResponse(false)
                    setIsRecording(false)
                    setLoading(false)
                },
                onError: () => {
                    setAiResponse(false)
                    setIsRecording(false)
                    setLoading(false)
                },
            })

        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     Speech.getAvailableVoicesAsync().then(voices => {
    //         console.log(voices)

    //     }
    //     )
    // }, [])

    return (
        <>
            <Animated.View entering={FadeInDown.duration(1000).delay(800)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <>
                        <TouchableOpacity
                            style={{
                                width: 120,
                                height: 120,
                                borderRadius: 100,

                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 100
                            }}
                        >
                            <LottieView
                                source={require('../../assets/Animations/loading.json')}
                                autoPlay
                                loop
                                style={{ width: 300, height: 300 }}
                            />
                        </TouchableOpacity>
                    </>
                ) : (

                    <>
                        {!isRecording ? (
                            <>
                                {aiResponse ? (
                                    <>
                                        <View>
                                            <LottieView
                                                source={require('../../assets/Animations/Talking.json')}
                                                autoPlay
                                                loop
                                                style={{ width: 200, height: 200 }}
                                            />
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity onPress={startRecording}
                                            style={{
                                                width: 120,
                                                height: 120,
                                                borderRadius: 100,
                                                backgroundColor: Colors.light.background,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginVertical: 100
                                            }}
                                        >
                                            <Feather name="mic" size={50} color="black" />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </>
                        ) : (
                            <TouchableOpacity onPress={stopRecording}
                                style={{
                                    width: 120,
                                    height: 120,
                                    borderRadius: 100,
                                    backgroundColor: Colors.light.background,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 100
                                }} >

                                <LottieView
                                    source={require('../../assets/Animations/recording.json')}
                                    autoPlay
                                    loop
                                    speed={1.5}
                                    style={{ width: 200, height: 200 }}
                                />
                            </TouchableOpacity>
                        )}


                    </>

                )
                }
                {/* text */}
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{ color: Colors.light.background, fontSize: 18, fontFamily: Fonts.Arabic.medium, textAlign: 'center' }}>{text}</Text>
                </View>
            </Animated.View >
        </>
    )
}

const styles = StyleSheet.create({})