import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "native-base";
import { GLOBAL_COLOR } from "../../GLOBAL/COLOR_GLOBAL";
import { useNavigation } from "@react-navigation/native";
import { Product } from "../../interfaces/Products";
import { auth, db } from "../../firebase/config";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { User } from "firebase/auth";

type RootStackParamList = {
  navigate(arg0: string): unknown;
};

export const Cart = () => {
  const navigation = useNavigation<RootStackParamList>();
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [hasOrderInComing, setHasOrderInComing] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    const unsubscribeCart = user && onCartSnapshot();

    return () => {
      unsubscribeAuth();
      unsubscribeCart && unsubscribeCart();
    };
  }, [user]);

  const onCartSnapshot = () => {
    if (user) {
      const cartRef = collection(db, "cart");
      const q = query(cartRef, where("user_uid", "==", user.uid));
      return onSnapshot(q, (snapshot) => {
        let total = 0;
        const items: Product[] = [];
        snapshot.forEach((doc) => {
          const product = doc.data() as Product;
          items.push(product);
          if (product.quantity !== undefined) {
            total += product.quantity;
          }
        });
        setCartItems(items);
        setTotalItems(total);
      });
    }
  };

  useEffect(() => {
    if (user?.uid) {
      const unsubscribeOrder = onOrderSnapshot();
      return () => unsubscribeOrder();
    }
  }, [user]);

  const onOrderSnapshot = () => {
    const orderInComingRef = collection(db, "OrderIncoming");
    const q = query(orderInComingRef, where("user_uid", "==", user?.uid));
    return onSnapshot(q, (snapshot) => {
      setHasOrderInComing(!snapshot.empty);
    });
  };

  return (
    <View>
      {hasOrderInComing ? (
        <View
          marginRight={6}
          backgroundColor={GLOBAL_COLOR}
          borderRadius={10}
          width={10}
          height={10}
          alignItems="center"
          padding={2}
        >
          <AntDesign
            name="isv"
            size={24}
            color="black"
            onPress={() => navigation.navigate("MyOrderInComing")}
          />
        </View>
      ) : (
        <View marginRight={10} height={10} alignItems="center" padding={2}>
          <AntDesign
            name="shoppingcart"
            size={24}
            color="black"
            onPress={() => navigation.navigate("Carrito")}
          />
          <View
            backgroundColor={GLOBAL_COLOR}
            borderRadius={10}
            width={6}
            alignItems="center"
            position="relative"
            left="5"
            bottom="2"
          >
            <Text>{totalItems}</Text>
          </View>
        </View>
      )}
    </View>
  );
};
