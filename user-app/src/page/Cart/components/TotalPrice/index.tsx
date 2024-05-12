import { Text, View } from "native-base";

interface Props {
  totalPrice: number;
}

export const TotalPrice = ({ totalPrice }: Props) => {
  return (
    <View flexDirection="row" justifyContent="space-between" padding={2}>
      <Text bold>Total: </Text>
      <Text bold>${totalPrice}</Text>
    </View>
  );
};
