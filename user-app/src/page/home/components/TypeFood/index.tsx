import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  ScrollView,
  Stack,
  Text,
  VStack,
  View,
} from "native-base";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
const arepa = require("./assets/arepa.png");
const hamburguesa = require("./assets/hamburguesa (1).png");
const papas = require("./assets/papas-fritas (1).png");
const refresco = require("./assets/refresco.png");

const { width } = Dimensions.get("window");

export const TypeFood = () => {

const typeFood = [
  {
    name: arepa
  },{name: hamburguesa }, {name: papas}, {name: refresco}
]

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        dotColor="#fff"
        activeDotColor="#000"
        autoplay={true}
      >
        <View style={[styles.slide]}>
          <View flexDirection="row">
            {
              typeFood.map((type, index) => (
                <Image key={index} source={type.name} alt={type.name} accessibilityLabel=""/>
              ))
            }
          </View>
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
