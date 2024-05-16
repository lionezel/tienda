import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "../../../../firebase/config";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

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
    <ListItemButton onClick={handleSingOut}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItemButton>
  );
};
