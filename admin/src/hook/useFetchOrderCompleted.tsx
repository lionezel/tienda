import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";


const useFetchOrderCompleted = () => {
  const [order, setOrder] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordersRef = collection(db, "orderCompleted");
        const orderSnapshot = await getDocs(ordersRef);
        orderSnapshot.forEach((doc) => {
          const orderData = {
            orderId: doc.data().orderId,
            order: doc.data().order || ""
          };
          setOrder(orderData);
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, []);

  return order;
};

export default useFetchOrderCompleted;
