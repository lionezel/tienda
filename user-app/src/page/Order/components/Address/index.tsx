import { collection, getDocs, query, where } from "@firebase/firestore";

import { Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import { User } from "../../../../interfaces/User";
import { useNavigation } from "@react-navigation/native";

interface Props {
  navigate(arg0: string): unknown;
}

export const Address = ({ user }: User) => {
  const [userData, setUserData] = useState<User | null>(null);
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

  const handle = () => {
    navigation.navigate("UserInfo");
  };

  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      padding={5}
      backgroundColor="white"
      ml={5}
      mr={5}
      mt={4}
      borderRadius={15}
    >
      <Text>Address</Text>
      <Text>{userData?.address}</Text>
      <Text onPress={handle}>Actualizar</Text>
    </View>
  );
};
