import { ScrollView, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/config";
import { doc, onSnapshot } from "@firebase/firestore";
import { Product } from "../../interfaces/Products";
import { ImageBase } from "../../GLOBAL/GLOBAL_STYLED";
import { User, onAuthStateChanged } from "firebase/auth";
import { ImageBackground } from "react-native";
import { GLOBAL_BACKGROUND, GLOBAL_COLOR } from "../../GLOBAL/COLOR_GLOBAL";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { ButtonAdd } from "./components";
import usePriceFormatter from "../../hooks/usePriceFormatter";

export const ProductDetail = ({ route }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [count, setCount] = useState(1);


  const incrementCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const productRef = doc(db, "products", productId);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const subscriber = onSnapshot(productRef, {
      next: (snapshot) => {
        const data = snapshot.data();
        if (data) {
          setProduct({
            id: data.id,
            name: data.name,
            price: data.price,
            description: data.description,
            imageURL: data.imageURL,
            product: product,
            type: data.type,
            stock: data.stock,
          });
        } else {
          console.log("El documento no existe");
          setProduct(null);
        }
      },
      error: (error) => {
        console.error("Error al obtener detalles del producto:", error);
        setProduct(null);
      },
    });
    return () => subscriber();
  }, [productId]);

  return (
    <ScrollView>
      <View height="800px">
        {product ? (
          <ImageBackground source={{ uri: GLOBAL_BACKGROUND }}>
            <View
              padding={10}
              marginTop="40%"
              backgroundColor="white"
              width="100%"
              borderRadius="40px"
              height="full"
            >
              <View alignItems="center">
                {product.imageURL && <ImageBase uri={product.imageURL} />}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 0,
                }}
                bottom="50px"
              >
                <View>
                  <Text bold fontSize={25}>
                    {product.name}
                  </Text>
                  <Text bold fontSize={25} color={GLOBAL_COLOR}>
                    ${product.price}
                  </Text>
                </View>
                <View
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  backgroundColor={GLOBAL_COLOR}
                  borderRadius={20}
                  padding={3}
                >
                  <Foundation
                    name="minus"
                    size={15}
                    color="black"
                    onPress={decreaseCount}
                  />
                  <Text marginLeft="20px" marginRight="20px">
                    {count}
                  </Text>
                  <Entypo
                    name="plus"
                    size={15}
                    color="black"
                    onPress={incrementCount}
                  />
                </View>
              </View>
              <View marginTop={1}>
                <Text bold fontSize={25}>
                  Informacion
                </Text>
                <Text marginTop={6}>{product.description}</Text>
              </View>
              <View mt={10}>
                {user && product && (
                  <ButtonAdd
                    product={product}
                    user={user}
                    count={count}
                    stock={product.stock}
                  />
                )}
              </View>
            </View>
          </ImageBackground>
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
    </ScrollView>
  );
};
