import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import { OrderCompleted } from "../../../../../../interfaces/OrderCompleted";
interface Props {
  orders: OrderCompleted[];
}

export const TableOrderCompleted = ({ orders }: Props) => {
  return (
    <TableContainer
      sx={{
        backgroundColor: "white",
        mt: "30px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" scope="row">
              Orden
            </StyledTableCell>
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
              Total
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell>{order.orderId}</StyledTableCell>

              <StyledTableCell>{order.createdAt}</StyledTableCell>

              <StyledTableCell>{order.name}</StyledTableCell>

              <StyledTableCell>{order.state}</StyledTableCell>

              <StyledTableCell>${order.total}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#1976d2",
    color: "white",
    fontWeight: "bold",
  },
  "&.MuiTableCell-body": {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
