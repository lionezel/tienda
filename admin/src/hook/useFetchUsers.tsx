import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { User } from "../interfaces/User";

export const useFetchProducts = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(userRef);
        const userData = querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid || "",
          name: doc.data().name || "",
          address: doc.data().address || "",
          email: doc.data().email || "",
          lastName: doc.data().lastName || "",
          telefone: doc.data().telefone || "",
        }));
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchProducts();
  }, []);
  return user;
};
