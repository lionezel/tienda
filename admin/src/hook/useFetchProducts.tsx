import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Products } from "../interfaces/Product";

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(productsRef);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "",
          price: doc.data().price || 0,
          type: doc.data().type || "",
          stock: doc.data().stock || false,
          imageURL: doc.data().imageURL || "",
          description: doc.data().description || "",
          createdAt: doc.data().createdAt || "",
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return products;
};
