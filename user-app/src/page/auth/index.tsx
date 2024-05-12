import React, { useEffect, useState } from "react";
import {
  AspectRatio,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  View,
} from "native-base";
import { auth, db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { UserInfo } from "./page";
import { ButtonBase } from "../../GLOBAL/GLOBAL_STYLED";
import { LOGO_COMPANY } from "../../GLOBAL/LOGO_COMPANY";
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type RootStackParamList = {
  navigate(arg0: string): unknown;
  Home: undefined;
};

export const Auth = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
      });
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Error al registrarse:", error);
      alert("Error al registrarse: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      alert("inicio de sesion fallido:" + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack space={4} w="100%" alignItems="center" >
      {userLoggedIn ? (
        <UserInfo />
      ) : (
        <View marginTop="25%">
          <AspectRatio w="50%" position="relative" bottom={10} marginLeft="10%">
            <Image source={{ uri: LOGO_COMPANY }} alt="d" />
          </AspectRatio>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<Fontisto name="email" size={24} color="black" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            marginBottom={2}
            borderRadius={120}
            placeholder="Name"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            InputLeftElement={
              <Icon
                as={<AntDesign name="eyeo" size={24} color="black" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            type={show ? "text" : "password"}
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}></Pressable>
            }
            placeholder="Password"
            borderRadius={120}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <>
              <ButtonBase onPress={signIn}>Iniciar sesión</ButtonBase>
              <ButtonBase onPress={signUp}>Registrarse</ButtonBase>
            </>
          )}
        </View>
      )}
    </Stack>
  );
};
