import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList, ImageBackground, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useDataContext, Unit } from '@/components/context/DataContext'
import Units from '@/components/Data/Units'

export default function Home() {
  const [filter, setFilter] = useState('')
  const { units, projects, developers, zones } = useDataContext()


  const lengthOfTypeUnits = (type: any) => {
    const unitsType = units?.filter((unit) => {
      const matchedType = unit.type === type

      return matchedType
    })

    const unitsLength = unitsType?.length
    return unitsLength
  }

  const posters = [
    {
      image: require('@/assets/images/chatposter.png'),
      name: 'Chat Bot Ai',
      operationLink: '/(Ai)'
    },
    {
      image: require('@/assets/images/calcposter.png'),
      name: 'Calc Ai',
      operationLink: '/(Ai)/CalcAi'
    }
  ]

  const Maps = [
    {
      name: 'North Coast',
      image: require('@/assets/images/maps/ncMap.png'),
      zone: 'North Coast'
    },
    {
      name: 'Red Sea',
      image: require('@/assets/images/maps/RedMap.png'),
      zone: 'Red Sea'
    },
    {
      name: 'Alexandria',
      image: require('@/assets/images/maps/AlexMap.png'),
      zone: 'Alexandria'
    },
    {
      name: 'Cairo',
      image: require('@/assets/images/maps/cairoMap.png'),
      zone: 'Cairo'
    },
  ]

  const typeOfUnits = [
    {
      name: 'Apartment',
      image: require('@/assets/images/typesOfUnits/appartment.png'),
      quantity: lengthOfTypeUnits('شقة'),
      type: 'شقة'
    },
    {
      name: 'Chalet',
      image: require('@/assets/images/typesOfUnits/chalet.png'),
      quantity: lengthOfTypeUnits('شالية'),
      type: 'شالية'
    },
    {
      name: 'Duplex',
      image: require('@/assets/images/typesOfUnits/duplex.png'),
      quantity: lengthOfTypeUnits('دوبلكس'),
      type: 'دوبلكس'
    },
    {
      name: 'Studio',
      image: require('@/assets/images/typesOfUnits/studio.png'),
      quantity: lengthOfTypeUnits('ستوديو'),
      type: 'ستوديو'
    },
    {
      name: 'Townhouse',
      image: require('@/assets/images/typesOfUnits/townhouse.png'),
      quantity: lengthOfTypeUnits('تاون هاوس'),
      type: 'تاون هاوس'
    },
    {
      name: 'Twinhouse',
      image: require('@/assets/images/typesOfUnits/twinhouse.png'),
      quantity: lengthOfTypeUnits('توين هاوس'),
      type: 'توين هاوس'
    },
    {
      name: 'Loft',
      image: require('@/assets/images/typesOfUnits/loft.png'),
      quantity: lengthOfTypeUnits('لوفت'),
      type: 'لوفت'
    },
    {
      name: 'Pent House',
      image: require('@/assets/images/typesOfUnits/penthouse.png'),
      quantity: lengthOfTypeUnits('بنتهاوس'),
      type: 'بنتهاوس'
    },
    {
      name: 'Cabin',
      image: require('@/assets/images/typesOfUnits/cabin.png'),
      quantity: lengthOfTypeUnits('كابينة'),
      type: 'كابينة'
    },
    {
      name: 'Retail',
      image: require('@/assets/images/typesOfUnits/retail.png'),
      quantity: lengthOfTypeUnits('تجاري'),
      type: 'تجاري'
    },
    {
      name: 'Office',
      image: require('@/assets/images/typesOfUnits/office.png'),
      quantity: lengthOfTypeUnits('إداري'),
      type: 'إداري'
    },
    {
      name: 'Clinic',
      image: require('@/assets/images/typesOfUnits/clinic.png'),
      quantity: lengthOfTypeUnits('عيادة'),
      type: 'عيادة'
    },
  ]

  // I want to get the best offer in units to recommend it to visitors
  const recommendedUnits = units?.filter((unit: Unit) => {
    const matchedPrice = Number(+unit.startBudget) <= 10000000
    const matchedArea = Number(+unit.area) >= 100
    const matchedRooms = Number(+unit.bedrooms) >= 2
    const matchedType = unit.type === 'شقة' || unit.type === 'دوبلكس' || unit.type === 'تاون هاوس' || unit.type === 'توين هاوس' || unit.type === 'لوفت' || unit.type === 'بنتهاوس' || unit.type === 'شالية'
    const checkPaymentPlansExist = unit.paymentPlans?.length > 0
    return matchedPrice && matchedArea && matchedRooms && matchedType && checkPaymentPlansExist
  })

  if (!units || !projects || !developers || !zones) {
    return <Text>Loading...</Text>
  } else {


    return (
      <>
        <View style={styles.header}>
          <Image source={require('@/assets/images/logo.png')} style={{ width: 30, height: 50, margin: 10 }} />
          <View style={[ConstantStyles.inputsCont, { width: '70%' }]}>
            <Ionicons name="search-circle-sharp" size={30} color='gray' />
            <TextInput
              onFocus={() => {
                router.push('/(Search)')
                Keyboard.dismiss()
              }}
              style={ConstantStyles.inputs}
              placeholder="North Coast, Mountain View"
              placeholderTextColor={'gray'}
              autoFocus={false}
              focusable={false}
              value={filter}
              onChangeText={(e) => setFilter(e)}
            />
          </View>
          <TouchableOpacity style={ConstantStyles.IconButton} onPress={() => router.push('/(Search)/filterData')}>
            <AntDesign name="filter" size={22} color={Colors.light.tint} />
          </TouchableOpacity>
        </View>
        <ScrollView style={ConstantStyles.scrollViewTag}>

          {/* Units Type */}
          <FlatList
            data={typeOfUnits}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, ind) => String(ind)}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.centerEle} onPress={() => router.navigate({
                pathname: '/(Search)/SearchResults',
                params: {
                  searchFilter: item.name,
                  type: item.type,
                }
              })}>
                <Image source={item.image} style={styles.iconUnit} />
                <Text style={{
                  fontFamily: Fonts.family.bold,
                  fontSize: 16,
                  marginTop: 1,
                  color: Colors.light.tint
                }}>{item.name}</Text>
                <Text style={styles.lengthSign}>{item.quantity}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Posters */}
          <FlatList
            data={posters}
            horizontal
            keyExtractor={(item, ind) => String(ind)}
            style={{ marginVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => router.push({
                pathname: item.operationLink as any
              })}>
                <Image source={item.image} style={styles.posters} />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />

          <FlatList
            data={developers.slice(0, 10)}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
            keyExtractor={(item, ind) => ind.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push({
                pathname: '/(Developers)/developer',
                params: { developer: JSON.stringify(item) }
              })}>
                <Image source={{ uri: `${item.image}` }} style={{ width: 100, height: 100, borderRadius: 50 }} />
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity style={{ margin: 10, width: 100, height: 100, borderRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.light.tint }} onPress={() => router.push('/(Developers)')}>
                <Text style={{ color: Colors.light.background, fontFamily: Fonts.family.bold, fontSize: 20 }}>More</Text>
              </TouchableOpacity>
            )}

          />

          {/* Maps */}
          <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10
          }}>
            {Maps && Maps.map((map, ind) => (
              <TouchableOpacity key={ind} style={{ width: '100%' }} onPress={() => router.push({
                pathname: '/(Maps)/zone',
                params: { zone: map.zone }
              })}>
                <Image source={map.image} style={styles.maps} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Recommended Units */}
          <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10
          }}>
            <Text style={{
              fontFamily: Fonts.family.bold,
              fontSize: 24,
              color: Colors.light.tint,
              marginVertical: 10,
              textAlign: 'left',
              width: '100%',

            }}>Recommended Units</Text>
            {recommendedUnits && <Units units={recommendedUnits} />}
          </View>
        </ScrollView>
      </>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.light.background,
  },
  OffersBanner: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  centerEle: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f1f8fb',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: 'center',
    position: 'relative',
  },
  iconUnit: {
    width: 60,
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lengthSign: {
    position: 'absolute',
    fontFamily: Fonts.family.regular,
    color: Colors.light.background,
    width: 25,
    height: 25,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    fontSize: 12,
    top: -5,
    right: -5,
  },
  posters: {
    width: 300,
    height: 170,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 10,
    backgroundColor: '#f1f8fb'
  },
  maps: {
    width: '100%',
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: '#f1f8fb'
  },

})