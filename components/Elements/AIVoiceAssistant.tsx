import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Audio } from 'expo-av'
import * as Speech from 'expo-speech'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import axios from 'axios'

export default function AIVoiceAssistant() {
    const [text, setText] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [loading, setLoading] = useState(false)
    const [recording, setRecourding] = useState<Audio.Recording>()
    const [aiResponse, setAiResponse] = useState(false)

    const API_KEY = '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'

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
            formData.append('language', 'en') // Specify English language

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

    const sendToGPT = async (text: string) => {
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4',
                messages: [
                    {
                        role: 'system',
                        content: 'You are James, a real estate consultant who responds to customer inquiries and refers to yourself as James when speaking to customers and when someone asks for your name, and you just respond in English.'
                    },
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
            }
            )
            setText(response.data.choices[0].message.content)
            setLoading(false)
            return response.data.choices[0].message.content
        } catch (error) {
            console.log(error)
        }
    }

    const speakText = async (text: string) => {
        try {

            const options = {
                voice: 'com.apple.ttsbundle.Samantha-compact',
                language: 'en-US',
                pitch: 1.1,
            }

            Speech.speak(text, options)

        } catch (error) {
            console.log(error)
        }
    }


    // useEffect(() => {
    //     const avi = async () => {
    //         const voices = await Speech.getAvailableVoicesAsync()
    //         console.log(voices)
    //     }
    //     avi()
    // })

    return (
        <>
            <Animated.View entering={FadeInDown.duration(1000).delay(800)}>
                {isRecording ? (
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
                        }}
                    >
                        <Feather name="stop-circle" size={50} color="red" />
                    </TouchableOpacity>
                ) : (
                    <>
                        {loading ? (
                            <>
                                <TouchableOpacity
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
                                    <Feather name="volume-2" size={50} color="black" />
                                </TouchableOpacity>
                            </>
                        ) : (

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
                                }} >
                                <Feather name="mic" size={50} color="black" />
                            </TouchableOpacity>
                        )}
                    </>
                )}
            </Animated.View>
        </>
    )
}

const styles = StyleSheet.create({})