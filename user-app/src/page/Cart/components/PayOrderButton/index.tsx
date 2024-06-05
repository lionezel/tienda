import React, { useEffect, useState } from "react";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { Product } from "../../../../interfaces/Products";
import { auth, db } from "../../../../firebase/config";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";

interface Props {
  cartItems: Product[];
  navigate(arg0: string): unknown;
  totalPrice: number;
}

export const PayOrderButton = ({ cartItems, totalPrice }: Props) => {
  const [hasOrdered, setHasOrdered] = useState<boolean>(false);
  const navigation = useNavigation<Props>();

  useEffect(() => {
    checkExistingOrder();
  }, []);

  const checkExistingOrder = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const ordersRef = collection(db, `orders`);
        const q = query(ordersRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setHasOrdered(true);
        }
      }
    } catch (error) {
      console.error("Error al verificar la orden existente:", error);
    }
  };

  const handleOrderAction = () => {
    if (hasOrdered) {
      navigation.navigate("Order");
    } else {
      handleAddToOrder();
    }
  };

  const handleAddToOrder = async () => {
    try {
      if (cartItems.length === 0) {
        console.log("El carrito está vacío. No se puede crear una orden.");
        return;
      }
  
      const user = auth.currentUser;
  
      if (user?.uid) {
        const orderCollection = collection(db, `orders`);
        await addDoc(orderCollection, {
          user_uid: user.uid,
          totalDelProducto: totalPrice,
        });

        setHasOrdered(true);
  
        navigation.navigate("Order");
        console.log("Orden creada exitosamente");
      } else {
        console.error(
          "El usuario no está autenticado o no tiene un UID válido."
        );
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <ButtonBase onPress={handleOrderAction}>
      {hasOrdered ? "Ver Orden" : "Pedir mi Orden"}
    </ButtonBase>
  );
};
