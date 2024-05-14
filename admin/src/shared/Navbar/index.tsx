import HomeIcon from "@mui/icons-material/Home";
import { Container, CustomLink, Title } from "./styled";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Orders, Products, SingOut, Users } from "./components";

export const Navbar = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container>
        <CustomLink to={`/`}>
          <HomeIcon />
          <Title>Home</Title>
        </CustomLink>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Ecomerce" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Products />
              <Orders />
              <Users />
            </List>
          </Collapse>
        </List>
        <SingOut />
      </Container>
    </>
  );
};
