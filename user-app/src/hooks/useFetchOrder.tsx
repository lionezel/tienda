import { useEffect, useState } from 'react'
import { auth, db } from '../firebase/config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Orders } from '../interfaces/Orders';

export const useFetchOrder = () => {
    const [orderItems, setOrderItems] = useState<Orders[]>([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            const orderRef = collection(db, "orders");
            const q = query(orderRef, where("user_uid", "==", user.uid));
            const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
              const items: Orders[] = [];
              snapshot.forEach((doc) => {
                items.push(doc.data() as Orders);
              });
              setOrderItems(items);
            });
    
            return () => unsubscribeSnapshot();
          }
        });
        return () => unsubscribe();
      }, []);      
      return orderItems
}
