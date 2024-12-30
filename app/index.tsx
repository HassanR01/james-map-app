import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Redirect href={loggedIn ? '/(Ai)/launching' : '/(SignIn)'} />
  );
}
