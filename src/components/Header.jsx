import React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Link } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
// import CssBaseline from '@mui/material/CssBaseline';
// import useScrollTrigger from '@mui/material/useScrollTrigger';
// import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../authentication/firebase";

export default function Header() {
  const navigate = useNavigate();

  const buttonLogoutOnClickHandler = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Link
            href="/"
            color="inherit"
            variant="h6"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            Recipe
          </Link>
          <Button color="inherit" onClick={buttonLogoutOnClickHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
