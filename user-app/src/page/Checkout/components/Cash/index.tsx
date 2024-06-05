import React, { useState } from "react";
import { Input, Text, View } from "native-base";
import { useFetchOrder } from "../../../../hooks/useFetchOrder";
import { Orders } from "../../../../interfaces/Orders";
import { ButtonPayOrder } from "../ButtonPayOrder";

export const Cash: React.FC = () => {
  const orders: Orders[] = useFetchOrder();
  const [inputValue, setInputValue] = useState<string>("");

  const total = orders[0]?.totalDelProducto ?? 0;

  const formatNumber = (num: string): string => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (value: string): void => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = formatNumber(numericValue);
    setInputValue(formattedValue);
  };

  const isInputValid = (): boolean => {
    const numericInputValue = parseFloat(inputValue.replace(/\./g, ""));
    return numericInputValue >= total;
  };

  return (
    <View
      backgroundColor="white"
      margin="20px"
      padding="20px"
      borderRadius="20px"
    >
      <Text>Cash</Text>
      <Text>Total a pagar: {formatNumber(total.toString())}</Text>
      <Text>¿Con cuánto vas a pagar?</Text>
      <Input
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        placeholder="Ingresa la cantidad"
      />
      {inputValue && !isInputValid() && (
        <Text style={{ color: "red" }}>
          El valor debe ser mayor que el total.
        </Text>
      )}
      <ButtonPayOrder />
    </View>
  );
};
