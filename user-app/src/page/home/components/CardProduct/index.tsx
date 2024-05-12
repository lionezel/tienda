import { Text, TouchableHighlight } from "react-native";
import { Product } from "../../../../interfaces/Products";
import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Image,
  Stack,
} from "native-base";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GLOBAL_COLOR } from "../../../../GLOBAL/COLOR_GLOBAL";
import { auth, db } from "../../../../firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { useState } from "react";

interface CardProps {
  product: Product;
}

export const CardProduct: React.FC<CardProps> = ({ product }) => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);

  const navigateToDetail = () => {
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  const handleAddToCart = async () => {
    try {
      const user = auth.currentUser;
      if (user?.uid) {
        const userCartQuery = query(
          collection(db, "cart"),
          where("user_uid", "==", user.uid),
          where("product_id", "==", product.id)
        );
        const querySnapshot = await getDocs(userCartQuery);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            const cartItem = doc.data();
            const newQuantity = cartItem.quantity + 1;
            await updateDoc(doc.ref, { quantity: newQuantity });
          });
        } else {
          await addDoc(collection(db, "cart"), {
            user_uid: user.uid,
            product_id: product.id,
            product: product,
            quantity: 1,
          });
        }
        alert("Product added to cart successfully!");
      } else {
        alert("User not logged in!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart");
    }
  };

  return (
    <Box alignItems="center">
      <Box
        maxW="40"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <TouchableHighlight onPress={navigateToDetail}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: product.imageURL,
                }}
                alt="image"
              />
            </AspectRatio>
          </TouchableHighlight>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1" textAlign="center">
              {product.name}
            </Heading>
          </Stack>

          {!product.stock && (
            <Center
              bg="red.500"
              borderTopLeftRadius="20px"
              borderBottomRightRadius="20px"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="1"
              right="1"
              px="3"
              py="1.5"
            >
              <Text>No disponible</Text>
            </Center>
          )}
          {product.stock && (
            <Center
              bg={GLOBAL_COLOR}
              borderRadius="100px"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="1"
              right="1"
              px="3"
              py="1.5"
            >
              <FontAwesome
                name="plus"
                size={24}
                color="black"
                onPress={handleAddToCart}
              />
            </Center>
          )}
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text>${product.price}</Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
