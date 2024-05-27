import { Text, View } from "native-base";
import React from "react";
import { auth } from "../../../../../../firebase/config";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  navigate(arg0: string): unknown;
  Home: undefined;
};

export const SingOut = () => {
  const navigation = useNavigation<RootStackParamList>();


  const handleSingOut = async () => {
    try {
      await auth.signOut();
      console.log("Usuario cerró sesión exitosamente");
      navigation.navigate("Login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <View>
      <FontAwesome5
        name="door-open"
        size={24}
        color="black"
        onPress={handleSingOut}
      />
    </View>
  );
};
