import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { User } from "../interfaces/User";

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userRef = collection(db, "users");
        const querySnapshot = await getDocs(userRef);
        const userData = querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid || "",
          name: doc.data().name || "",
          address: doc.data().address || "",
          email: doc.data().email || "",
          lastName: doc.data().lastName || "",
          telefone: doc.data().telefone || 0,
        }));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUsers();
  }, []);
  return users;
};
