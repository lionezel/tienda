import LunchDiningIcon from "@mui/icons-material/LunchDining";
import qr from "./assets/qr.png";
import dinero from "./assets/dinero.png"

export const GetPaymentMethodStyle = (paymentMethod: string): JSX.Element => {
  switch (paymentMethod) {
    case "Transferencia":
      return (
        <img src={qr} alt="qr" style={{ height: "35px" }} />
      );
    case "efectivo":
      return <img src={dinero} alt="efectivo" style={{ height: "50px" }} />
    default:
      return <LunchDiningIcon />;
  }
};
