import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';

export default function Unit() {
    const { unitString } = useLocalSearchParams()
    const unit = typeof unitString === 'string' ? JSON.parse(unitString) : null

    if (!unit) {
        return (
            <View>
                <Text>Unit not found</Text>
            </View>
        )
    } else {

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 20,
                        width: 50,
                        height: 50,
                        backgroundColor: 'white',
                        zIndex: 100,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                    }}>
                    <Ionicons name="arrow-back-circle-outline" size={30} color="black" style={{ marginHorizontal: 5 }} />
                </TouchableOpacity>
                <MapView style={styles.map} provider={PROVIDER_DEFAULT}
                    mapType="satellite"
                    initialRegion={{
                        latitude: unit.location[0],
                        longitude: unit.location[1],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    initialCamera={{
                        center: {
                            latitude: unit.location[0],
                            longitude: unit.location[1],
                        },
                        pitch: 0,
                        heading: 0, // Rotate the map 90 degrees to make north on the west side
                        altitude: 300000,
                        zoom: 10,
                    }}
                >
                    <Marker 
                        coordinate={{
                            latitude: unit.location[0],
                            longitude: unit.location[1],
                        }}
                        title={unit.title}
                        pinColor='red'
                        description={unit.description}
                    />
                </MapView>

                <View style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 0,
                    width: '100%',
                    height: 200,
                    padding: 20,
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        position: 'relative',
                        padding: 10,
                        borderRadius: 10,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}>
                        <View style={{
                            width: 135,
                            height: 135,
                        }}>
                            <Image source={{ uri: unit.images[0] }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: 135,
                            marginLeft: 10,
                        }}>
                            <Text style={{ color: 'black', fontSize: 18, fontFamily: 'Fustat-Bold' }}>{unit.title.split(' ').slice(0, 1)} - {unit.area} m²</Text>
                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Fustat-Medium' }}>{unit.startBudget.toLocaleString()} EGP</Text>
                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Fustat-Medium' }}>{unit.bedrooms} Bedrooms</Text>
                            <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Fustat-Medium' }}>{unit.bathrooms} Bathrooms</Text>
                            <TouchableOpacity
                                onPress={() => router.push({
                                    pathname: '/(Units)/unit',
                                    params: {
                                        unitString: JSON.stringify(unit)
                                    }
                                })}
                                style={{
                                    backgroundColor: 'black',
                                    padding: 5,
                                    borderRadius: 5,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '95%',
                                    marginTop: 15,
                                }}>
                                <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Fustat-Medium' }}>More Details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});