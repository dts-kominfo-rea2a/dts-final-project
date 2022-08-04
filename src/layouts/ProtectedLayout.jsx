import { Navigate, Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/NavbarComponent";

const ProtectedLayout = () => {
  const currentYear = new Date().getFullYear()

  const user = localStorage.getItem('access_token')
  if(!user){
    return <Navigate to='/auth/signin' />
  }

  return (
    <>
    <Navbar />
    <Box sx={{ padding: '6em'}}>
      <Outlet />
    </Box>
    <Typography color={'gray'} textAlign={'center'}>&copy;{ currentYear } Riki Joni Iskandar All rights reserved</Typography>
    </>
  ) 
}

export default ProtectedLayout;