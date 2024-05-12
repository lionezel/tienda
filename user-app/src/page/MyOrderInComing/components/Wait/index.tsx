import { Image, Text, View } from "native-base";
import React from "react";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { useNavigation } from "@react-navigation/native";

const restaurant = require("./assets/restaurante.png");

interface Props {
  navigate(arg0: string): unknown;
}

export const Wait = () => {
  const navigation = useNavigation<Props>();

  const handleNavigate = () => {
    navigation.navigate("Home");
  };

  return (
    <View>
      <View alignItems="center">
        <Text bold fontSize={30} numberOfLines={10}>
          El restaurante esta aceptando tu pedido
        </Text>
        <View mt={10}>
          <Image
            source={restaurant}
            alt="restaurant"
            style={{ width: 300, height: 300 }}
          />
        </View>
      </View>
      <View mt={20}>
        <ButtonBase onPress={handleNavigate}>Seguir viendo</ButtonBase>
      </View>
    </View>
  );
};
