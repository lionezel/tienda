import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { OrderCompleted } from "../interfaces/OrderCompleted";

const useFetchOrderCompleted = () => {
  const [order, setOrder] = useState<OrderCompleted | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordersRef = collection(db, "orderCompleted");
        const orderSnapshot = await getDocs(ordersRef);

        orderSnapshot.forEach((doc) => {
          const orderData = {
            orderId: doc.data().orderId,
            order: doc.data().order || "",
            createdAt: doc.data().order.createdAt,
            state: doc.data().order.state,
            name: doc.data().order.name,
            paymentMethod: doc.data().order.products.paymentMethod,
            OpcionDeEntrega: doc.data().order.products.OpcionDeEntrega,
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
