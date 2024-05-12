import { useState } from "react";
import { Order } from "../../../../interfaces/Orders";
import { TableOrder } from "..";
import { Divider, TextField } from "@mui/material";

interface Props {
  orders: Order[];
}

export const SearchOrder = ({ orders }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOders = orders.filter((order) =>
    Object.values(order).some(
      (value) =>
        typeof value === "string" &&
        value.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    )
  );

  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ padding: "20px" }}>
        <TextField
          id="outlined-basic"
          label="Filtrar"
          variant="outlined"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Divider />
      <TableOrder orders={filteredOders} />
    </div>
  );
};
