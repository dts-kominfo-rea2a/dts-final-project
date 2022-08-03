import React, { useEffect, useState } from "react";
//import gambar from "../asset/ProfilePictureimage.png";


import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel"
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {
  auth,
  loginDenganEmailDanPassword,
  registerDenganEmailDanPassword,
} from "../authentication/firebase";

import { useAuthState } from "react-firebase-hooks/auth";

const LoginOrRegisterForm = ({ loginOrRegister }) => {
  const navigate = useNavigate();

  const [user, isLoading, error] = useAuthState(auth);

  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const textFieldEmailOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      email: event.target.value,
    });
  };

  const textFieldPasswordOnChangeHandler = (event) => {
    setCredential({
      ...credential,
      password: event.target.value,
    });
  };

  const loginHandler = () => {
    loginDenganEmailDanPassword(credential.email, credential.password);
  };

  const registerHandler = () => {
    registerDenganEmailDanPassword(credential.email, credential.password);
  };

  const buttonLoginOrRegisterOnClickHandler = () => {
    if (loginOrRegister === "login") {
      loginHandler();
    } else {
      registerHandler();
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: "dark",
  //   },
  // });

  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://coffee.alexflipnote.dev/random)',
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square
        //   style={{
        //     background: 'linear-gradient(90deg, rgb(211 8 18) 0%, rgb(0, 0, 0) 50%, rgb(0, 0, 0) 100%), url(undefined) 0% 0% / contain no-repeat'
        // }}
        >
          <Box
            sx={{
              my: 12,
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography variant="body1" fontFamily="inter">
              {loginOrRegister === "login" ? "Login Page" : "Register Page"}
            </Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                fontFamily="inter"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={credential.email}
                onChange={textFieldEmailOnChangeHandler}
                autoFocus
              />
              <TextField
                fontFamily="inter"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credential.password}
                onChange={textFieldPasswordOnChangeHandler}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                onClick={buttonLoginOrRegisterOnClickHandler}
              >
                {loginOrRegister === "login" ? "Login" : "Register Account"}
              </Button>
              <Grid container>
                <Grid item xs>
                  {loginOrRegister === "login" ? (
                    <Link to="/register">
                      <Typography variant="body1">Sign Up ?</Typography>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <Typography variant="body1">Sign In ?</Typography>
                    </Link>
                  )}
                </Grid>
                <Grid item>
                  {/* <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link> */}
                </Grid>
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    // </ThemeProvider>
  );
};

export default LoginOrRegisterForm;