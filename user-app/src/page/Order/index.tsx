import { Image, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Address,
  ConfirmOrderButton,
  DeliveryOption,
  ResumeOrder,
} from "./components";
import { auth } from "../../firebase/config";
import { User } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFetchOrder } from "../../hooks/useFetchOrder";

const dinero = require("./assets/dinero.png");
const qr = require("./assets/qr.png");

interface Props {
  navigate(arg0: string): unknown;
}

export const Order = () => {
  const orderItems = useFetchOrder();
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<Props>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    });
    return () => unsubscribe();
  }, []);

  const handle = () => {
    navigation.navigate("PaymentMethod");
  };

  return (
    <View backgroundColor="#eae8e8">
      <View>
        <Address user={user} />
      </View>

      <View flexDirection="row" justifyContent="space-between" padding={5}>
        <View
          backgroundColor="white"
          padding={2}
          paddingTop={2}
          borderRadius={15}
        >
          {orderItems.map((order, index) => (
            <View
              key={index}
              w="100%"
              flexDirection="row"
              justifyContent="space-between"
              padding={1}
            >
              <Text fontSize="20px">Metodo de pago</Text>

              {order.paymentMethod === "efectivo" ? (
                <Image
                  source={dinero}
                  alt="dinero"
                  style={{
                    width: 30,
                    height: 30,
                    position: "relative",
                    top: 6,
                  }}
                />
              ) : order.paymentMethod === "Transferencia" ? (
                <Image
                  source={qr}
                  alt="qr"
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <Text></Text>
              )}
              <View mt={1}>
                <AntDesign
                  name="arrowright"
                  size={24}
                  color="black"
                  onPress={handle}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View flexDirection="row" justifyContent="space-between" padding={5}>
        <View
          backgroundColor="white"
          w="100%"
          padding={2}
          paddingTop={2}
          borderRadius={15}
        >
          <DeliveryOption user={user} />
        </View>
      </View>

      {user && <ResumeOrder orderItems={orderItems} user={user} />}

      <View
        position="relative"
        bottom="0"
        paddingLeft="15px"
        paddingRight="15px"
      >
        {user && <ConfirmOrderButton orderItems={orderItems} user={user} />}
      </View>
    </View>
  );
};
