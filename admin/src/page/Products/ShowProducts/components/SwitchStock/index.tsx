import { Switch } from "@mui/material";
import { Products } from "../../../../../interfaces/Product";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

interface Props {
  product: Products;
}

export const SwitchStock = ({ product }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stockState, setStockState] = useState<boolean>(product.stock);

  const handleStockChange = async () => {
    const newStockState = !stockState;

    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        ...product,
        stock: newStockState,
      });
      setStockState(newStockState);
      console.log("¡Documento actualizado exitosamente!");
    } catch (error) {
      console.error("Error actualizando el documento: ", error);
    }
  };
  console.log(product);
  return (
    <Switch
      checked={stockState}
      onChange={handleStockChange}
      inputProps={{ "aria-label": "Switch demo" }}
    />
  );
};
