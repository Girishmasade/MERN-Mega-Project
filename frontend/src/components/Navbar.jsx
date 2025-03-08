import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FullScreenSearch from "./Search";
import CircleIcon from "@mui/icons-material/Circle";
import { LogIn } from "lucide-react";

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
        {/* Logo - Always Visible */}
        <Typography variant="h6" component="div">
          LOGO
        </Typography>

        {/* Navigation Links - Centered on Large Screens */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            flexGrow: 1,
            gap: 3,
          }}
        >
          {navLinks.map((link) => (
            <Button key={link.label} color="inherit" href={link.path}>
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Icons & Mobile Menu Button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Mobile Menu Button (Only Visible on Small Screens) */}
          <IconButton
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Search Icon */}
          <IconButton color="inherit">
            <FullScreenSearch />
          </IconButton>

          {/* Status Indicator */}
          <IconButton>
            <CircleIcon sx={{ color: verify ? "green" : "red" }} />
          </IconButton>

          {/* Login Icon */}
          <IconButton>
            <LogIn color="white" />
          </IconButton>
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
