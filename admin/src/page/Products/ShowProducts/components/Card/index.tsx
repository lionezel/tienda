import { Products } from "../../../../../interfaces/Product";
import { Img, StyledTableCell } from "./styled";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { SwitchStock } from "..";
import { GetCategoryStyle } from "../../../../../Global/GLOBAL_CATEGORY";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../firebase/config";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface CardProps {
  product: Products;
  onDelete: (productId: string) => void;
}

export const Cards: React.FC<CardProps> = ({ product, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "products", product.id), (doc) => {
      if (!doc.exists()) {
        setOpenDialog(false);
      }
    });

    return () => unsubscribe();
  }, [product.id]);

  const handleDelete = async () => {
    try {
      const productRef = doc(db, "products", product.id);
      console.log("Producto eliminado exitosamente");
      setOpenDialog(false);
      await deleteDoc(productRef);
      onDelete(product.id);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  };

  return (
    <>
      <StyledTableCell component="th" scope="row" width="20%">
        <div style={{ display: "flex" }}>
          <Img src={product.imageURL} alt="product" style={{ width: "50px" }} />
          <div style={{ marginLeft: "20px", marginTop: "5px" }}>
            {product.name}
          </div>
        </div>
      </StyledTableCell>
      <StyledTableCell align="center">
        <div style={{ position: "relative", left: "25%" }}>
          {" "}
          {typeof product.type === "string" &&
            GetCategoryStyle(product.type)}{" "}
        </div>
      </StyledTableCell>
      <StyledTableCell align="right">
        <SwitchStock product={product} />
      </StyledTableCell>
      <StyledTableCell align="right">{product.price}</StyledTableCell>
      <StyledTableCell align="right">
        <Link
          style={{ color: "black" }}
          to={`/updateProduct/${product.id}`}
        >
          <EditIcon />
        </Link>

        <DeleteIcon
          onClick={() => setOpenDialog(true)}
          style={{ cursor: "pointer" }}
        />
      </StyledTableCell>

      {
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            ¿Estás seguro de que quieres eliminar este producto?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
};
