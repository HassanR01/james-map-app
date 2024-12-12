import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ConstantStyles } from '@/constants/Styles'

export default function CalcAi() {
    return (
        <ScrollView

            style={[ConstantStyles.scrollViewTag]}
        >
            <View style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: Dimensions.get('screen').height,
            }}>
                <Text>Test</Text>
            </View>
            <Text>CalcAi</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})