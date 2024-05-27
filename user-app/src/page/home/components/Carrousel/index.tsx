import { Image, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
import { db } from "../../../../firebase/config";
import { collection, onSnapshot } from "@firebase/firestore";

import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const CarrouselProm = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRef = collection(db, "carrousel");

        const subscriber = onSnapshot(productRef, {
          next: (snapshot) => {
            const products: any[] = [];
            snapshot.docs.forEach((product) => {
              const data = product.data();
              products.push({
                id: product.id,
                imageUrl: data.imageUrl,
              });
            });
            setData(products);
            console.log(products);
          },
        });
        return () => subscriber();
      } catch (error) {
        console.error(error); // Manejar errores
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <View style={styles.container}>
      {data.length === 0 ? (
        <Text>No hay datos disponibles.</Text>
      ) : (
        <Swiper
          style={styles.wrapper}
          dotColor="#fff"
          activeDotColor="#000"
          autoplay={true}
        >
          {data.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image style={styles.image} source={{ uri: item.imageUrl }} />
            </View>
          ))}
        </Swiper>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%" ,
    flex: 1,
  },
  wrapper: {},
  slide: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height: 200,
    resizeMode: "contain",
  },
});
