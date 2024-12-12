import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useDataContext } from '@/components/context/DataContext'
import { Fonts } from '@/constants/Fonts'

export default function Search() {
  const [filter, setFilter] = useState('')

  const { projects, units } = useDataContext()

  const UnitLengthInProject = (project: string) => {
    const unitsInProject = units?.filter(unit => unit.project === project)
    return unitsInProject?.length
  }

  const FilteredProjects = projects ? projects.filter(project => {
    if (!project.title || !project.titleAr || !project.zone || !project.developer || !project.paymentPlans) {
      return false
    }
    const checkPaymentPlansExist = project.paymentPlans?.length > 0
    const checkProjectName = project.title.toLowerCase().includes(filter.toLowerCase())
    const checkProjectNameAr = project.titleAr.toLowerCase().includes(filter.toLowerCase())
    const checkProjectZone = project.zone.toLowerCase().includes(filter.toLowerCase())
    const matchedDeveloper = project.developer.toLowerCase().includes(filter.toLowerCase())
    return checkPaymentPlansExist && (checkProjectName || checkProjectNameAr || checkProjectZone || matchedDeveloper)
  }) : []


  return (
    <>
      <View style={styles.header}>
        <View style={[ConstantStyles.inputsCont, { width: '85%' }]}>
          <Ionicons name="search-circle-sharp" size={30} color='gray' />
          <TextInput
            placeholder="North Coast, Mountain View"
            placeholderTextColor={'gray'}
            style={ConstantStyles.inputs}
            autoFocus={true}
            focusable={true}
            value={filter}
            onChangeText={(e) => setFilter(e)}
          />
        </View>
        <TouchableOpacity style={ConstantStyles.IconButton} onPress={() => router.push('/(Search)/filterData')}>
          <AntDesign name="filter" size={22} color={Colors.light.tint} />
        </TouchableOpacity>

      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.light.background, paddingVertical: 10 }}>
        <Text style={{ fontSize: 18, fontFamily: Fonts.family.medium, color: 'gray', marginHorizontal: 10 }}>Projects: {FilteredProjects.length}</Text>
      </View>

      <ScrollView style={ConstantStyles.scrollViewTag}>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.light.background,
          width: '100%',
        }}>
          {FilteredProjects.length > 0 ? (
            <>
              {FilteredProjects && FilteredProjects.map((project, index) => (
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: '/(Projects)/Project',
                    params: {
                      projectString: JSON.stringify(project),
                    }
                  })}
                  style={styles.item}
                  key={index}
                >
                  {project.images?.[0] && (
                    <Image source={{ uri: `${project.images[0]}` }} style={{ width: 50, height: 50, borderRadius: 10 }} />
                  )}
                  <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                    <Text style={styles.itemText}>{project.title}</Text>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: Fonts.family.medium,
                      color: 'gray',
                      marginHorizontal: 10,
                    }}>{UnitLengthInProject(project.title)} Units</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
            </>
          )}
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background,
    paddingVertical: 10,
  },
  item: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
    fontFamily: Fonts.family.medium,
    color: Colors.light.tint,
    marginHorizontal: 10,
  }
})
