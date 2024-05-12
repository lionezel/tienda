import React, { useEffect, useState } from "react";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { auth, db } from "../../../../firebase/config";
import { User } from "../../../../interfaces/User";
import { useNavigation } from "@react-navigation/native";
import { Orders } from "../../../../interfaces/Orders";
import { formatDate } from "../../../../GLOBAL/Date/FormatDate";

interface Props {
  orderItems: Orders[];
  user: User;
  navigate(arg0: string): unknown;
}

const generateID = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const ConfirmOrderButton = ({ orderItems, user }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [hasOrderIncoming, setHasOrderIncoming] = useState<boolean>(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("");
  const navigation = useNavigation<Props>();

  console.log(deliveryOption);
  console.log(orderItems);

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

  useEffect(() => {
    checkExistingOrderIncoming();
    fetchDeliveryOption();
  }, []);

  const checkExistingOrderIncoming = async () => {
    try {
      if (userData) {
        const orderIncoming = collection(db, "OrderIncoming");
        const q = query(orderIncoming, where("email", "==", userData.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setHasOrderIncoming(true);
        }
      }
    } catch (error) {
      console.error("Error al verificar la orden existente:", error);
    }
  };

  const createNewCollection = async () => {
    try {
      const user = auth.currentUser;
      if (user?.uid && userData && userData.email !== undefined) {
        const id = generateID();
        const totalPrice = calculateTotal(orderItems, deliveryOption);
        const address =
          userData?.address !== undefined ? userData?.address : "";
        const orderCollectionRef = collection(db, "OrderIncoming");
        const q = query(orderCollectionRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        await addDoc(orderCollectionRef, {
          id: id,
          user_uid: user.uid,
          products: orderItems,
          address: address,
          email: userData.email,
          OpcionDeEntrega: deliveryOption,
          name: userData?.name,
          total: totalPrice,
          telefone: userData?.telefone,
          state: "pendiente",
          createdAt: formatDate(new Date()),
        });
        navigation.navigate("MyOrderInComing");
      } else {
        alert("User not logged in or userData.email is undefined!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDeliveryOption = async () => {
    try {
      if (user) {
        const orderRef = collection(db, "orders");
        const q = query(orderRef, where("user_uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const data = docSnapshot.data();
          const option = data.OpcionDeEntrega || "";
          setDeliveryOption(option);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotal = (items: Orders[], deliveryOption: string) => {
    return items.reduce((total, item) => {
      total += item.totalDelProducto;

      if (deliveryOption === "delivery") {
        total += 4000; 
      } else {
        total
      }
  
      return total;
    }, 0);
  };

  const handleOrderIncomingAction = () => {
    if (userData?.address && deliveryOption) {
      if (hasOrderIncoming) {
        navigation.navigate("MyOrderInComing");
      } else {
        createNewCollection();
      }
    } else {
      alert("Por favor complete todos los campos requeridos.");
    }
  };
  return (
    <ButtonBase onPress={handleOrderIncomingAction}>
      {hasOrderIncoming ? "Ver Orden" : "Pagar"}
    </ButtonBase>
  );
};
