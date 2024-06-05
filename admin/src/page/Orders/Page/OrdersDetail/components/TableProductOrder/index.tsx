import { Order } from "../../../../../../interfaces/Orders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { Key } from "react";
import styled from "styled-components";

interface Props {
  order: Order;
}

export const TableProductOrder = ({ order }: Props) => {
  console.log(order);

  return (
    <TableContainer style={{ backgroundColor: "white", borderRadius: 10 }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Producto
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Precio
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Cantidad
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Total
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.products && order.products.map((productOrder, index) => (
            <React.Fragment key={index}>
              {productOrder.products && productOrder.products.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (product: any, innerIndex: Key | null | undefined) => (
                  <StyledTableRow key={innerIndex}>
                    <StyledTableCell component="th" scope="row">
                      {product.imageURL && (
                        <img
                          src={product[0]?.product?.imageURL}
                          style={{
                            width: 50,
                            borderRadius: 10,
                            marginRight: 10,
                          }}
                          alt="Product"
                        />
                      )}
                      {product.product.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      ${product.product.price}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {product.quantity}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      ${product.product.price * product.quantity}
                    </StyledTableCell>
                  </StyledTableRow>
                )
              )}
            </React.Fragment>
          ))}
          <div
            style={{
              display: "flex",
              margin: "20px",
            }}
          >
            <div style={{ fontWeight: "bold", marginRight: "10px" }}>
              Total:
            </div>
            <div>${order.total}</div>
          </div>
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
