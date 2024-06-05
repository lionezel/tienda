import { useEffect, useState } from "react";
import { Order } from "../../../../../../interfaces/Orders";
import { Container } from "./styled";
import {
  collection,
  getDocs,
  query,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { User } from "../../../../../../interfaces/User";
import { UserDetailsItem } from "./components";

interface Props {
  order: Order;
}

export const UserData = ({ order }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", order.user_uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc: QueryDocumentSnapshot = querySnapshot.docs[0];
        const userDataFromSnapshot = userDoc.data() as User;
        setUserData(userDataFromSnapshot);
      } else {
        console.log("No se encontró el usuario con el UID proporcionado");
      }
    };

    fetchUserData();
  }, [order.user_uid]);

  return (
    <Container>
      <div
        style={{
          fontSize: "20px",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Detalle del usuario
      </div>
      <UserDetailsItem label="Nombre" value={userData?.name} />
      <UserDetailsItem label="Apellido" value={userData?.lastName} />
      <UserDetailsItem label="Dirección" value={userData?.address} />
      <UserDetailsItem
        label="Teléfono"
        value={userData?.telefone?.toString() || ""}
      />
      <UserDetailsItem label="Correo electrónico" value={userData?.email} />
    </Container>
  );
};
