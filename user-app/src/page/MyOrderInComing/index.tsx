import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";

import { auth, db } from "../../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "@firebase/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator } from "react-native";
import { Preparing, Ready, Wait } from "./components";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navigate(arg0: string): unknown;
}

export const MyOrderInComing = () => {
  const [user, setUser] = useState<User | null>(null);
  const [order, setOrder] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<Props>();

  useEffect(() => {
    const authListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getOrderStatus(user.email);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      authListener();
    };
  }, []);

  useEffect(() => {
    if(!user){
      return
    }
    const ordersRef = collection(db, "OrderIncoming");
    const q = query(ordersRef, where("email", "==", user?.email));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        navigation.navigate("Home"); 
      } else {
        querySnapshot.forEach((doc) => {
          setOrder(doc.data());
          setLoading(false);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const getOrderStatus = async (email: any) => {
    const ordersRef = collection(db, "OrderIncoming");
    const q = query(ordersRef, where("email", "==", email));

    try {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setOrder(doc.data());
          setLoading(false);
        });
      });

      return unsubscribe;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View padding={10}>
      {user && order ? (
        order.state === "pendiente" ? (
          <Wait />
        ) : order.state === "preparando" ? (
          <Preparing />
        ) : order.state === "listo" ? (
          <Ready order={order} />
        ) : (
          <Text></Text>
        )
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
