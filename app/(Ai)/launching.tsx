import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'
import { Dropdown } from 'react-native-element-dropdown'
import { router } from 'expo-router'
import { AntDesign, FontAwesome5, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'


export default function Launching() {
    const [language, setLanguage] = useState('en')

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
            <StatusBar barStyle='light-content' />
            {/* Language Choose arabic and English */}
            <View style={styles.container}>
                <Dropdown
                    style={styles.dropdown}
                    data={[
                        { label: 'English', value: 'en' },
                        { label: 'Arabic', value: 'ar' },
                    ]}
                    containerStyle={{
                        borderRadius: 10,
                    }}
                    labelField={'label'}
                    valueField={'value'}
                    value={language}
                    onChange={(item) => setLanguage(item.value)}
                />
            </View>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 100,
                    marginBottom: 20
                }}>
                <View style={{
                    marginBottom: 20
                }}>
                    <Image source={require('../../assets/images/earth.gif')} style={{ width: 150, height: 150 }} />
                </View>
                <Text style={styles.title}>Welcome to James Map</Text>
                <View style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                    marginBottom: 20
                }}>
                    {/* Icons To App */}
                    <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <AntDesign name="home" size={28} color="black" />
                        </View>
                        <Text style={styles.iconText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <FontAwesome6 name="money-bill-trend-up" size={24} color="black" />
                        </View>
                        <Text style={styles.iconText}>Investment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <Octicons name="git-compare" size={24} color="black" />
                        </View>
                        <Text style={styles.iconText}>Comparison</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)/Articles')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="bookshelf" size={30} color="black" />
                        </View>
                        <Text style={styles.iconText}>Articles</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(Maps)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <FontAwesome6 name="map-location-dot" size={24} color="black" />
                        </View>
                        <Text style={styles.iconText}>Maps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <FontAwesome5 name="handshake" size={24} color="black" />
                        </View>
                        <Text style={styles.iconText}>Barters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <Fontisto name="ship" size={24} color="black" />
                        </View>
                        <Text style={styles.iconText}>Ships</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)/More')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <MaterialIcons name="support-agent" size={30} color="black" />
                        </View>
                        <Text style={styles.iconText}>Supporting</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/(tabs)/More')} style={styles.IconCont}>
                        <View style={styles.icon}>
                            <MaterialCommunityIcons name="information-variant" size={30} color="black" />
                        </View>
                        <Text style={styles.iconText}>James</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontFamily: Fonts.family.bold,
        textAlign: 'center',
        marginBottom: 0,
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
    container: {
        position: 'absolute',
        top: 70,
        right: 20,
        justifyContent: 'center',
        width: 130,
    },
    dropdown: {
        height: 50,
        borderColor: Colors.light.background,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.light.background,
        color: Colors.light.background,
        paddingHorizontal: 20,
    },
    IconCont: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: Colors.light.background,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    icon: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'rgba(0, 255, 247, 0.35)',
        color: Colors.light.tint,
        borderWidth: 1,
        borderColor: Colors.light.tint,
        marginBottom: 5,
    },
    iconText: {
        fontSize: 16,
        fontFamily: Fonts.family.medium,
        color: Colors.light.tint,
        textAlign: 'center',
    }
})