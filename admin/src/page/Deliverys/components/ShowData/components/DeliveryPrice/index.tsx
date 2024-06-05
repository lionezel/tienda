import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../../../firebase/config";
import { Button, TextField } from "@mui/material";
import { useFormattedNumber } from "../../../../../../hook/useFormattedNumber";

export const DeliveryPrice: React.FC = () => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [isChangeValue, setIsChangeValue] = useState<boolean>(false);

  const formattedPrice = useFormattedNumber(price !== undefined ? price : "");

  const fetchCurrentPrice = async () => {
    const docRef = doc(db, "deliveryPrice", "currentPrice");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setPrice(data.price);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchCurrentPrice();
  }, []);

  console.log(price)

  const handleSave = async () => {
    if (!price || isNaN(parseFloat(price.toString()))) {
      alert("Por favor, ingresa un precio válido");
      return;
    }

    try {
      const docRef = doc(db, "deliveryPrice", "currentPrice");
      await setDoc(
        docRef,
        {
          price: parseFloat(formattedPrice.value.replace(/\./g, "")),
          timestamp: new Date(),
        },
        { merge: true }
      );
      alert("Precio guardado con éxito");
      setIsChangeValue(false);
    } catch (error) {
      console.error("Error al guardar el precio: ", error);
      alert("Error al guardar el precio");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>
        Precio del envío:
      </div>
      {isChangeValue ? (
        <>
          <TextField
            label="Precio"
            variant="standard"
            type="text"
            value={formattedPrice.value}
            onChange={(e) => formattedPrice.setValue(e.target.value)}
            style={{ marginBottom: "10px", padding: "5px", fontSize: "16px" }}
          />
          <Button
            variant="outlined"
            onClick={handleSave}
            style={{ padding: "10px", fontSize: "16px" }}
          >
            Guardar
          </Button>
        </>
      ) : (
        <div style={{ fontSize: "20px" }}>
          {price ? `${formattedPrice.value} $` : "No disponible"}
        </div>
      )}
      <Button
        variant="contained"
        onClick={() => setIsChangeValue(!isChangeValue)}
        style={{ marginTop: "10px" }}
      >
        {isChangeValue ? "Cancelar" : "Cambiar"}
      </Button>
    </div>
  );
};
