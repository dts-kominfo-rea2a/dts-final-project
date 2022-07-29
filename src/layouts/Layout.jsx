import { Button, Container, Grid } from "@mui/material"
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavbarComponent"

export const Layout = () => {
  return (
    <>
      <Navbar />

      <>
        <div style={{ margin: '4.5em 0em', padding: '0' }}>
          <Grid sx={{ backgroundColor: 'lightcyan', minWidth: '100%', margin: '0 auto', height: '60vh', display: 'flex', flexDirection: 'column', marginBottom: '2em', alignItems: 'center', justifyContent: 'center' }}>
            <Container>
              <Grid>
                <p style={{ fontSize: '4rem' }}>write your own</p>
                <Button variant="contained" disableElevation> Get Started </Button>
              </Grid>
            </Container>
          </Grid>
          <Container>
            <Outlet />
          </Container>
        </div>
      </>
    </>
  )
}