import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, Checkbox, Divider, FormControlLabel, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

	useEffect(() => {
		document.title = 'Sign in -- blogiseng'
	})

	const [values, setValues] = React.useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	return (
		// <Container>
		// 	<Box sx={{
		// 		margin: '0 auto',
		// 		width: "100%",
		// 		display: 'fles'
		// 	}}>
		// 		<Card>
		// 			<Typography variant="h4">Sign In</Typography>
		// 			<Form>

		// 			</Form>
		// 		</Card>
		// 	</Box>
		// </Container>

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

					<Button variant="outlined" color="info" size="medium">Sign In with Google</Button>
					<Divider><Typography variant="body2" color="gray">or Sign in with email</Typography> </Divider>

					<TextField
						label="Email"
						type="email"
						variant="outlined"
						size="small"
					/>

					<TextField
						label="Password"
						type={ values.showPassword ? "text" : "password"}
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
					<Box sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center'
					}}>
						<FormControlLabel
							value="end"
							control={<Checkbox />}
							label="Remember me"
							labelPlacement="end"
						/>

						<Link to="/forget-password">
							<Typography variant="body1">Forget password?</Typography>
						</Link>

					</Box>

					<Button
						variant="contained"
						size="medium"
						disableElevation
					>
						Sign In
					</Button>


					<Typography variant="body1">Not registered yet ? <Link to="/auth/signup">Create an account</Link> </Typography>


					{/* {loginOrRegister === "login" ? (
					<Link to="/register">
						<Typography variant="body1">or do you want Register ?</Typography>
					</Link>
				) : (
					<Link to="/login">
						<Typography variant="body1">or do you want Login ?</Typography>
					</Link>
				)} */}

				</Box>
			</Card>
		</Grid>
	)
}

export default LoginPage;
