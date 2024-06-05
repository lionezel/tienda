import { Key, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface Transference {
    id: Key | null | undefined;
    imageURL: string 
    createdAt: string
}

export const useFetchTranference = () => {
  const [image, setImage] = useState<Transference[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const imageRef = collection(db, "Transferencias");
        const querySnapshot = await getDocs(imageRef);
        const imageData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
          imageURL: doc.data().imageURL || "",
          createdAt: doc.data().createdAt || "",
        }));
        setImage(imageData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return image;
};
