import LunchDiningIcon from "@mui/icons-material/LunchDining";
import tarjetaBancaria from "./assets/tarjeta-bancaria.png";
import dinero from "./assets/dinero.png"

export const GetPaymentMethodStyle = (paymentMethod: string): JSX.Element => {
  switch (paymentMethod) {
    case "tarjeta":
      return (
        <img src={tarjetaBancaria} alt="tarjeta" style={{ height: "50px" }} />
      );
    case "efectivo":
      return <img src={dinero} alt="efectivo" style={{ height: "50px" }} />
    default:
      return <LunchDiningIcon />;
  }
};
