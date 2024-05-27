import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { OrderCompleted } from "../interfaces/OrderCompleted";
import { collection, getDocs } from "firebase/firestore";

const useFetchOrderCompleted = () => {
  const [order, setOrder] = useState<OrderCompleted[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordersRef = collection(db, "orderCompleted");
        const orderSnapshot = await getDocs(ordersRef);

        const ordersData: OrderCompleted[] = [];

        orderSnapshot.forEach((doc) => {
          const orderData = {
            orderId: doc.data().orderId,
            order: doc.data().order || "",
            createdAt: doc.data().order.createdAt,
            state: doc.data().order.state,
            name: doc.data().order.name,
            total: doc.data().order.total,
          };
          ordersData.push(orderData);
        });
        setOrder(ordersData);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, []);

  return order;
};

export default useFetchOrderCompleted;
