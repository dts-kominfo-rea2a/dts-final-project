import CssBaseline from '@mui/material/CssBaseline';
import SnackbarComponent from "./components/SnackbarComponent";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomeIndex from "./pages/Home/Index";

function App() {

  return (
    <>
      <CssBaseline />
      <SnackbarComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
