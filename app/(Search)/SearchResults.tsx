import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useDataContext } from '@/components/context/DataContext'
import { Colors } from '@/constants/Colors'
import { ConstantStyles } from '@/constants/Styles'
import Units from '@/components/Data/Units'

export default function SearchResults() {
    const { filter } = useLocalSearchParams()
    const type = typeof filter === 'string' ? JSON.parse(filter).unittype : null
    const minPice = typeof filter === 'string' ? JSON.parse(filter).minPrice : null
    const maxPrice = typeof filter === 'string' ? JSON.parse(filter).maxPrice : null
    const minArea = typeof filter === 'string' ? JSON.parse(filter).minArea : null
    const maxArea = typeof filter === 'string' ? JSON.parse(filter).maxArea : null
    const bedRooms = typeof filter === 'string' ? JSON.parse(filter).bedRooms : null
    const bathRooms = typeof filter === 'string' ? JSON.parse(filter).bathRooms : null
    const DeliveryDate = typeof filter === 'string' ? JSON.parse(filter).deliveryDate : null
    const { units } = useDataContext()

    const results = units ? units.filter(unit => {
        const matchedType = type ? unit.type === type : true
        const matchedPriceRange = minPice && +maxPrice ? +unit.startBudget >= +minPice && +unit.startBudget <= +maxPrice : true
        const matchedAreaRange = minArea && +maxArea ? +unit.area >= +minArea && +unit.area <= +maxArea : true
        const matchedBedRooms = +bedRooms ? +unit.bedrooms === +bedRooms : true
        const matchedBathRooms = +bathRooms ? +unit.bathrooms === +bathRooms : true
        const matchedDeliveryDate = DeliveryDate ? unit.deliver === DeliveryDate : true
        return matchedType && matchedPriceRange && matchedAreaRange && matchedBedRooms && matchedBathRooms && matchedDeliveryDate
    }) : []

    if (results.length === 0) {
        return (
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.light.background,
                height: '100%',
            }}>
                <Text style={[ConstantStyles.h2, { textAlign: 'center' }]}>No Results Found</Text>
            </View>
        )
    }

    return (
        <ScrollView style={ConstantStyles.scrollViewTag}>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.light.background,
            }}>
                <Units units={results} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})