import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { ConstantStyles } from '@/constants/Styles'
import { useDataContext } from '@/components/context/DataContext'
import LoadingPage from '@/components/views/LoadingPage'
import { Fonts } from '@/constants/Fonts'

export default function Index() {
  const { developers, units, projects } = useDataContext()


  if (!developers || !units || !projects) {
    return <LoadingPage />
  } else {

    const getDeveloperProjects = (developerName: string) => {
      const developerProjects = projects?.filter(project => project.developer === developerName)
      return developerProjects
    }

    const getDeveloperUnits = (developerName: string) => {
      const developerUnits = units?.filter(unit => unit.developer === developerName)
      return developerUnits
    }

    return (
      <>
        <Stack.Screen options={{ title: 'Developers' }} />
        <ScrollView style={[ConstantStyles.scrollViewTag]}>
          <View style={{ flex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingVertical: 20 }}>
            {developers.map(developer => (
              <TouchableOpacity
                onPress={() => router.push({
                  pathname: '/(Developers)/developer',
                  params: {
                    developer: JSON.stringify(developer)
                  }
                })}
                key={developer._id} style={{ width: 160, height: 150, padding: 10, margin: 5, borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image source={{ uri: developer.image }} style={{ width: 80, height: 80, borderRadius: 10, backgroundColor: 'gray' }} /> 
                <Text style={{ fontSize: 14, color: '#000', fontFamily: Fonts.family.bold, textAlign: 'center', marginTop: 5 }}>{developer.name.split(' ').slice(0, 2).join(' ')}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, width: '100%' }}>                  
                  <Text style={{ fontSize: 13, color: '#000', fontFamily: Fonts.family.bold, textAlign: 'center' }}>Projects: {getDeveloperProjects(developer.name).length}</Text>
                  <Text style={{ fontSize: 13, color: '#000', fontFamily: Fonts.family.bold, textAlign: 'center' }}>Units: {getDeveloperUnits(developer.name).length}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({})