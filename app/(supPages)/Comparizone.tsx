import { Dimensions, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { ConstantStyles } from '@/constants/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from '@/components/views/LoadingPage';
import { Unit } from '@/components/context/DataContext';
import { Fonts } from '@/constants/Fonts';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

interface UnitsProps {
    _id: string;
    title: string;
    description: string;
    keywords: string;
    images: string[];
    location: [];
    article: string;
    developer: string;
    zone: string;
    highScale: string;
    project: string;
    type: string;
    startBudget: number;
    deliver: string;
    bathrooms: number;
    bedrooms: number;
    area: number;
    floor: number;
    // App Edits
    titleAr: string;
    descriptionEn: string;
    articleEn: string;
    highScaleEn: string;
    paymentPlans: {
        downpayment: number;
        payYears: number;
        installment: number;
        firstInstallment: number;
        status: string;
        note: string;
    }[];
    video: string;
    layout: string;
    paymentplan: {
        downpayment: number;
        payYears: number;
        installment: number;
        firstInstallment: number;
        status: string;
        note: string;
    };

}[]

export default function Comparizone() {
    const [comparizones, setComparizones] = useState<UnitsProps[]>([]);

    const GetComparizons = async () => {
        const comparizonesExist = await AsyncStorage.getItem("comparisones");
        if (comparizonesExist) {
            setComparizones(JSON.parse(comparizonesExist));
        }
    }
    useEffect(() => {
        GetComparizons();
    }, [])

    if (!comparizones) {
        return <LoadingPage />
    } else {



        return (
            <ScrollView style={ConstantStyles.scrollViewTag}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={GetComparizons}
                    />
                }>

                <ScrollView
                    style={[ConstantStyles.scrollViewTag, { flexGrow: 1, padding: 0 }]}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        comparizones.map((unit, index) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', height: 200 }}>
                                        <Image source={{ uri: unit.images[0] }} style={{ width: '100%', height: 100, borderRadius: 10, marginBottom: 10 }} />
                                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding: 5 }}>
                                            <Text style={{ fontSize: 20, color: '#000', fontFamily: Fonts.family.bold }}>{unit.project}</Text>
                                            <Text style={{ fontSize: 16, color: '#000', fontFamily: Fonts.family.medium }}>{unit.zone}</Text>
                                            <Text style={{ fontSize: 14, color: '#000', fontFamily: Fonts.family.regular }}>{unit.developer}</Text>
                                        </View>
                                    </View>
                                    {/* line */}
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                        <Text style={{ fontSize: 24, marginBottom: 5, color: '#000', fontFamily: Fonts.Arabic.medium }}>{unit.title.split(' ').slice(0, 1).join(' ')}</Text>
                                        <Text style={{ fontSize: 20, color: '#000', fontFamily: Fonts.Arabic.medium }}>{unit.area}  m²</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                        <Text style={{ fontSize: 16, marginBottom: 5, color: '#000', fontFamily: Fonts.family.medium }}>Start price</Text>
                                        <Text style={{ fontSize: 20, color: 'green', fontFamily: Fonts.Arabic.medium }}>{unit.startBudget.toLocaleString()} EGP</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                        <View style={styles.detailsCont}>
                                            <Text style={{ fontSize: 20, marginRight: 5, color: '#000', fontFamily: Fonts.family.medium }}>{unit.bedrooms}</Text>
                                            <FontAwesome name="bed" size={24} color={Colors.light.tint} />
                                        </View>
                                        <View style={styles.detailsCont}>
                                            <Text style={{ fontSize: 20, marginRight: 5, color: '#000', fontFamily: Fonts.family.medium }}>{unit.bathrooms}</Text>
                                            <MaterialIcons name="bathtub" size={24} color={Colors.light.tint} />
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                        <Text style={{ fontSize: 24, color: '#000', fontFamily: Fonts.Arabic.medium }}>{unit.deliver}</Text>
                                        <Text style={{ fontSize: 16, marginBottom: 5, color: '#000', fontFamily: Fonts.family.medium }}>Delivery date</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                        <Text style={{ fontSize: 16, marginBottom: 5, color: '#000', fontFamily: Fonts.family.medium }}>Payment plan</Text>
                                        <Text style={{ fontSize: 12, color: '#000', fontFamily: Fonts.family.medium }}>Down Payment</Text>
                                        <Text style={{ fontSize: 24, color: '#000', fontFamily: Fonts.Arabic.medium }}>{Math.trunc((unit.paymentplan.downpayment / 100) * unit.startBudget).toLocaleString()} EGP</Text>
                                        <Text style={{ fontSize: 12, color: '#000', fontFamily: Fonts.family.medium, marginTop: 5 }}>Monthly Payment</Text>
                                        <Text style={{ fontSize: 24, color: '#000', fontFamily: Fonts.Arabic.medium }}>{Math.trunc((unit.startBudget - ((unit.paymentplan.downpayment / 100) * unit.startBudget)) / (+unit.paymentplan.payYears * 12)).toLocaleString()} EGP</Text>
                                        <Text style={{ fontSize: 12, color: '#000', fontFamily: Fonts.family.medium, marginTop: 5 }}>Installment</Text>
                                        <Text style={{ fontSize: 22, color: '#000', fontFamily: Fonts.Arabic.medium }}>{unit.paymentplan.payYears} Years</Text>
                                    </View>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#000', marginVertical: 20 }} />
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            {/* Unit In Maps , Unit Details , Remove Unit From List */}
                                            <TouchableOpacity style={styles.Icons}>
                                                <MaterialIcons name="location-on" size={24} color={'green'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.Icons} onPress={() => router.push({
                                                pathname: '/(Units)/unit',
                                                params: {
                                                    unitString: JSON.stringify(unit)
                                                }
                                            })}>
                                                <MaterialIcons name='info' size={24} color={Colors.light.tint} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.Icons} onPress={async () => {
                                                const newComparizones = comparizones.filter((unitItem) => unitItem._id !== unit._id);
                                                await AsyncStorage.setItem("comparisones", JSON.stringify(newComparizones));
                                                setComparizones(newComparizones);
                                            }}>
                                                <MaterialIcons name="delete" size={24} color={'red'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>


                                </View>
                            )
                        })
                    }
                </ScrollView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        width: 200,
        backgroundColor: '#f0f0f0',
        margin: 10,
        marginBottom: 30,
        borderRadius: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: Dimensions.get('window').height + 100,
    },
    detailsCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Icons: {
        backgroundColor: Colors.light.background,
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.light.tint,
        marginHorizontal: 5
    },
})