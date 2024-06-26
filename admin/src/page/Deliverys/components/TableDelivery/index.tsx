import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

export const TableDelivery = () => {
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
         
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
          
               
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
              
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                
              </StyledTableCell>
            </StyledTableRow>
     
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
