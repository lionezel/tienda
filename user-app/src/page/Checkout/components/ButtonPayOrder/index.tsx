import { useNavigation } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import { User } from "../../../../interfaces/User";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../firebase/config";
import { formatDate } from "../../../../GLOBAL/Date/FormatDate";
import { Orders } from "../../../../interfaces/Orders";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { useFetchOrder } from "../../../../hooks/useFetchOrder";
import { useOnAuthStateChanged } from "../../../../hooks/useOnAuthStateChanged";
import { useFetchCart } from "../../../../hooks/useFetchCart";

interface Props {
  orderItems: Orders[];
  user: User;
  navigate(arg0: string): unknown;
}

const generateID = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const ButtonPayOrder = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [hasOrderIncoming, setHasOrderIncoming] = useState<boolean>(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("");
  const navigation = useNavigation<Props>();
  const orderItems = useFetchOrder();
  const user = useOnAuthStateChanged();
  const cartItems = useFetchCart();

  console.log(cartItems);

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
          products: cartItems,
          user_uid: user.uid,
          order: orderItems,
          email: userData.email,
          state: "pendiente",
          createdAt: formatDate(new Date()),
        });
        navigation.navigate("MyOrderInComing");
        setHasOrderIncoming(true);
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
        total;
      }

      return total;
    }, 0);
  };

  const handleOrderIncomingAction = () => {
    if (hasOrderIncoming) {
      navigation.navigate("MyOrderInComing");
    } else {
      createNewCollection();
    }
  };

  return (
    <ButtonBase onPress={handleOrderIncomingAction}>
      {hasOrderIncoming ? "Ver Orden" : "Pedir mi Orden"}
    </ButtonBase>
  );
};
