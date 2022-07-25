import React from "react";

import { Box, Typography } from "@mui/material";

import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Box className={styles.container}>
        <Typography variant="body1">Halo, ini adalah halaman utama</Typography>
      </Box>
    </>
  );
};

export default HomePage;
