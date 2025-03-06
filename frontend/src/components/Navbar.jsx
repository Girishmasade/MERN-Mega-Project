import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import FullScreenSearch from "./Search";
import CircleIcon from "@mui/icons-material/Circle";
import { LogIn } from 'lucide-react';
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    { label: "Shop", path: "/shop" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>

        {/* Navigation Links - Centered on Larger Screens */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            flexGrow: 1,
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <Button key={link.label} color="inherit" href={link.path}>
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Icon */}
          <IconButton color="inherit">
            <FullScreenSearch />
          </IconButton>

          {/* Red Dot (Notifications) */}
          {
            verify ? (
              <IconButton>
            <CircleIcon sx={{ color: "green" }} />
          </IconButton>
            ) : (
              <IconButton>
              <CircleIcon sx={{ color: "red" }} />
            </IconButton>
            )
          }
          
          <IconButton>
            <LogIn color="white"/>
          </IconButton>

          {/* Profile Icon */}
          {/* <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton> */}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List sx={{ width: 250 }}>
          {navLinks.map((link) => (
            <ListItem button key={link.label} component="a" href={link.path}>
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
