import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ConstantStyles } from '@/constants/Styles'
import { Fonts } from '@/constants/Fonts'
import { Colors } from '@/constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

export default function FilterData() {
  const [filterUnitType, setFilterUnitType] = useState('')
  const [filterUnitPrice, setFilterUnitPrice] = useState({ min: '', max: '' })
  const [filterUnitArea, setFilterUnitArea] = useState({ min: '', max: '' })
  const [filterUnitRooms, setFilterUnitRooms] = useState('')
  const [filterUnitBaths, setFilterUnitBaths] = useState('')
  const [filterDeliveryDate, setFilterDeliveryDate] = useState('')


  const typeOfUnits = [
    {
      name: 'Apartment',
      image: require('@/assets/images/typesOfUnits/appartment.png'),
      type: 'شقة'
    },
    {
      name: 'Chalet',
      image: require('@/assets/images/typesOfUnits/chalet.png'),
      type: 'شالية'
    },
    {
      name: 'Duplex',
      image: require('@/assets/images/typesOfUnits/duplex.png'),
      type: 'دوبلكس'
    },
    {
      name: 'Studio',
      image: require('@/assets/images/typesOfUnits/studio.png'),
      type: 'ستوديو'
    },
    {
      name: 'Townhouse',
      image: require('@/assets/images/typesOfUnits/townhouse.png'),
      type: 'تاون هاوس'
    },
    {
      name: 'Twinhouse',
      image: require('@/assets/images/typesOfUnits/twinhouse.png'),
      type: 'توين هاوس'
    },
    {
      name: 'Loft',
      image: require('@/assets/images/typesOfUnits/loft.png'),
      type: 'لوفت'
    },
    {
      name: 'Pent House',
      image: require('@/assets/images/typesOfUnits/penthouse.png'),
      type: 'بنتهاوس'
    },
    {
      name: 'Cabin',
      image: require('@/assets/images/typesOfUnits/cabin.png'),
      type: 'كابينة'
    },
    {
      name: 'Retail',
      image: require('@/assets/images/typesOfUnits/retail.png'),
      type: 'تجاري'
    },
    {
      name: 'Office',
      image: require('@/assets/images/typesOfUnits/office.png'),
      type: 'إداري'
    },
    {
      name: 'Clinic',
      image: require('@/assets/images/typesOfUnits/clinic.png'),
      type: 'عيادة'
    },
  ]

  const HandleSearchResults = () => {
    const filter = {
      type: filterUnitType,
      minPrice: filterUnitPrice.min,
      maxPrice: filterUnitPrice.max,
      minArea: filterUnitArea.min,
      maxArea: filterUnitArea.max,
      bedRooms: filterUnitRooms,
      bathRooms: filterUnitBaths,
      deliveryDate: filterDeliveryDate,
    }
    router.push({
      pathname: '/(Search)/SearchResults',
      params: {
        filter: JSON.stringify(filter)
      }
    })
  }

  return (
    <>
      <ScrollView style={[ConstantStyles.scrollViewTag]}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Data</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}

            style={{
              width: '100%',

            }}
          >
            {typeOfUnits.map((unit, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  display: 'flex',
                  margin: 10,
                  padding: 10,
                  height: 100,
                  width: 110,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: filterUnitType === unit.type ? '#c1e8ff' : '#f2f2f2',
                }}
                onPress={() => setFilterUnitType(unit.type)}
              >
                <Image source={unit.image} style={{ width: 50, height: 50 }} />
                <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>{unit.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Price</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={[ConstantStyles.text, { textAlign: 'left', marginRight: 5 }]}>From:</Text>
              <TextInput
                style={[styles.input, { marginRight: 10 }]}
                keyboardType="numeric"
                placeholder="Min Price"
                placeholderTextColor={'gray'}
                value={filterUnitPrice.min}
                onChangeText={(text) => setFilterUnitPrice({ ...filterUnitPrice, min: text })}
              />
            </View>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={[ConstantStyles.text, { textAlign: 'left', marginRight: 5 }]}>To:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Max Price"
                placeholderTextColor={'gray'}
                value={filterUnitPrice.max}
                onChangeText={(text) => setFilterUnitPrice({ ...filterUnitPrice, max: text })}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Area</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <Text style={[ConstantStyles.text, { textAlign: 'left', marginRight: 5 }]}>From:</Text>
              <TextInput
                style={[styles.input, { marginRight: 10 }]}
                keyboardType="numeric"
                placeholder="Min Area"
                placeholderTextColor={'gray'}
                value={filterUnitArea.min}
                onChangeText={(text) => setFilterUnitArea({ ...filterUnitArea, min: text })}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
              <Text style={[ConstantStyles.text, { textAlign: 'left', marginRight: 5 }]}>To:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Max Area"
                placeholderTextColor={'gray'}
                value={filterUnitArea.max}
                onChangeText={(text) => setFilterUnitArea({ ...filterUnitArea, max: text })}
              />
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Rooms</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, display: 'flex', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '1' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('1')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>1 Room</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '2' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('2')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2 Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '3' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('3')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>3 Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '4' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('4')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>4 Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '5' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('5')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>5 Rooms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitRooms === '6' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitRooms('6')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>6 Rooms</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingVertical: 10 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Baths</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, display: 'flex', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '1' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('1')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>1 Bath</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '2' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('2')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2 Baths</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '3' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('3')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>3 Baths</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '4' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('4')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>4 Baths</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '5' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('5')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>5 Baths</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterUnitBaths === '6' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterUnitBaths('6')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>6 Baths</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingVertical: 10, marginBottom: 100 }}>
          <Text style={[ConstantStyles.h2, { textAlign: 'left' }]}>Filter Delivery Date</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, display: 'flex', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === 'Delivered' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('Delivered')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>Delivered</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === '2025' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('2025')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2025</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === '2026' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('2026')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2026</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === '2027' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('2027')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2027</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === '2028' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('2028')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2028</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
                borderRadius: 10,
                width: 100,
                backgroundColor: filterDeliveryDate === '2029' ? '#c1e8ff' : '#f2f2f2',
              }}
              onPress={() => setFilterDeliveryDate('2029')}
            >
              <Text style={[ConstantStyles.text, { textAlign: 'center', fontFamily: Fonts.family.bold, width: '100%' }]}>2029</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
      {/* Search Button */}
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: "absolute",
          bottom: 0,
          left: 0,
          padding: 10,
          marginBottom: 0,
          height: 100,
          backgroundColor: Colors.light.background
        }}
      >
        <TouchableOpacity
          style={{
            width: '95%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.light.tint,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => HandleSearchResults()}
        >
          <AntDesign name="filter" size={30} color={Colors.light.background} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', fontFamily: Fonts.family.bold }}>Filter Units</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 5,
  }
})