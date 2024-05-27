import { useEffect, useState } from "react";
import { SearchProduct } from "./components";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Button, ScrollView } from "native-base";
import { View } from "react-native";
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navigate(arg0: string): unknown;
}

export const Home = () => {
  const products = useFetchProducts();
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<Props>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

 const handle = () => {
    navigation.navigate("Checkout");
  }

  return (
    <View>
      <ScrollView h="auto">
        <SearchProduct products={products} />
        <Button onPress={handle}>check</Button>
      </ScrollView>
    </View>
  );
};
