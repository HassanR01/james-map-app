import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useDataContext } from '@/components/context/DataContext'
import LoadingPage from '@/components/views/LoadingPage'
import { ScrollView } from 'react-native'
import Units from '@/components/Data/Units'
import { ConstantStyles } from '@/constants/Styles'

export default function Developer() {
  const { developer } = useLocalSearchParams()
  const [developerHear] = useState(typeof developer === 'string' ? JSON.parse(developer) : null)
  const [DataToShow, setDataToShow] = useState('projects')
  const { units, projects } = useDataContext()

  if (!units || !projects || !developerHear) {
    return <LoadingPage />

  } else {

    const developerProjects = projects.filter(project => project.developer === developerHear.name)
    const developerUnits = units.filter(unit => unit.developer === developerHear.name)


    return (
      <>
        <Stack.Screen options={{ title: developerHear.name }} />
        <View style={{ backgroundColor: Colors.light.background, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 20 }}>
          <Image source={{ uri: developerHear.image }} style={{ width: 100, height: 100, borderRadius: 100, marginBottom: 10 }} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <TouchableOpacity onPress={() => setDataToShow('projects')} style={{ borderBottomColor: DataToShow === 'projects' ? Colors.light.tint : Colors.light.background, borderBottomWidth: 5, padding: 10, marginHorizontal: 5, width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: Colors.light.tint, fontSize: 18 }}>{developerProjects.length} Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDataToShow('units')} style={{ borderBottomColor: DataToShow === 'units' ? Colors.light.tint : Colors.light.background, borderBottomWidth: 5, padding: 10, marginHorizontal: 5, width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: Colors.light.tint, fontSize: 18 }}>{developerUnits.length} Units</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={ConstantStyles.scrollViewTag}>
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.light.background,
          }}>

          {DataToShow === 'projects' && developerProjects.map(project => (
            <View key={project._id} style={styles.card}>
              <View style={styles.imageBg}>
                <Image source={{ uri: project.images[0] }} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
                <View style={styles.blackg}>
                  <Text style={{ color: Colors.light.background, fontSize: 18, fontFamily: 'Fustat-Bold' }}>{project.title}</Text>
                  <Text style={{ color: Colors.light.background, fontSize: 14, fontFamily: 'Fustat-Medium' }}>{project.startBudget.toLocaleString()} EGP</Text>
                </View>
              </View>
            </View>
          ))}
          </View>
          <View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.light.background,
          }}>
            {DataToShow === 'units' && (
              <Units units={developerUnits} />
            )}
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: Dimensions.get('window').width - 20,
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: "#ccc"
  },
  imageBg: {
    width: '100%',
    height: 200,
    backgroundColor: "#f1f8fb",
    overflow: 'hidden',
    position: 'relative',
  },
  blackg: {
    height: 150,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  h3: {
    textAlign: 'left',
    fontSize: 18,
    color: Colors.light.tint,
    fontFamily: 'Fustat-Bold',
  },
  h4: {
    textAlign: 'left',
    fontSize: 14,
    color: Colors.light.tint,
    fontFamily: 'Fustat-Medium',
  }
})