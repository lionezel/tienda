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
import { useFormattedNumber } from "../../../../hooks/useFormattedNumber";
import { useFetchDeliveryprice } from "../../../../hooks/useFetchDeliveryprice";

interface Props {
  orderItems: Orders[];
  user: User;
}

export const ResumeOrder = ({ orderItems, user }: Props) => {
  const [deliveryOption, setDeliveryOption] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const deliveryprice = useFetchDeliveryprice()
  const deliveryCosts =  deliveryprice.length > 0 ? deliveryprice[0].price : 0

  const totalDelProducto = orderItems.reduce(
    (total, order) => total + order.totalDelProducto,
    0
  );

  const {
    value: formattedTotalDelProducto,
    setValue: setFormattedTotalDelProducto,
  } = useFormattedNumber(totalDelProducto);
  const { value: formattedDeliveryCost, setValue: setFormattedDeliveryCost } =
    useFormattedNumber(deliveryCost);
  const { value: formattedTotalPagar, setValue: setFormattedTotalPagar } =
    useFormattedNumber(totalDelProducto + deliveryCost);

  useEffect(() => {
    fetchDeliveryOption();
  }, [user]);

  useEffect(() => {
    setFormattedTotalDelProducto(totalDelProducto);
  }, [totalDelProducto]);

  useEffect(() => {
    if (deliveryOption === "Repartidor") {
      setDeliveryCost(deliveryCosts);
      setFormattedDeliveryCost(deliveryCosts);
    } else {
      setDeliveryCost(0);
      setFormattedDeliveryCost(0);
    }
  }, [deliveryOption, deliveryCosts]);

  useEffect(() => {
    setFormattedTotalPagar(totalDelProducto + deliveryCost);
  }, [totalDelProducto, deliveryCost]);

  useEffect(() => {
    listenForDeliveryOptionChanges();
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
        <Text>${formattedTotalDelProducto}</Text>
      </View>

      {deliveryOption === "Repartidor" && (
        <View flexDirection="row" justifyContent="space-between">
          <Text>Costo del domicilio</Text>
          <Text>${formattedDeliveryCost}</Text>
        </View>
      )}

      <View flexDirection="row" justifyContent="space-between">
        <Text bold mt={5}>
          Total a pagar
        </Text>
        <Text bold fontSize={30} mt={5}>
          ${formattedTotalPagar}
        </Text>
      </View>
    </View>
  );
};
