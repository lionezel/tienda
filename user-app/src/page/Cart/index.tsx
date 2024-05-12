import { GLOBAL_BACKGROUND } from "../../GLOBAL/COLOR_GLOBAL";
import { ListCart, PayOrderButton, TotalPrice } from "./components";
import styled from "styled-components/native";
import { View } from "native-base";
import { useFetchCart } from "../../hooks/useFetchCart";

export const CartPage = () => {
  const cartItems = useFetchCart();

  const totalPrice = cartItems.reduce((total, product) => {
    if (
      product.product &&
      typeof product.product.price === "number" &&
      typeof product.quantity === "number"
    ) {
      const price = product.product.price;
      const quantity = product.quantity;
      return total + price * quantity;
    }
    return total;
  }, 0);

  return (
    <BackgroundImage source={{ uri: GLOBAL_BACKGROUND }}>
      <ListCart cartItems={cartItems} />

      <View
        padding={5}
        backgroundColor="white"
        width="100%"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        position="absolute"
        bottom="0"
      >
        <TotalPrice totalPrice={totalPrice} />
        <PayOrderButton
          totalPrice={totalPrice}
          cartItems={cartItems}
          navigate={function (arg0: string): unknown {
            throw new Error("Function not implemented.");
          }}
        />
      </View>
    </BackgroundImage>
  );
};

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;
