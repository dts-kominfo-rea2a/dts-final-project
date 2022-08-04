//import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./containers/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import StandingPage from "./containers/StandingPage";


function App() {
  
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/detail/:id" element={<StandingPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
