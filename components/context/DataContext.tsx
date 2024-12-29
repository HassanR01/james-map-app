import { createContext, useState, Dispatch, SetStateAction, useEffect, useContext, ReactNode } from "react";
import axios from "axios";

export interface Developer {
    _id: string;
    name: string;
    description: string;
    keywords: string;
    image: string;
    // App Edits
    nameAr: string;
    descriptionEn: string;
}

export interface Unit {
    _id: string;
    title: string;
    description: string;
    keywords: string;
    images: [];
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
}

export interface Project {
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

export interface Zone {
    _id: string;
    name: string;
    nameAr: string;
    image: string;
    location: [];
    highScale: string;
}

export interface User {
    _id: string;
    name: string,
    username: string,
    password: string,
    image: string,
    email: string,
    mobile: string,
    role: string,
    dataToSuggest: {
        zone: string,
        subZone: string,
        category: string,
        subCategory: string,
        developer: string,
        subDeveloper: string,
        minBudget: number,
        maxBudget: number,
        area: number,
    },
    favourites: {} [],
    ownedUnits: Unit[],
    Barters: {} [],
    history: {} [],
    logs: {} [],
}

export interface DataContextType {
    developers: Developer[] | null;
    setDevelopers: Dispatch<SetStateAction<Developer[] | null>>;
    units: Unit[] | null;
    setUnits: Dispatch<SetStateAction<Unit[] | null>>;
    projects: Project[] | null;
    setProjects: Dispatch<SetStateAction<Project[] | null>>;
    zones: Zone[] | null;
    setZones: Dispatch<SetStateAction<Zone[] | null>>;
    users: User[] | null;
    setUsers: Dispatch<SetStateAction<User[] | null>>;
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
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resDev, resUnits, resProjects, resZones, resUsers] = await Promise.all([
                    axios.get<Developer[]>('http://10.0.0.7:5000/api/v1/developers/get-developers'),
                    axios.get<Unit[]>('http://10.0.0.7:5000/api/v1/units/get-units'),
                    axios.get<Project[]>('http://10.0.0.7:5000/api/v1/projects/get-projects'),
                    axios.get<Zone[]>('http://10.0.0.7:5000/api/v1/zones/get-zones'),
                    axios.get<User[]>('http://10.0.0.7:5000/api/v1/users/get-users'),
                ]);

                setDevelopers(resDev.data);
                setUnits(resUnits.data);
                setProjects(resProjects.data);
                setZones(resZones.data);
                setUsers(resUsers.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ developers, setDevelopers, units, setUnits, projects, setProjects, zones, setZones, users, setUsers }}>
            {children}
        </DataContext.Provider>
    );
}
