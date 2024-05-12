import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { CustomLink } from "../../styled";

export const Orders = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const nav = [
    { page: "/Orders", name: "Lista de ordenes" },
    { page: "/Orders/completed", name: "ordenes completas" },
  ];

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PanoramaFishEyeIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenes" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nav.map((nav) => (
            <ListItemButton sx={{ pl: 4 }} style={{ height: 50 }}>
              <ListItemIcon></ListItemIcon>
              <CustomLink to={`${nav.page}`}>
                <ListItemText primary={nav.name} />
              </CustomLink>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
