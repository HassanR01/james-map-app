import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { Project, useDataContext } from '@/components/context/DataContext'
import { ConstantStyles } from '@/constants/Styles'
import ImagesSlider from '@/components/views/ImagesSlider'
import { Colors } from '@/constants/Colors'
import { Fonts } from '@/constants/Fonts'
import { Ionicons } from '@expo/vector-icons'
import YoutubeIframe from 'react-native-youtube-iframe';


export default function ProjectScreen() {
  const { projectString } = useLocalSearchParams<{ projectString: string }>()
  const [project, setProject] = useState<Project>(projectString ? JSON.parse(projectString) : null)
  const [openMasterPlan, setOpenMasterPlan] = useState(false)
  const [openVideo, setOpenVideo] = useState(false)

  const { projects, developers, units, zones } = useDataContext()


  if (!project || !projects || !developers || !units || !zones) {
    return
  } else {
    const developerOfProject = developers?.find(developer => developer.name === project?.developer)

    const lengthOfDeveloperProjects = projects?.filter(project => project.developer === developerOfProject?.name).length
    const lengthOfDeveloperUnits = units?.filter(unit => unit.developer === developerOfProject?.name).length
    const projectUnits = units?.filter(unit => unit.project === project.title)

    const MonthlyPayment = (project: any) => {
      const plan = project.paymentPlans[0]
      const downpayment = project.startBudget * (plan.downpayment / 100)
      const remaining = project.startBudget - downpayment
      const years = plan.payYears
      const monthly = remaining / (years * 12)
      return monthly.toLocaleString()
    }

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
        <ScrollView style={[ConstantStyles.scrollViewTag, { paddingBottom: 20 }]}>
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
            <TouchableOpacity onPress={() => setOpenMasterPlan(true)} style={{
              borderWidth: 1,
              borderColor: Colors.light.tint,
              width: '45%',
              padding: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
              <Text style={{ fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.tint }}>Master Plan</Text>
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

          {project.paymentPlans && project.paymentPlans.map((plan, index) => (
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: 10,
              backgroundColor: plan.status === 'offer' ? Colors.light.text2 : Colors.light.icon,
              borderRadius: 10,
              marginBottom: 10,
            }} key={index}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.background, marginHorizontal: 5 }]}>{plan.downpayment}%</Text>
                <Text style={[ConstantStyles.text, { fontSize: 14, color: Colors.light.background }]}>/ {plan.payYears} years</Text>
              </View>
              <View>
                <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.bold, color: Colors.light.background, marginHorizontal: 5 }]}>{MonthlyPayment(project)} EGP</Text>
              </View>
            </View>
          ))}

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
          <Text style={[ConstantStyles.text, { fontSize: 16, fontFamily: Fonts.family.regular, marginHorizontal: 10 }]}>{project.descriptionEn}</Text>


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
              <Image source={{ uri: `${unit.images[0]}` }} style={{ width: 50, height: 50, borderRadius: 10 }} />
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

        {openMasterPlan && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={openMasterPlan}
            onRequestClose={() => setOpenMasterPlan(false)}
          >
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ width: '90%', height: '90%', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: project.masterPlan }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                <TouchableOpacity onPress={() => setOpenMasterPlan(false)} style={{ position: 'absolute', top: 10, right: 10, width: 50, height: 50, borderRadius: 10, backgroundColor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                  videoId={project.video}
                  height={230}
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