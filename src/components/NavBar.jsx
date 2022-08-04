import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { logOutFromApp } from "../authentication/firebase";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();

  const buttonLogoutOnClickHandler = async () => {
    //keluar dari aplikasi kembali ke login page
    await logOutFromApp();
    navigate("/login");
  };

  return (
    <Box className={styles.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={styles.grow}>
            My App 
          </Typography>
          <ul className={styles.app__navbar__links}>
            <li className="p__opensans"><a href="#home">Home</a></li>
            <li className="p__opensans"><a href="#about">About</a></li>
            <li className="p__opensans"><a href="#menu">Menu</a></li>
          </ul>
          <Button color="inherit" onClick={buttonLogoutOnClickHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>

  );
};

export default NavBar;
