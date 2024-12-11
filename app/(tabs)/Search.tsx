import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useDataContext } from '@/components/context/DataContext'

export default function Search() {
  const [filter, setFilter] = useState('')
   
  const { projects, units } = useDataContext()

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

      <ScrollView style={ConstantStyles.scrollViewTag}>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.light.background,
        }}>
          {FilteredProjects.length > 0 ? (
            <>
              {FilteredProjects && FilteredProjects.map((project, index) => (
                <View key={index}>
                  <Text>{project.title}</Text>
                </View>
              ))}
            </>
          ): (
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },

})
