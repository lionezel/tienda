import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Order } from '../interfaces/Orders';


const useFetchOrder = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordersRef = collection(db, "OrderIncoming");
        const orderSnapshot = await getDocs(ordersRef);
        orderSnapshot.forEach((doc) => {
          if (doc.data().id === orderId) {
            const orderData = {
              id: doc.data().id,
              name: doc.data().name || "",
              address: doc.data().address,
              products: doc.data().products,
              total: doc.data().total,
              state: doc.data().state,
              createdAt: doc.data().createdAt || "",
              user_uid: doc.data().user_uid
            };
            setOrder(orderData);
          }
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (orderId) {
      fetchOrder();
    } else {
      setOrder(null);
    }
  }, [orderId]);

  return order;
};

export default useFetchOrder;
