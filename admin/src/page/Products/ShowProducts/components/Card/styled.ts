import { TableCell } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  
`;

export const ImageCard = styled.div`
width: 100%;
`;

export const StyledTableCell = styled(TableCell)(() => ({
    "&.MuiTableCell-head": {
      backgroundColor: "White",
      color: "black",
    },
    "&.MuiTableCell-body": {
      fontSize: 14,
    },
  }));
  
export const Img = styled.img `
    width:10%;
    border-radius: 100px;
`