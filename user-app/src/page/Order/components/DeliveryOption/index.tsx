import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";
import { Button, Radio, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import { User } from "firebase/auth";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";

interface Props {
  user: User | null;
}

export const DeliveryOption = ({ user }: Props) => {
  const [deliveryOption, setDeliveryOption] = useState<string>("");

  useEffect(() => {
    fetchDeliveryOption();
  }, [user]);

  const fetchDeliveryOption = async () => {
    try {
      if (user) {
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const data = docSnapshot.data();
          const option = data.OpcionDeEntrega || "";
          setDeliveryOption(option);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (value: string) => {
    setDeliveryOption(value || "");
  };

  const handleDeliveryOption = async () => {
    try {
      if (user) {
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnapshot) => {
          const orderDocRef = doc(db, "orders", docSnapshot.id);

          let opcionDeEntregaData = {};

          if (deliveryOption === "delivery") {
            opcionDeEntregaData = { OpcionDeEntrega: "delivery" };
          } else if (deliveryOption === "irPorElPedido") {
            opcionDeEntregaData = { OpcionDeEntrega: "irPorElPedido" };
          }

          setDoc(orderDocRef, opcionDeEntregaData, { merge: true });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Text fontSize="20px">Opción de entrega</Text>
      <View mt={1}>
        <Radio.Group
          name="deliveryOption"
          value={deliveryOption}
          onChange={handleOptionChange}
        >
          <Radio value="irPorElPedido" my={2}>
            Ir por el producto
          </Radio>
          <Radio value="delivery" my={2}>
            Pedir repartidor
          </Radio>
        </Radio.Group>
        <ButtonBase onPress={handleDeliveryOption}>Confirmar</ButtonBase>
      </View>
    </View>
  );
};
