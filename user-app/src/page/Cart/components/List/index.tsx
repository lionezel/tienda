import { ScrollView, View } from "native-base";
import { Product } from "../../../../interfaces/Products";

import { CardCart } from "../Card";

interface Props {
  cartItems: Product[];
}

export const ListCart = ({ cartItems }: Props) => {
  return (
    <View>
      <ScrollView padding={6}>
        <CardCart cartItems={cartItems} />
      </ScrollView>
    </View>
  );
};
