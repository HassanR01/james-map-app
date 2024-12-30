import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Project, useDataContext } from '@/components/context/DataContext'
import { ConstantStyles } from '@/constants/Styles'
import ImagesSlider from '@/components/views/ImagesSlider'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'


export default function ProjectScreen() {
  const { projectString } = useLocalSearchParams<{ projectString: string }>()
  const [project, setProject] = useState<Project>(projectString ? JSON.parse(projectString) : null)

  const { projects, developers, units, zones } = useDataContext()


  if (!project || !projects || !developers || !units || !zones) {
    return
  } else {
    const developerOfProject = developers?.find(developer => developer.name === project?.developer)

    const lengthOfDeveloperProjects = projects?.filter(project => project.developer === developerOfProject?.name).length
    const lengthOfDeveloperUnits = units?.filter(unit => unit.developer === developerOfProject?.name).length
    const projectUnits = units?.filter(unit => unit.project === project.title)



    return (
      <>
        <Stack.Screen
          options={{
            title: project.title,
            headerShown: true,
            headerStyle: { backgroundColor: Colors.light.background },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
          }}
        />
        <ScrollView style={[ConstantStyles.scrollViewTag, {paddingBottom: 20}]}>
          <ImagesSlider images={project.images} />
          <View style={styles.projectInfo}>
            <Text style={[ConstantStyles.h1, { fontSize: 20, marginHorizontal: 5 }]}>{project.title} - {project.zone}</Text>
            <Text style={ConstantStyles.text}>Start Price: {project.startBudget.toLocaleString()} EGP</Text>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }} onPress={() => router.push({
              pathname: '/(Developers)/developer',
              params: {
                developer: JSON.stringify(developerOfProject)
              }
            })}>
              <Image source={{ uri: developerOfProject?.image }} style={{ width: 50, height: 50, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark.background }} />
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginHorizontal: 10 }}>
                <Text style={[ConstantStyles.h3, { fontSize: 16, fontFamily: Fonts.family.bold }]}>{developerOfProject?.name}</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: 'gray' }]}>{lengthOfDeveloperProjects} project - {lengthOfDeveloperUnits} unit</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* payment Plans */}
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
            <View style={[styles.line, {width: '28%'}]} />
            <Text style={{ color: Colors.light.text, fontSize: 18, fontFamily: Fonts.family.medium }}>Payment Plans</Text>
            <View style={[styles.line, {width: '28%'}]} />
          </View>

          {project.paymentPlans && project.paymentPlans.map((plan, index) => (
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              backgroundColor: Colors.light.icon,
              borderRadius: 10,
              
              borderBottomWidth: 0.5,
            }} key={index}>
              <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.background }]}>{plan.downpayment}%</Text>
              <Text style={[ConstantStyles.text, { fontSize: 14, color: Colors.light.background }]}>{plan.payYears} years</Text>
            </View>
          ))}

          {/* project Description */}
        

          {/* project Units */}

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
            <View style={styles.line} />
            <Text style={{ color: Colors.light.text, fontSize: 18, fontFamily: Fonts.family.medium }}>{projectUnits.length} Units</Text>
            <View style={styles.line} />
          </View>

          {projectUnits && projectUnits.map((unit, index) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/(Units)/unit',
                params: {
                  unitString: JSON.stringify(unit)
                }
              })}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 10,
                backgroundColor: Colors.light.background,
                borderRadius: 10,
                borderBottomColor: Colors.light.tint,
                borderBottomWidth: 0.5,
              }}
              key={index}
            >
              <Image source={{ uri : `${unit.images[0]}`}} style={{ width: 50, height: 50, borderRadius: 10 }} />
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '80%',
              }}>
                <Text style={[ConstantStyles.h3, { fontSize: 16, fontFamily: Fonts.family.bold, textAlign: 'left' }]}>{unit.title.split(' ').slice(0, 12).join(' ')}..</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: 'gray' }]}>{unit.title.split(' ')[0]} - {unit.area} m²</Text>
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  line: {
    height: 0.5,
    backgroundColor: '#333366',
    width: '35%',
    marginVertical: 20,
  }
})