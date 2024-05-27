import React, { useEffect, useState } from "react";
import { Stack } from "native-base";
import { auth } from "../../firebase/config";

import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Login, UserInfo } from "./page";

type RootStackParamList = {
  navigate(arg0: string): unknown;
  Home: undefined;
};

export const Auth = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const navigation = useNavigation<RootStackParamList>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
      if (user) {
        setUserLoggedIn(true);
        navigation.navigate("UserInfo");
      } else {
        setUserLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack space={4} w="100%" alignItems="center">
      {userLoggedIn ? <UserInfo /> : <Login />}
    </Stack>
  );
};
