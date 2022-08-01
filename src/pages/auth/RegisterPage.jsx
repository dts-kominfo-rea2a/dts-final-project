import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {

  useEffect(() => {
    document.title = "Create account -- blogiseng";
  });

  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        minWidth="400px"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Card sx={{ padding: '2.5em 1.5em', gap: '1em' }}>
          <Typography variant="h5" fontWeight="400">
            Create new account
          </Typography>
          {/* <Typography variant="body2" color="gray">
					Sign in to more experience
				</Typography> */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1em', marginTop: '1.5em',
            width: '24rem'
          }} component="form" noValidate>
            <TextField
              label="Name"
              type="email"
              variant="outlined"
              size="small"
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              size="small"
            />

            <TextField
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>

              }}
            />

            <Button
              variant="contained"
              size="medium"
              disableElevation
            >
              Create new account
            </Button>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>

              <Typography variant="body1">Already have an account ? <Link to="/auth/signin">Sign in</Link> </Typography>

            </Box>
          </Box>
        </Card>
      </Grid>
    </>
  )
}

export default RegisterPage;
