import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingPage from "@/components/views/LoadingPage";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [comparisones, setComparisones] = useState([]);
  useEffect(() => {
    const GetComparizons = async () => {
      const comparisonesExist = await AsyncStorage.getItem("comparisones");
      if (comparisonesExist) {
        setComparisones(JSON.parse(comparisonesExist));
      }
    }

    setInterval(() => {
      GetComparizons();
    }, 100);
  })

  if (comparisones.length > 0) {
    return <LoadingPage />
  } else {

    return (
      <>
        <Redirect href={loggedIn ? '/(Ai)/launching' : '/(SignIn)'} />
        
      </>
    );
  }
}
