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
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { QueryDocumentSnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebase/config";

interface Props {
  orders: Order;
}

export const TableOrder = ({ orders }: Props) => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", orders.user_uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc: QueryDocumentSnapshot = querySnapshot.docs[0];
        const userDataFromSnapshot = userDoc.data() as User;
        setUserData(userDataFromSnapshot);
      } else {
        console.log("No se encontró el usuario con el UID proporcionado");
      }
    };

    fetchUserData();
  }, [orders.user_uid]);



console.log(userData)

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
                {order.products && order.products.length > 0 && typeof order.products[0].paymentMethod === "string" &&
                  GetPaymentMethodStyle(order.products[0].paymentMethod)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {order.products && order.products.length > 0 && order.products[0].OpcionDeEntrega}
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
