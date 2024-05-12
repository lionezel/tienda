import { Order } from "../../../../../../interfaces/Orders";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

interface Props {
  orders: Order[];
}

export const Preparing = ({ orders }: Props) => {
  const pendingOrders = orders.filter((order) => order.state === "preparando");
  const totalPendingOrders = pendingOrders.length;

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ fontSize: "20px" }}>
        {totalPendingOrders}
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          Ordenes preparandose
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#f1f0f3",
          height: "30px",
          width: "30px",
          padding: "1px",
          borderRadius: "5px",
        }}
      >
        <RestaurantMenuIcon style={{ marginLeft: "3px", marginTop: "3px" }} />
      </div>
    </div>
  );
};
