import { onAuthStateChanged } from "firebase/auth";
import { Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../../../firebase/config";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Product } from "../../../../../../interfaces/Products";
import { doc, getDoc, updateDoc } from "@firebase/firestore";

interface Props {
  item: Product;
}

export const Quantity = ({ item }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      return setUser(user);
    });
    return () => unsubcribe();
  }, [auth]);

  const actualizarCantidad = async (incremento: boolean) => {
    try {
      const productoRef = doc(db, "cart", item.id);
  
      const productoDoc = await getDoc(productoRef);
  
      if (productoDoc.exists()) {
        const data = productoDoc.data();
        if (data && typeof data.quantity === "number") {
          const cantidadActual = data.quantity;
          const nuevaCantidad = incremento ? cantidadActual + 1 : cantidadActual - 1;
  
          await updateDoc(productoRef, {
            quantity: nuevaCantidad,
          });
  
          console.log("Cantidad actualizada exitosamente.");
        } else {
          console.log("La propiedad 'quantity' no está definida correctamente en el objeto 'item'.");
        }
      } else {
        console.log("El producto no existe.");
      }
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
    }
  };

  return (
    <VStack>
      <Entypo name="plus" size={24} color="black" onPress={() => actualizarCantidad(true)}/>
      <Text
        fontSize="xs"
        _dark={{
          color: "warmGray.50",
        }}
        color="coolGray.800"
        alignSelf="flex-start"
      >
        {item.quantity}
      </Text>
      <Foundation name="minus" size={24} color="black" onPress={() => actualizarCantidad(false)}/>
    </VStack>
  );
};
