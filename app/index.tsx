import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Redirect href={loggedIn ? '/(tabs)' : '/(SignIn)'} />
  );
}
