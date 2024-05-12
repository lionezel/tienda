import React, { useEffect, useState } from "react";
import { Product } from "../interfaces/Products";
import { auth, db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "@firebase/firestore";

export const useFetchCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const cartRef = collection(db, "cart");
        const q = query(cartRef, where("user_uid", "==", user.uid));
        onSnapshot(q, (snapshot) => {
          const items: Product[] = [];
          snapshot.forEach((doc) => {
            items.push(doc.data() as Product);
          });
          setCartItems(items);
        });
      }
    });
    return () => unsubcribe();
  }, []);
  return cartItems;
};
