import { createContext, useState, Dispatch, SetStateAction, useEffect, useContext, ReactNode } from "react";
import axios from "axios";

interface Developer {
    _id: number;
    name: String;
    description: String;
    keywords: String;
    image: String;
    // App Edits
    nameAr: String;
    descriptionEn: String;
}

interface Unit {
    _id: number;
    title: String;
    description: String;
    keywords: String;
    images: [];
    location: [];
    article: String;
    developer: String;
    zone: String;
    highScale: String;
    project: String;
    type: String;
    startBudget: Number;
    deliver: String;
    bathrooms: Number;
    bedrooms: Number;
    area: Number;
    floor: Number;
    // App Edits
    titleAr: String;
    descriptionEn: String;
    articleEn: String;
    highScaleEn: String;
    paymentPlans: [
        // {
        // downpayment: Number;
        // payYears: Number;
        // installment every how month
        // First Installment
        // Status
        // note
        // }
    ],
    video: String;
    layout: String;
}

interface Project {
    _id: number;
    title: String;
    description: String;
    keywords: String;
    images: [];
    location: [];
    article: String;
    developer: String;
    zone: String;
    highScale: String;
    startBudget: Number;
    // App Edits
    titleAr: String;
    descriptionEn: String;
    articleEn: String;
    highScaleEn: String;
    deliver: String;
    paymentPlans: [
        // {
        // downpayment: Number
        // payYears: Number
        // installment every how month
        // First Installment
        // Status
        // note
        // }
    ],
    video: String;
    masterPlan: String;
}

interface Zone {
    _id: number;
    name: String;
    nameAr: String;
    image: String;
    location: [];
    highScale: String;
}

interface DataContextType {
    developers: Developer[] | null;
    setDevelopers: Dispatch<SetStateAction<Developer[] | null>>;
    units: Unit[] | null;
    setUnits: Dispatch<SetStateAction<Unit[] | null>>;
    projects: Project[] | null;
    setProjects: Dispatch<SetStateAction<Project[] | null>>;
    zones: Zone[] | null;
    setZones: Dispatch<SetStateAction<Zone[] | null>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useDataContext() {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
}

export default function DataProvider({ children }: { children: ReactNode }) {
    const [developers, setDevelopers] = useState<Developer[] | null>(null);
    const [units, setUnits] = useState<Unit[] | null>(null);
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [zones, setZones] = useState<Zone[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resDev, resUnits, resProjects, resZones] = await Promise.all([
                    axios.get<Developer[]>('http://172.20.10.2:5000/api/v1/developers/get-developers'),
                    axios.get<Unit[]>('http://172.20.10.2:5000/api/v1/units/get-units'),
                    axios.get<Project[]>('http://172.20.10.2:5000/api/v1/projects/get-projects'),
                    axios.get<Zone[]>('http://172.20.10.2:5000/api/v1/zones/get-zones')
                ]);

                setDevelopers(resDev.data);
                setUnits(resUnits.data);
                setProjects(resProjects.data);
                setZones(resZones.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ developers, setDevelopers, units, setUnits, projects, setProjects, zones, setZones }}>
            {children}
        </DataContext.Provider>
    );
}
