// import { Box, , , Divider, Drawer, , Menu, MenuItem, , Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';


// const LogoApp = () => {
// 	return <p style={{ fontSize: '1.5em', textAlign: 'left' }}>blogiseng</p>
// }

// const IconMenu = () => {
// 	return <p>Menu</p>
// }

const navItems = [
	{ text: 'Home', href: '/' },
];


const Navbar = (props) => {
	// const { window } = props;
	// const [mobileOpen, setMobileOpen] = useState(false);

	// const [user] = useAuthState(auth)

	// const [anchorEl, setAnchorEl] = useState(null);
	// const open = Boolean(anchorEl);
	// const handleClick = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleClose = () => {
	// 	setAnchorEl(null);
	// };

	// const navigate = useNavigate();
	// const buttonLogoutOnClickHandler = async () => {
	//     await signOutFromApplication();
	//     navigate("/login");
	// };

	// const handleDrawerToggle = () => {
	// 	setMobileOpen(!mobileOpen);
	// };

	// const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<>
			<AppBar component="nav" elevation={0}>
				<Container fixed>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
						<Typography>logo</Typography>
						<Divider />
						<Box sx={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
							{navItems.map((item) => (
								<Button key={item.href} sx={{ textTransform: 'capitalize', color: 'text.primary' }}>
									<Link to={item.href} style={{ textDecoration: 'none', }}>
										<ListItemText primary={item.text}>
										</ListItemText>
									</Link>
								</Button>
							))}
							<Link to={'/signin'} style={{textDecoration: 'none'}}>
								<Button sx={{ textTransform: 'capitalize'}} variant='contained' disableElevation>Sign in</Button>
							</Link>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}

export default Navbar;