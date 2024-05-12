import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { Center, Text, View } from "native-base";
import React from "react";
import { db } from "../../../../firebase/config";
import { Product } from "../../../../interfaces/Products";
import { User } from "firebase/auth";
import {
  ButtonBase,
  ButtonBaseWarning,
} from "../../../../GLOBAL/GLOBAL_STYLED";

interface Props {
  product: Product;
  user: User;
  count: number;
  stock: boolean;
}

export const ButtonAdd = ({ product, user, count, stock }: Props) => {
  const handleAddToCart = async () => {
    try {
      if (user?.uid) {
        if (!product || Object.keys(product).length === 0) {
          alert("Product is empty or undefined. Cannot add to cart.");
          return;
        }
        const addToCartQuery = query(
          collection(db, "cart"),
          where("user_uid", "==", user.uid),
          where("product_id", "==", product.id)
        );
        const querySnapshot = await getDocs(addToCartQuery);
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, { quantity: count });
            alert("Product added to cart successfully!");
          });
        } else {
          await addDoc(collection(db, "cart"), {
            user_uid: user.uid,
            product_id: product.id,
            product: product,
            quantity: count,
          });
          alert("Product added to cart successfully!");
        }
      } else {
        alert("User not logged in!");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Error adding product to cart");
    }
  };

  return (
    <View>
      {!product.stock && (
        <ButtonBaseWarning>Producto no disponible</ButtonBaseWarning>
      )}
      {stock && (
        <ButtonBase onPress={handleAddToCart}>Anadir en el carrito</ButtonBase>
      )}
    </View>
  );
};
