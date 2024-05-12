import { Order } from "../../../../interfaces/Orders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getStateStyle } from "../../../../Global/GLOBAL_STATES";
import { GLOBAL_COLOR } from "../../../../Global/GLOBAL_COLOR";
import { GetPaymentMethodStyle } from "../../../../Global/GLOBAL_METHOD";

interface Props {
  orders: Order[];
}

export const TableOrder = ({ orders }: Props) => {
  return (
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Orden</StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Fecha
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Usuario
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Estado
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Metodo de pago
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Opcion de entrega
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Link
                  style={{
                    textDecoration: "none",
                    color: GLOBAL_COLOR,
                    fontSize: "20px",
                  }}
                  to={`/Orders/${order.id}`}
                >
                  #{order.id}
                </Link>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {order.createdAt}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {order.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <div style={getStateStyle(order.state)}>{order.state}</div>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {typeof order.products[0].paymentMethod === "string" &&
                  GetPaymentMethodStyle(order.products[0].paymentMethod)}
                {}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {order.products[0].OpcionDeEntrega}
              </StyledTableCell>
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
