// import { Box, , , Divider, Drawer, , Menu, MenuItem, , Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SwitchThemeComponent from './SwitchThemeComponent';


// const LogoApp = () => {
// 	return <p style={{ fontSize: '1.5em', textAlign: 'left' }}>blogiseng</p>
// }

// const IconMenu = () => {
// 	return <p>Menu</p>
// }

const navItems = [
	{ text: 'Home', href: '/' },
	{ text: 'Profile', href: '/profile' },
];


const NavbarPrivate = () => {

	return (
		<>
			<AppBar component="nav" elevation={0}>
				<Container fixed>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
						<Typography color={'default'} variant="h5">blogiseng</Typography>
						<Divider />
						<Box sx={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
							{navItems.map((item) => (
								<Link to={item.href} style={{ textDecoration: 'none', }} key={item.href} >
									<Button sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
										<Typography color={'inherit'}>{item.text}
										</Typography>
									</Button>
								</Link>
							))}
							{/* <Link to={'/auth/signin'} style={{ textDecoration: 'none' }}>
								<Button sx={{ textTransform: 'capitalize' }} variant='contained' disableElevation>Sign in</Button>
							</Link> */}
							<SwitchThemeComponent />
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}

export default NavbarPrivate;