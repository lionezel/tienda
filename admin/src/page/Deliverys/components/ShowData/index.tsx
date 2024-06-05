import { Divider } from "@mui/material";
import { DeliveryPrice } from "./components";

export const ShowData = () => {
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
        <DeliveryPrice />
      </div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div style={{ width: "33.3%" }}></div>
      <Divider orientation="vertical" variant="middle" flexItem />
      <div style={{ width: "33.3%" }}></div>
    </div>
  );
};
