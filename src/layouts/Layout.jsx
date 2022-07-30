import { Outlet } from "react-router-dom"
import Navbar from "../components/NavbarComponent"

export const Layout = () => {
  return (
    <>
      <Navbar />

      <>
        <div style={{ margin: '4.em 0', padding: '0' }}>
            <Outlet />
        </div>
      </>
    </>
  )
}