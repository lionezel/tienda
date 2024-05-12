import {
  Button,
  Center,
  Input,
  PresenceTransition,
  Radio,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { PayCard, PayCash } from "./components";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { StripeProvider } from "@stripe/stripe-react-native";
import { AntDesign } from "@expo/vector-icons";
import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { auth, db } from "../../../../firebase/config";
import { User } from "firebase/auth";
import { GLOBAL_COLOR } from "../../../../GLOBAL/COLOR_GLOBAL";
import { useNavigation } from "@react-navigation/native";

interface CardData {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface Props {
  navigate(arg0: string): unknown;
}

export const PaymentMethod = () => {
  const navigation = useNavigation<Props>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [cashData, setCashData] = useState("");

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => unsubcribe();
  }, [auth]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value || "");
  };

  const handleInputChange = (key: keyof CardData, value: string) => {
    setCardData({ ...cardData, [key]: value });
  };

  const handleCashInputChange = (value: string) => {
    setCashData(value);
  };

  console.log(user)

  const handlePaymentSubmit = async () => {
    if (!paymentMethod) {
      alert("Por favor seleccione un método de pago.");
      return;
    }
    try {
      if (user) {
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((docSnapshot) => {
          const orderDocRef = doc(db, "orders", docSnapshot.id);
    
          let paymentData  = {};
    
          if (paymentMethod === "tarjeta") {
            paymentData  = { paymentMethod: "tarjeta", value: cardData };
          } else if (paymentMethod === "efectivo") {
            paymentData  = { paymentMethod: "efectivo", value: cashData };
          }
    
          setDoc(orderDocRef, paymentData , { merge: true });
        });
        alert("Se creo correctamente");
        navigation.navigate("Order")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (  
    <View backgroundColor="#eae8e8" height="full" padding={5}>
      <Text fontSize="20px" mb={10}>Método de pago</Text>
      <View backgroundColor="white" padding={2} borderRadius={15}>
        <Radio.Group
          name="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <Radio value="tarjeta" my={2}>
            Tarjeta
          </Radio>
          <Radio value="efectivo" my={2}>
            Efectivo
          </Radio>
        </Radio.Group>

        {paymentMethod === "tarjeta" && (
          <View>
            <Text textAlign="center" mt={5} fontSize={20}>Pon tus datos de tu tarjeta</Text>
            <Input
              placeholder="Número de tarjeta"
              onChangeText={(value) => handleInputChange("cardNumber", value)}
              value={cardData.cardNumber}
              mb={5}
              mt={5}
            />
            <Input
              placeholder="Fecha de expiración"
              onChangeText={(value) =>
                handleInputChange("expirationDate", value)
              }
              value={cardData.expirationDate}
              mb={5}
            />
            <Input
              placeholder="CVV"
              onChangeText={(value) => handleInputChange("cvv", value)}
              value={cardData.cvv}
              mb={5}
            />
          </View>
        )}
        {paymentMethod === "efectivo" && (
          <View>
            <Text textAlign="center" mt={5} fontSize={20}>Con cuanto vas a pagar?</Text>
          <Input
            placeholder="Con cuanto vas a pagar ?"
            onChangeText={(value) => handleCashInputChange(value)}
            value={cashData}
            mb={10}
            mt={10}
          />
          </View>
        )}
        <ButtonBase onPress={handlePaymentSubmit}>Continuar</ButtonBase>
      </View>
    </View>
  );
};
