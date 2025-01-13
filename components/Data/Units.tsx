import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useDataContext } from '../context/DataContext';
import { router } from 'expo-router';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';

interface UnitsProps {
    units: {
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
    }[];
}

const Units: React.FC<UnitsProps> = ({ units }) => {
    const { developers } = useDataContext();

    const getDeveloperImage = (developerName: string): string | undefined => {
        const developer = developers?.find(dev => dev.name === developerName);
        return developer?.image as string;
    };

    const calculateMonthlyPayment = (downPayment: number, payYears: number, startBudget: number): number => {
        const totalWithoutDP = startBudget - (startBudget * (downPayment / 100));
        const monthlyPayment = Math.trunc(totalWithoutDP / payYears / 12);
        return monthlyPayment;
    };

    const UnitsRight = units.filter(unit => {
        const haveDownpayment = unit.paymentPlans[0] !== undefined;
        if (!unit.paymentPlans[0].downpayment) {
            console.log(unit.title, 'has no downpayment');
        }
        return haveDownpayment
    }) 

    return (
        <>
            {UnitsRight && UnitsRight.map((unit, index) => (
                <TouchableOpacity style={styles.card} key={index} onPress={() => router.push({
                    pathname: '/(Units)/unit',
                    params: {
                        unitString: JSON.stringify(unit)
                    }
                })}>
                    <ImageBackground source={{ uri: `${unit.images[0]}` }} style={styles.imageBg}>
                        <View style={styles.headerCard}>
                            <View>
                                <AntDesign name="heart" size={24} color="white" />
                            </View>
                        </View>
                        <LinearGradient
                            colors={['black', 'transparent']}
                            style={styles.blackg}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                        >
                            <View style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                            }}>
                                <Text style={{
                                    color: Colors.light.background,
                                    fontFamily: Fonts.family.medium,
                                    fontSize: 18,
                                }}>Deliver</Text>
                                <Text style={{
                                    color: Colors.light.background,
                                    fontFamily: Fonts.family.bold,
                                    fontSize: 36,
                                    marginHorizontal: 10,
                                }}>{unit.deliver}</Text>
                            </View>
                            <Image source={{ uri: `${getDeveloperImage(unit.developer)}` }} style={styles.devImage} />
                        </LinearGradient>
                    </ImageBackground>
                    <View style={styles.contentCard}>
                        <View>
                            <Text style={styles.h3}>{unit.title}</Text>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.detailsCont}>
                                <FontAwesome name="bed" size={24} color={Colors.light.tint} />
                                <Text style={styles.detailText}>{unit.bathrooms.toLocaleString()} bedrooms</Text>
                            </View>
                            <View style={styles.detailsCont}>
                                <MaterialIcons name="bathtub" size={28} color="black" />
                                <Text style={styles.detailText}>{unit.bathrooms.toLocaleString()} bathrooms</Text>
                            </View>
                            <View style={styles.detailsCont}>
                                <MaterialIcons name="width-normal" size={24} color={Colors.light.tint} />
                                <Text style={styles.detailText}>{unit.area.toLocaleString()} m2</Text>
                            </View>
                        </View>
                        <View style={{
                            width: '100%'
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: Colors.light.tint,
                                fontFamily: Fonts.family.medium,
                            }}>{calculateMonthlyPayment(unit.paymentPlans[0].downpayment, unit.paymentPlans[0].payYears, unit.startBudget).toLocaleString()} EGP/Month</Text>
                            <Text style={{
                                fontSize: 22,
                                color: Colors.light.tint,
                                fontFamily: Fonts.family.bold,
                            }}>{unit.startBudget.toLocaleString()} EGP</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </>
    );
}

export default Units;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "#ccc"
    },
    headerCard: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imageBg: {
        width: '100%',
        height: 200,
        backgroundColor: "#f1f8fb",
        borderBottomEndRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    blackg: {
        height: 150,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    h3: {
        textAlign: 'left',
        fontSize: 18,
        color: Colors.light.tint,
        fontFamily: Fonts.family.bold,
    },
    details: {
        color: '#334155',
        width: '100%',
        fontSize: 14,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    detailsCont: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginRight: 8,
    },
    detailText: {
        marginLeft: 4,
        fontFamily: Fonts.family.medium,
        fontSize: 14,
    },
    contentCard: {
        padding: 10,
        width: '100%'
    },
    devImage: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
    },
    icons: {
        marginLeft: 15,
    },
});