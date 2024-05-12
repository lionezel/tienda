import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Orders } from "../../../../interfaces/Orders";
import { db } from "../../../../firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "@firebase/firestore";
import { User } from "firebase/auth";

interface Props {
  orderItems: Orders[];
  user: User;
}

export const ResumeOrder = ({ orderItems, user }: Props) => {
  const [deliveryOption, setDeliveryOption] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const totalDelProducto = orderItems.reduce(
    (total, order) => total + order.totalDelProducto,
    0
  );

  useEffect(() => {
    fetchDeliveryOption();
  }, [user]);

  useEffect(() => {
    if (deliveryOption === "delivery") {
      setDeliveryCost(4000);
    } else {
      setDeliveryCost(0);
    }
  }, [deliveryOption]);

  useEffect(() => {
    const unsubscribe = listenForDeliveryOptionChanges();
    return () => {};
  }, []);

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

  const listenForDeliveryOptionChanges = () => {
    try {
      if (user) {
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where("user_uid", "==", user.uid));
        return onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const data = change.doc.data();
            const option = data.OpcionDeEntrega || "";
            setDeliveryOption(option);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View backgroundColor="white" margin={15} padding={2} borderRadius={15}>
      <Text bold>Resumen</Text>
      <View flexDirection="row" justifyContent="space-between">
        <Text>Costo del Producto</Text>
        <Text>${totalDelProducto}</Text>
      </View>

      {deliveryOption === "delivery" && (
        <View flexDirection="row" justifyContent="space-between">
          <Text>Costo del domicilio</Text>
          <Text>${deliveryCost}</Text>
        </View>
      )}

      <View flexDirection="row" justifyContent="space-between">
        <Text bold mt={5}>
          Total a pagar
        </Text>
        <Text bold fontSize={30} mt={5}>
          ${totalDelProducto + deliveryCost}
        </Text>
      </View>
    </View>
  );
};
