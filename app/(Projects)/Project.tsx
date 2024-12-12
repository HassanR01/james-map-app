import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

interface Project {
    _id: number;
    title: string;
    description: string;
    keywords: string;
    images: [];
    location: [];
    article: string;
    developer: string;
    zone: string;
    highScale: string;
    startBudget: number;
    // App Edits
    titleAr: string;
    descriptionEn: string;
    articleEn: string;
    highScaleEn: string;
    deliver: string;
    paymentPlans: {
        downpayment: number;
        payYears: number;
        installment: number;
        firstInstallment: number;
        status: string;
        note: string;
    }[],
    video: string;
    masterPlan: string;
}


export default function Project() {
    const { projectString } = useLocalSearchParams<{ projectString: string }>()
    const [project, setProject] = useState<Project | null>(projectString ? JSON.parse(projectString) : null)


    
    
  return (
    <View>
      <Text>{project && project.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})