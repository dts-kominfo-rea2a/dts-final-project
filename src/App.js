import CssBaseline from "@mui/material/CssBaseline";
// import SnackbarComponent from "./components/SnackbarComponent";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomeIndex from "./pages/Home/Index";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import getDesignTokens from "./themes";
import { useState, useMemo } from "react";

function App() {
  const [mode, setMode] = useState("light");
  const darkMode = useSelector((state) => state.themes.darkMode);

  useMemo(() => {
    if (darkMode) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [darkMode]);

  // const getDesignTokens = ({darkTheme, lightTheme})

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <SnackbarComponent /> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
