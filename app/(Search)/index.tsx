import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ConstantStyles } from '@/constants/Styles'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function Search() {
    const [filter, setFilter] = useState('')

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
                        enablesReturnKeyAutomatically
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
