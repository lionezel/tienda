/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Container } from "./styled";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Order } from "../../interfaces/Orders";

import { SearchOrder, ShowData } from "./components";

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ordersRef = collection(db, "OrderIncoming");
        const querySnapshot = await getDocs(ordersRef);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.data().id,
          name: doc.data().name || "",
          address: doc.data().address,
          products: doc.data().products,
          total: doc.data().total,
          state: doc.data().state,
          createdAt: doc.data().createdAt || "",
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container >
      <ShowData orders={orders} />
      <SearchOrder orders={orders} />
    </Container>
  );
};

export default Orders;
