import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useFetchOrder } from "../../hooks/useFetchOrder";
import { Orders } from "../../interfaces/Orders";
import { Cash, Tranference } from "./components";

export const Checkout: React.FC = () => {
  const orderItems = useFetchOrder() as Orders[]; 
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    if (orderItems && orderItems.length > 0) {
      const firstOrder = orderItems[0];
      if (firstOrder.paymentMethod) {
        setPaymentMethod(firstOrder.paymentMethod);
      }
    }
  }, [orderItems]);

  return (
    <View>
      {paymentMethod === "Transferencia" && (
        <Tranference />
      )}
      {paymentMethod === "efectivo" && (
        <Cash />
      )}
    </View>
  );
};
