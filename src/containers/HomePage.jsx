import React from "react";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Typography,
} from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../authentication/firebase";

const HomePage = () => {
  const [user] = useAuthState(auth);
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });
  return (
    <>
      {/* <ThemeProvider theme={darkTheme}>
        <CssBaseline /> */}
        <main>
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
              {user ? (
                <Typography variant="body1">
                  Email - <strong>{user.email}</strong>, uid -{" "}
                  <strong>{user.uid}</strong>
                </Typography>
              ) : (
                ""
              )}
            </Box>
         
        </main>
      {/* </ThemeProvider> */}
    </>
  );
};

export default HomePage;