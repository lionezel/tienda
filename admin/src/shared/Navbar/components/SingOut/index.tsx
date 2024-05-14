import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../../../firebase/config";

export const SingOut = () => {
  const handleSingOut = async () => {
    try {
      await auth.signOut();
      console.log("Usuario cerró sesión exitosamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div
      style={{ alignItems: "center", cursor: "pointer" }}
      onClick={handleSingOut}
    >
      <LogoutIcon />
      SingOut
    </div>
  );
};
