import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Project, useDataContext } from '@/components/context/DataContext'
import { ConstantStyles } from '@/constants/Styles'
import ImagesSlider from '@/components/views/ImagesSlider'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { FontAwesome, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons'
import YoutubeIframe from 'react-native-youtube-iframe';
import LoadingPage from '@/components/views/LoadingPage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

export default function Unit() {
  const { unitString } = useLocalSearchParams<{ unitString: string }>()
  const [unit, setUnit] = useState(JSON.parse(unitString))
  const [openVideo, setOpenVideo] = useState(false)
  const [openLayout, setOpenLayout] = useState(false)
  const [paymentPlanChoosen, setPaymentPlanChoosen] = useState(Object)

  const { projects, developers, units } = useDataContext()
  if (!unit || !projects || !developers || !units) {
    return <LoadingPage />

  } else {

    const projectOfUnit = projects.find(project => project.title === unit.project)
    const projectUnits = units.filter(unit => unit.project === projectOfUnit?.title)
    const developerOfUnit = developers.find(developer => developer.name === unit.developer)
    const projectsOfDeveloper = projects.filter(project => project.developer === developerOfUnit?.name)
    const lengthOfDeveloperProjects = projects.filter(project => project.developer === developerOfUnit?.name).length
    const lengthOfDeveloperUnits = projects.filter(project => project.developer === developerOfUnit?.name).length

    const ProjectUnits = (project: Project) => {
      const unitsofProject = units.filter(unit => unit.project === project.title)
      return unitsofProject.length
    }

    const MonthlyPayment = (project: any) => {
      const plan = project.paymentPlans[0]
      const downpayment = project.startBudget * (plan.downpayment / 100)
      const remaining = project.startBudget - downpayment
      const years = plan.payYears
      const monthly = remaining / (years * 12)
      return monthly.toLocaleString()
    }

    const addToComparisons = async () => {
      const unitToCompare = { ...unit, paymentplan: paymentPlanChoosen }
      const comparisonsExist = await AsyncStorage.getItem('comparisones')
      if (comparisonsExist) {
        const comparisons = JSON.parse(comparisonsExist)
        if (comparisons.find((unit: any) => unit._id === unitToCompare._id)) {
          Alert.alert('Unit already added to comparisons')
        } else {
          comparisons.push(unitToCompare)
          await AsyncStorage.setItem('comparisones', JSON.stringify(comparisons))
        }
      } else {
        await AsyncStorage.setItem('comparisones', JSON.stringify([unitToCompare]))
      }
    }

    return (
      <>
        <Stack.Screen options={{
          title: unit.title.split(' ').slice(0, 1).join(' '),
          headerShown: true,
          headerStyle: { backgroundColor: Colors.light.background },
          headerTitleStyle: { color: 'black' },
          headerTintColor: 'black',

        }} />
        <ScrollView style={ConstantStyles.scrollViewTag}>
          <ImagesSlider images={unit.images} />
          <View style={styles.projectInfo}>
            <Text style={[ConstantStyles.h1, { fontSize: 20, marginHorizontal: 5, textAlign: 'left' }]}>{unit.title}</Text>
            <Text style={ConstantStyles.text}>Area: {unit.area} m²</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              {/* Unit Data */}
              <Text style={ConstantStyles.text}>
                <FontAwesome name="bed" size={18} style={{ marginRight: 5 }} color={Colors.light.tint} /> Rooms: {unit.bedrooms}</Text>
              <Text style={ConstantStyles.text}>
                <MaterialIcons name="bathtub" size={18} style={{ marginRight: 5 }} color="black" /> Bathrooms: {unit.bathrooms}</Text>
            </View>
            <Text style={ConstantStyles.text}>Start Price: {unit.startBudget.toLocaleString()} EGP</Text>
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }} onPress={() => router.push({
              pathname: '/(Developers)/developer',
              params: {
                developer: JSON.stringify(developerOfUnit)
              }
            })}>
              <Image source={{ uri: developerOfUnit?.image }} style={{ width: 50, height: 50, borderRadius: 10, borderWidth: 1, borderColor: Colors.dark.background }} />
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginHorizontal: 10 }}>
                <Text style={[ConstantStyles.h3, { fontSize: 16, fontFamily: Fonts.family.bold }]}>{developerOfUnit?.name}</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: 'gray' }]}>{lengthOfDeveloperProjects} project - {lengthOfDeveloperUnits} unit</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Video And MasterPlan */}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 10 }}>
            <TouchableOpacity onPress={() => setOpenVideo(true)} style={{
              borderWidth: 1,
              borderColor: Colors.light.tint,
              width: '45%',
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.tint }}>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenLayout(true)} style={{
              borderWidth: 1,
              borderColor: Colors.light.tint,
              width: '45%',
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.tint }}>Layout</Text>
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
            <View style={[styles.line, { width: '28%' }]} />
            <Text style={{ color: Colors.light.text, fontSize: 18, fontFamily: Fonts.family.medium }}>Payment Plans</Text>
            <View style={[styles.line, { width: '28%' }]} />
          </View>
          <Text style={[ConstantStyles.text, {marginBottom: 10}]}>Choose Yours</Text>
          {projectOfUnit?.paymentPlans && projectOfUnit.paymentPlans.map((plan, index) => (
            <TouchableOpacity style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              backgroundColor: JSON.stringify(paymentPlanChoosen) === JSON.stringify(plan) ? Colors.light.tint : plan.status === 'offer' ? Colors.light.text2 : Colors.light.icon,
              borderRadius: 10,
              marginBottom: 10,
            }}
              key={index}
              onPress={() => setPaymentPlanChoosen(plan)}
            >
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.background, marginHorizontal: 5 }]}>{plan.downpayment}%</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: Colors.light.background }]}>/ {plan.payYears} years</Text>
              </View>
              <View>
                <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.background, marginHorizontal: 5 }]}>{MonthlyPayment(projectOfUnit)} EGP</Text>
              </View>
            </TouchableOpacity>
          ))}

          {paymentPlanChoosen?.downpayment && (

            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginVertical: 10 }}>
              <Text style={[ConstantStyles.h3]}>Actions</Text>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', flexWrap: 'wrap', marginVertical: 10 }}>
                <TouchableOpacity style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '45%',
                  padding: 10,
                  backgroundColor: Colors.light.tint,
                  borderRadius: 10,
                  margin: 5
                }}>
                  <Text style={{ fontSize: 16, color: Colors.light.background, fontFamily: Fonts.family.bold }}>Book Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '45%',
                  padding: 10,
                  backgroundColor: Colors.light.icon,
                  borderRadius: 10,
                  margin: 5
                }}>
                  <Text style={{ fontSize: 16, color: Colors.light.background, fontFamily: Fonts.family.bold }}>Download Payment</Text>
                </TouchableOpacity>
                {/* Comparison with other unit */}
                <TouchableOpacity 
                  onPress={addToComparisons}
                  style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '95%',
                  padding: 10,
                  backgroundColor: Colors.light.icon,
                  borderRadius: 10,
                  margin: 5
                }}>
                  <Text style={{ fontSize: 16, color: Colors.light.background, fontFamily: Fonts.family.bold, alignItems: 'center', justifyContent: 'center', display: 'flex' }}><Octicons name="git-compare" size={18} /> Compare with other units</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}


          {/* project Description */}
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
            <View style={styles.line} />
            <Text style={{ color: Colors.light.text, fontSize: 18, fontFamily: Fonts.family.medium }}>Description</Text>
            <View style={styles.line} />
          </View>
          <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.regular, marginHorizontal: 10 }]}>{unit.descriptionEn}</Text>


          {/* projects of Developer */}

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 10,
          }}>
            <View style={styles.line} />
            <Text style={{ color: Colors.light.text, fontSize: 18, fontFamily: Fonts.family.medium }}>{projectsOfDeveloper.length} Projects</Text>
            <View style={styles.line} />
          </View>

          {projectsOfDeveloper && projectsOfDeveloper.map((project, index) => (
            <TouchableOpacity
              onPress={() => router.navigate({
                pathname: '/(Projects)/Project',
                params: {
                  projectString: JSON.stringify(project)
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
              <Image source={{ uri: `${project.images[0]}` }} style={{ width: 50, height: 50, borderRadius: 10 }} />
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '80%',
              }}>
                <Text style={[ConstantStyles.h3, { fontSize: 16, fontFamily: Fonts.family.bold, textAlign: 'left' }]}>{project.title.split(' ').slice(0, 12).join(' ')}..</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: 'gray' }]}>{developerOfUnit?.name} - {ProjectUnits(project)} units</Text>
              </View>
            </TouchableOpacity>
          ))}

        </ScrollView>

        {openLayout && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={openLayout}
            onRequestClose={() => setOpenLayout(false)}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ width: '90%', height: '90%', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: unit.layout }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                <TouchableOpacity onPress={() => setOpenLayout(false)} style={{ position: 'absolute', top: 10, right: 10, width: 50, height: 50, borderRadius: 10, backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'white', fontFamily: Fonts.family.bold }}>
                    <Ionicons name="close-outline" size={30} color="white" />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        {openVideo && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={openVideo}
            onRequestClose={() => setOpenVideo(false)}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <YoutubeIframe
                  play={true}
                  videoId={unit.video}
                  height={200}
                  width={Dimensions.get('window').width - 40}
                  webViewStyle={{ borderRadius: 10 }}
                />

              </View>
              <TouchableOpacity onPress={() => setOpenVideo(false)} style={{ position: 'absolute', top: 50, right: 20, width: 50, height: 50, borderRadius: 10, backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white', fontFamily: Fonts.family.bold }}>
                  <Ionicons name="close-outline" size={30} color="white" />
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
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