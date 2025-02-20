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
    const { units } = useDataContext()

    const results = units ? units.filter(unit => {
        const checkPaymentPlansExist = unit.paymentPlans?.length > 0
        const checkUnitType = unit.type === type
        return checkPaymentPlansExist && checkUnitType
    }) : []

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