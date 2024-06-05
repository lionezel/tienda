import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { CustomLink } from "../../styled";

export const Qr = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const nav = [
    { page: "/Qr", name: "Qr" },
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
        <ListItemText primary="Transferencias" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nav.map((nav) => (
            <ListItemButton
              sx={{ pl: 4 }}
              style={{ height: 50 }}
            >
              <ListItemIcon>
              
              </ListItemIcon>
              <CustomLink to={`${nav.page}`}>
                <ListItemText primary={nav.name} />
              </CustomLink>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
