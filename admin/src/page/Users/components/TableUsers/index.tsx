import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { User } from "../../../../interfaces/User";
import styled from "styled-components";

interface Props {
  users: User[];
}

export const TableUsers = ({ users }: Props) => {
  console.log(users);
  return (
    <TableContainer style={{ backgroundColor: "white"}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Usuario</StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Correo electronico
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Telefono
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              Direccion
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <div style={{ fontWeight: "bold" }}>
                  {users.name} {users.lastName}
                </div>
                <div style={{ fontSize: "10px" }}>{users.uid}</div>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {users.email}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                #{users.telefone}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <div>{users.address}</div>
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
