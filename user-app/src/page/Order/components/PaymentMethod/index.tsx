import {
  Radio,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { collection, doc, getDocs, query, setDoc, where } from "@firebase/firestore";
import { auth, db } from "../../../../firebase/config";
import { User } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navigate(arg0: string): unknown;
}

export const PaymentMethod = () => {
  const navigation = useNavigation<Props>();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [transData, setTransData] = useState("");
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

  const handleInputChange = (value: string) => {
    setTransData(value);
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
    
          if (paymentMethod === "Transferencia") {
            paymentData  = { paymentMethod: "Transferencia", value: transData };
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
          <Radio value="Transferencia" my={2}>
            Transferencia
          </Radio>
          <Radio value="efectivo" my={2}>
            Efectivo
          </Radio>
        </Radio.Group>
        <ButtonBase onPress={handlePaymentSubmit}>Continuar</ButtonBase>
      </View>
    </View>
  );
};
