import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase/config";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AspectRatio,
  Icon,
  Image,
  Input,
  Stack,
  Text,
  View,
} from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LOGO_COMPANY } from "../../../../GLOBAL/LOGO_COMPANY";
import { Pressable } from "react-native";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";

type RootStackParamList = {
  navigate(arg0: string): unknown;
  Home: undefined;
};

export const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackParamList>();

  const Login = async () => {
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

  const Register = () => {
    navigation.navigate("Register");
  };

  const Restart = () => {
    navigation.navigate("ResetPassword");
  };

  return (
    <Stack space={4} w="100%" alignItems="center">
      <View marginTop="25%">
        <AspectRatio w="50%" position="relative" bottom={10} marginLeft="10%">
          <Image source={{ uri: LOGO_COMPANY }} alt="d" />
        </AspectRatio>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>Inicio de sesion</Text>
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
            <Text onPress={Register}>Registate</Text>
            <Text onPress={Restart}>Restablecer contrasena</Text>
            <ButtonBase onPress={Login}>Iniciar sesión</ButtonBase>
          </>
        )}
      </View>
    </Stack>
  );
};
