import { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase/config";
import { DeliveryPrice } from "../interfaces/DeliveryPrice";

export const useFetchDeliveryprice = () => {
  const [deliveryprice, setDeliveryprice] = useState<DeliveryPrice[]>([]);

  useEffect(() => {
    const deliveryPriceRef = collection(db, "deliveryPrice");

    const subscriber = onSnapshot(deliveryPriceRef, {
      next: (snapshot) => {
        const deliveryPrice: DeliveryPrice[] = [];
        snapshot.docs.forEach((deliveryPrices) => {
          const data = deliveryPrices.data();
          deliveryPrice.push({
            price: data.price,
            timestamp: data.timestamp,
          });
        });
        setDeliveryprice(deliveryPrice);
      },
    });
    return () => subscriber();
  }, []);
  return deliveryprice;
};
