import React, { useEffect, useState } from "react";
import { ButtonBase } from "../../../../GLOBAL/GLOBAL_STYLED";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../../firebase/config";
import { User } from "../../../../interfaces/User";
import { useNavigation } from "@react-navigation/native";
import { Orders } from "../../../../interfaces/Orders";

interface Props {
  orderItems: Orders[];
  user: User;
  navigate(arg0: string): unknown;
}

export const ConfirmOrderButton = ({ orderItems, user }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [hasOrderIncoming, setHasOrderIncoming] = useState<boolean>(false);
  const [deliveryOption, setDeliveryOption] = useState<string>("");
  const navigation = useNavigation<Props>();

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

  const checkoutPage = () => {
    if (userData?.address && deliveryOption) {
      if (hasOrderIncoming) {
        navigation.navigate("MyOrderInComing");
      } else {
        navigation.navigate("Checkout");
      }
    }
  };

  return (
    <ButtonBase onPress={checkoutPage}>
      {hasOrderIncoming ? "Ver Orden" : "Pagar"}
    </ButtonBase>
  );
};
