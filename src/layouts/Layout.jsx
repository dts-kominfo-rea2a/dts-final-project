import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavbarComponent"

export const Layout = () => {
  return (
    <>
      <Navbar />

      <>
        <div style={{ margin: '4.em 0em', padding: '0' }}>
          <Container>
            <Outlet />
          </Container>
        </div>
      </>
    </>
  )
}