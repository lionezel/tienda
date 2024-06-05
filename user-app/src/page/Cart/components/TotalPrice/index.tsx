import { Text, View } from "native-base";
import { useFormattedNumber } from "../../../../hooks/useFormattedNumber";
import { useEffect } from "react";

interface Props {
  totalPrice: number;
}

export const TotalPrice = ({ totalPrice }: Props) => {
  const { value: formattedTotalPrice, setValue: setFormattedTotalPrice } =
    useFormattedNumber(totalPrice);

  useEffect(() => {
    setFormattedTotalPrice(totalPrice);
  }, [totalPrice, setFormattedTotalPrice]);

  return (
    <View flexDirection="row" justifyContent="space-between" padding={2}>
      <Text bold>Total: </Text>
      <Text bold>${formattedTotalPrice}</Text>
    </View>
  );
};
