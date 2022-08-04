import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/authService";

const RegisterPage = () => {

  const [register, {isLoading}] = useRegisterMutation()
	const push = useNavigate()


  useEffect(() => {
    document.title = "Create account -- blogiseng";
  });

  const [values, setValues] = useState({
    username: '',
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

  const emailOnChangeHandler = (event) => {
		setValues({
			...values,
			email: event.target.value
		})
	}

  const usernameOnChangeHandler = (event) => {
		setValues({
			...values,
			username: event.target.value
		})
	}

	const passwordOnChangeHandler = (event) => {
		setValues({
			...values,
			password: event.target.value
		})
	}

  const doSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await register(values)
      if(response.data){
			  localStorage.setItem('access_token', response.data.jwt)
				push('/profile')
		 }
    } catch (err) {
			console.log(err.data.message[0].messages[0].message);
    }
  }

  

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
              value={values.username}
              onChange={usernameOnChangeHandler}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              value={values.email}
              onChange={emailOnChangeHandler}
            />

            <TextField
              label="Password"
              type={values.showPassword ? 'text' : 'password'}
              variant="outlined"
              size="small"
              value={values.password}
              onChange={passwordOnChangeHandler}
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
              onClick={doSignUp}
            >
              {isLoading ? 'Loading ...' : 'Create new account'}
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
