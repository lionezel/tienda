import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Product } from "../interfaces/Products";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase/config";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productRef = collection(db, "products");

    const subscriber = onSnapshot(productRef, {
      next: (snapshot) => {
        const products: Product[] = [];
        snapshot.docs.forEach((product) => {
          const data = product.data();
          products.push({
            id: product.id,
            description: data.description,
            imageURL: data.imageURL,
            name: data.name,
            price: data.price,
            type: data.type,
            stock: data.stock,
          });
        });
        setProducts(products);
      },
    });
    return () => subscriber();
  }, []);
  return products
};
