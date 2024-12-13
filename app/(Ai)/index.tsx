import { Dimensions, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/constants/Styles'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fonts } from '@/constants/Fonts'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function ChatAi() {
    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: Colors.light.background }}
            automaticallyAdjustKeyboardInsets
            enableAutomaticScroll
        >

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[ConstantStyles.scrollViewTag, {
                    backgroundColor: Colors.light.background,
                    padding: 0,
                }]}
            >
                <LinearGradient
                    colors={[Colors.light.tint, Colors.light.background]}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10
                    }}
                    start={{ x: 0, y: -0.2 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: Dimensions.get('screen').height * 0.8,
                    }}>
                        <Text style={styles.title}>Your Ai Assistant</Text>
                    </View>
                    <View style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',

                    }}>
                        <View style={[ConstantStyles.inputContainer, { width: '81%', marginVertical: 0 }]}>
                            <TextInput
                                numberOfLines={4}
                                multiline={true}
                                style={[ConstantStyles.inputText]}
                                placeholder='Type a message'
                                placeholderTextColor={"gray"}
                            />
                        </View>
                        <View style={[ConstantStyles.IconButton, { margin: 0, borderWidth: 0, backgroundColor: '#f1f8fb'}]} >
                            <MaterialCommunityIcons name="microphone-outline" size={32} color="black" />
                        </View>
                    </View>
                    {/* Send */}
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>

                        <Text style={[ConstantStyles.button, { backgroundColor: Colors.light.tint, color: Colors.light.background }]}>Send</Text>
                    </View>

                </LinearGradient>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontFamily: Fonts.family.bold,
        color: Colors.light.background,

    },
})