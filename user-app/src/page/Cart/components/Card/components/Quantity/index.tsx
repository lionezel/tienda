import React, { useState } from "react";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { Button, HStack, Icon, Text, View } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { GLOBAL_COLOR } from "../../../../../../GLOBAL/COLOR_GLOBAL";
import { FontAwesome } from '@expo/vector-icons';

export const Quantity = ({ item }: any) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    updateQuantityInFirebase(quantity + 1);
  };

  const decreaseQuantity = async () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity === 0) {
        try {
          const itemRef = doc(db, "cart", item.cart_id);
          await deleteDoc(itemRef);
        } catch (error) {
          console.error("Error deleting item from Firebase: ", error);
        }
      } else {
        updateQuantityInFirebase(newQuantity);
      }
    }
  };
  const updateQuantityInFirebase = async (newQuantity: any) => {
    try {
      const itemRef = doc(db, "cart", item.cart_id);
      console.log(itemRef.id);
      await updateDoc(itemRef, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating quantity in Firebase: ", error);
    }
  };
  return (
    <HStack space={3} w={100} h={100} p={1} justifyContent="center" marginTop={5}>
      <Text onPress={decreaseQuantity}>
        {quantity === 1 ? (
        <FontAwesome name="trash" size={20} color="black" />
        ) : (
          <AntDesign name="minuscircleo" size={20} color="black" />
        )}
      </Text>

      <Text>{quantity}</Text>
      <Text onPress={increaseQuantity}>
        <AntDesign name="pluscircle" size={20} color={GLOBAL_COLOR} />
      </Text>
    </HStack>
  );
};
