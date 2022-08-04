import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../services/authService";
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

	const [login, {isLoading}] = useLoginMutation()
	const dispatch = useDispatch()
	const push = useNavigate()

	useEffect(() => {
		document.title = 'Sign in -- blogiseng'
	})

	const [values, setValues] = React.useState({
		identifier: '',
		password: '',
		showPassword: false,
	});
	
	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const identifierOnChangeHandler = (event) => {
		setValues({
			...values,
			identifier: event.target.value
		})
	}

	const passwordOnChangeHandler = (event) => {
		setValues({
			...values,
			password: event.target.value
		})
	}

	const doSignIn = async (e) => {
		e.preventDefault()
		try {
		 const response =	await login(values)
		 if(response.data){
				dispatch(setCredentials(response.data))
			  localStorage.setItem('access_token', response.data.jwt)
				push('/profile')
		 }
		} catch (err) {
			console.log(err.data.message[0].messages[0].message);
		}

		
	}

	return (

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
				<Typography variant="h5">
					Sign in your account
				</Typography>
				<Typography variant="body2" color="gray">
					Sign in to more experience
				</Typography>



				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1em', marginTop: '1.5em',
					width: '24rem'
				}} component="form" noValidate>

					<Button variant="outlined" disabled color="info" size="medium">Sign In with Google</Button>
					<Divider><Typography variant="body2" color="gray">or Sign in with email</Typography> </Divider>

					<TextField
						label="Email"
						type="email"
						variant="outlined"
						size="small"
						value={values.identifier}
						onChange={identifierOnChangeHandler}
					/>

					<TextField
						label="Password"
						type={ values.showPassword ? "text" : "password"}
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
					<Box sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
						{/* <FormControlLabel
							value="end"
							control={<Checkbox />}
							label="Remember me"
							labelPlacement="end"
						/> */}

						<Link to="/forget-password">
							<Typography variant="body1">Forget password?</Typography>
						</Link>

					</Box>

					<Button
						variant="contained"
						size="medium"
						disableElevation
						onClick={doSignIn}
					>
						{isLoading ? 'Loading ...' : 'Sign In'}
						
					</Button>


					<Typography variant="body1">Not registered yet ? <Link to="/auth/signup">Create an account</Link> </Typography>

				</Box>
			</Card>
		</Grid>
	)
}

export default LoginPage;
