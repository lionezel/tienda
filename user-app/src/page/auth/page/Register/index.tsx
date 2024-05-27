import { useNavigation } from "@react-navigation/native";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../../../firebase/config";
import {
  AspectRatio,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Stack,
  Text,
  View,
} from "native-base";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LOGO_COMPANY } from "../../../../GLOBAL/LOGO_COMPANY";
import { Platform, Pressable } from "react-native";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type RootStackParamList = {
  navigate(arg0: string): unknown;
  Home: undefined;
};

export const Register = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackParamList>();

  const Register = async () => {
    setLoading(true);
    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        lastName: lastName,
        telefone: telefone,
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

  const navigate = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === "ios" ? 100 : 0} // Ajusta según sea necesario
    >
      <Stack space={4} w="100%" alignItems="center">
        <View marginTop="25%">
          <AspectRatio w="50%" position="relative" bottom={10} marginLeft="10%">
            <Image source={{ uri: LOGO_COMPANY }} alt="d" />
          </AspectRatio>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
            Registrate
          </Text>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            marginBottom={2}
            borderRadius={120}
            placeholder="Nombre"
            value={name}
            onChangeText={(text) => setName(text)}
            isRequired
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            marginBottom={2}
            borderRadius={120}
            placeholder="Apellido"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            isRequired
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            marginBottom={2}
            borderRadius={120}
            placeholder="Telefono"
            keyboardType="numeric"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            isRequired
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            marginBottom={2}
            borderRadius={120}
            placeholder="Correo electronico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            isRequired
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
            isRequired
          />
          {loading ? (
            <Text>Cargando...</Text>
          ) : (
            <>
              <Text onPress={navigate}>Iniciar sesion</Text>
              <ButtonBase onPress={Register}>Registrarse</ButtonBase>
            </>
          )}
        </View>
      </Stack>
    </KeyboardAwareScrollView>
  );
};
