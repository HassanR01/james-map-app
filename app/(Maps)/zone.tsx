import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function MapZone() {
  const { coordinates } = useLocalSearchParams()
  const coords = typeof coordinates === 'string' ? JSON.parse(coordinates) : null

  if (!coords) {
    return (
      <View>
        <Text>Zone not found</Text>
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
            latitude: coords[0],
            longitude: coords[1],
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0421,
          }}
          // make it horizontal and zoomed in
          initialCamera={{
            center: {
              latitude: coords[0],
              longitude: coords[1],
            },
            pitch: 0,
            heading: coords[0] === 31.032901117975193 ? -90: 0, // Rotate the map 90 degrees to make north on the west side
            altitude: 300000,
            zoom: 2,
          }}
        >
          <Marker
            coordinate={{
              latitude: coords[0],
              longitude: coords[1],
            }}
            title="Zone"
            description="This is the zone"
            pointerEvents='box-only'
            pinColor='blue'
          />
        </MapView>

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