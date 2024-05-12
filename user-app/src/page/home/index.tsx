import { useEffect, useState } from "react";
import { SearchProduct } from "./components";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ScrollView } from "native-base";
import { View } from "react-native";
import { useFetchProducts } from "../../hooks/useFetchProducts";

export const Home = () => {
  const products = useFetchProducts();
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <View>
      <ScrollView h="560px">
        <SearchProduct products={products} />
      </ScrollView>
    </View>
  );
};
