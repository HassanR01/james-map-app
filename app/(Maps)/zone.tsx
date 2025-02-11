import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Project, useDataContext } from '@/components/context/DataContext';
import { Fonts } from '@/constants/Fonts';


export default function MapZone() {
  const { coordinates } = useLocalSearchParams()
  const coords = typeof coordinates === 'string' ? JSON.parse(coordinates) : null
  const [selectedLocation, setSelectedLocation] = useState<Project | null>()
  const { projects } = useDataContext()


  if (!coords || !projects) {
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
            heading: coords[0] === 31.032901117975193 ? -90 : 0, // Rotate the map 90 degrees to make north on the west side
            altitude: 300000,
            zoom: 2,
          }}
        >

          {projects.map((project, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  latitude: project.location[0],
                  longitude: project.location[1],
                }}
                pinColor='red'
                onPress={() => setSelectedLocation(project)}
              />
            )
          })}

        </MapView>

        {selectedLocation && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={true}
            onRequestClose={() => setSelectedLocation(null)}
          >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <TouchableOpacity
                style={{ flex: 1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                onPress={() => setSelectedLocation(null)}
              >
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  margin: 20,
                  borderRadius: 10,
                }}
              >
                <Image source={{ uri: selectedLocation.images[0] }} style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 10 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{selectedLocation.title}</Text>
                <Text style={{ color: 'gray', fontSize: 16 }}>Deliver: {selectedLocation.deliver}</Text>
                <Text style={{ color: 'gray', fontSize: 16 }}>{selectedLocation.developer} - { selectedLocation.highScaleEn}</Text>
                <Text style={{ marginTop: 5 }}>{selectedLocation.descriptionEn.slice(0, 100)}..</Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#2196F3',
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    router.navigate({
                      pathname: '/(Projects)/Project',
                      params: {
                        projectString: JSON.stringify(selectedLocation),
                      }
                    })
                    setSelectedLocation(null)
                  }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', fontFamily: Fonts.family.bold }}>Explor Project</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

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