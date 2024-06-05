import { Divider } from "@mui/material";
import { Order } from "../../../../interfaces/Orders";
import { Pending, Preparing, Ready } from "./components";

interface Props {
  orders: Order[];
}

export const ShowData = ({ orders }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        marginBottom: "20px",
        borderRadius: "10px",
        padding: "20px",
        display: "flex",
      }}
    >
      <div style={{ width: "33.3%" }}>
        <Pending orders={orders} />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div style={{ width: "33.3%" }}>
        <Ready orders={orders} />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div style={{ width: "33.3%" }}>
        <Preparing orders={orders} />
      </div>
    </div>
  );
};
