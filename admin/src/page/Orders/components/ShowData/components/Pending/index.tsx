import { Order } from "../../../../../../interfaces/Orders";
import ScheduleIcon from "@mui/icons-material/Schedule";

interface Props {
  orders: Order[];
}

export const Pending = ({ orders }: Props) => {
  const pendingOrders = orders.filter((order) => order.state === "pendiente");
  const totalPendingOrders = pendingOrders.length;

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <div style={{ fontSize: "20px" }}>
        {totalPendingOrders}
        <div style={{ marginTop: "20px", fontSize: "20px" }}>
          Ordenes pendientes
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
        <ScheduleIcon style={{ marginLeft: "3px", marginTop: "3px" }} />
      </div>
    </div>
  );
};
