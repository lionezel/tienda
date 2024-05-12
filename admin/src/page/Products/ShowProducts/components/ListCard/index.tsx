import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Cards } from "..";

import styled from "styled-components";
import { Products } from "../../../../../interfaces/Product";
import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

interface ListProps {
  products: Products[];
}

export const ListCard: React.FC<ListProps> = ({ products }) => {
  const [productList, setProductList] = useState(products);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
      const updatedProducts = productList.filter(
        (product) => product.id !== productId
      );
      setProductList(updatedProducts);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <TableContainer
      style={{
        backgroundColor: "white",
        borderRadius: "5px",
        marginTop: "20px",
        borderRight: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell align="center">Categoria</StyledTableCell>
            <StyledTableCell align="right">Disponible</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <StyledTableRow key={product.id}>
              <Cards product={product} onDelete={handleDeleteProduct} />
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  "&.MuiTableCell-head": {
    backgroundColor: "White",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
