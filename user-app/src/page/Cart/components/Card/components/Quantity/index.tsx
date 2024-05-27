import React, { useState } from "react";
import { Text } from "react-native";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { Button, HStack, View } from "native-base";

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
    <HStack space={3} justifyContent="center" h="50" >
      <Button onPress={increaseQuantity} borderRadius="50px">+</Button>
      <Text>{quantity}</Text>
      <Button onPress={decreaseQuantity} borderRadius="50px">-</Button>
    </HStack>
  );
};
