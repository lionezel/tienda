import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { User } from "../interfaces/User";

export const useFetchUser = () => {
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<User | null>({} as User);
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      return setUser(user);
    });

    return () => unsubscribeAuth();
  }, [auth]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );

          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserData(doc.data() as User);
            });
          } else {
            console.log(
              "No se encontraron datos adicionales para este usuario en Firestore."
            );
          }
        } catch (error) {
          console.error(
            "Error al obtener datos adicionales del usuario:",
            error
          );
        }
      }
    };

    fetchUserData();
  }, [user]);

  return userData;
};


