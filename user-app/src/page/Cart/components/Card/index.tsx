import {
  Box,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Product } from "../../../../interfaces/Products";
import { Quantity } from "./components";

interface Props {
  cartItems: Product[];
}

export const CardCart = ({ cartItems }: Props) => {
  return (
    <FlatList
      data={cartItems}
      renderItem={({ item }) => (
        <Box
          background="white"
          mb={5}
          borderRadius={10}
          height={100}
          padding={2}
        >
          <Box>
            <HStack space={[2, 3]} justifyContent="space-between">
              <Image
                size="80px"
                source={{
                  uri: item.product.imageURL,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.product.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  $ {item.product.price}
                </Text>
              </VStack>
              <Spacer />
                  <Quantity item={item} />
            </HStack>
          </Box>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};
