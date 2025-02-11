import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "@/components/views/LoadingPage";

export default function Index() {
  const [Loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [comparisones, setComparisones] = useState([]);
  useEffect(() => {

    const GetUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }
    
    
    
    const GetComparizons = async () => {
      const comparisonesExist = await AsyncStorage.getItem("comparisones");
      if (comparisonesExist) {
        setComparisones(JSON.parse(comparisonesExist));
      }
    }

    setInterval(() => {
      GetComparizons();
    }, 100);
    
    GetUser().finally(() => {
      setLoading(false);
    })
  })

  if (Loading) {
    return <LoadingPage />
  } else {

    return (
      <>
        <Redirect href={user ? '/(Ai)/launching' : '/(SignIn)'} />
        
      </>
    );
  }
}
