import { Redirect } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Redirect href={loggedIn ? '/(tabs)' : '/(SignIn)'} />
  );
}
