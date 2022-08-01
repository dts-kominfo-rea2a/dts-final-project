import { Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavbarComponent"

export const Layout = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Navbar />

      <>
        <div style={{ margin: '3em 0', padding: '0' }}>
            <Outlet />
        </div>
      </>
      <Typography color={'gray'} textAlign={'center'}>&copy;{ currentYear } Riki Joni Iskandar All rights reserved</Typography>
    </>
  )
}