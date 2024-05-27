import { Box, Divider, FormControl, HStack, Input, Text } from "native-base";
import React, { useState } from "react";
import { User } from "../../../../../../interfaces/User";
import { collection, getDocs, updateDoc } from "@firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { ButtonBase } from "../../../../../../GLOBAL/GLOBAL_STYLED";

interface Props {
  userData: User;
}

export const Form = ({ userData }: Props) => {
  const [camposEditables, setCamposEditables] = useState<User>({});

  const handleUpdate = async () => {
    try {
      if (
        userData &&
        userData.email &&
        Object.keys(camposEditables).length > 0
      ) {
        const userDocRef = collection(db, "users");
        const querySnapshot = await getDocs(userDocRef);
        querySnapshot.forEach(async (doc) => {
          const userDataFromDoc = doc.data() as User;
          if (userDataFromDoc.email === userData.email) {
            const updateData = Object.assign(
              {},
              userDataFromDoc,
              camposEditables
            );
            await updateDoc(doc.ref, updateData);
            console.log("¡Datos actualizados correctamente!");
          }
        });
      }
    } catch (error) {
      console.error("Error al actualizar los datos del usuario:", error);
    }
  };

  const handleChange = (campo: keyof User, valor: string | number) => {
    setCamposEditables({
      ...camposEditables,
      [campo]: typeof valor === "number" ? valor.toString() : valor,
    });
  };

  return (
    <Box>
      <HStack space={2}>
        <FormControl mb="5" width="50%">
          <FormControl.Label>Nombre</FormControl.Label>
          <Input
            value={camposEditables.name ?? userData?.name}
            onChange={(e) => handleChange("name", e.nativeEvent.text)}
          />
        </FormControl>
        <FormControl mb="5" width="50%">
          <FormControl.Label>Apellido</FormControl.Label>
          <Input
            value={camposEditables.lastName ?? userData?.lastName}
            onChange={(e) => handleChange("lastName", e.nativeEvent.text)}
          />
        </FormControl>
      </HStack>
      <FormControl mb="5">
        <FormControl.Label>Direccion</FormControl.Label>
        <Input
          value={camposEditables.address ?? userData?.address}
          onChange={(e) => handleChange("address", e.nativeEvent.text)}
        />
      </FormControl>
      <FormControl mb="5">
        <FormControl.Label>Telefono</FormControl.Label>
        <Input
          value={camposEditables.telefone ?? userData?.telefone}
          onChange={(e) => handleChange("telefone", e.nativeEvent.text)}
        />
      </FormControl>
      <Divider />
      <ButtonBase onPress={handleUpdate}>Actualizar</ButtonBase>
    </Box>
  );
};
