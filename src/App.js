import "./App.css";
import SnackbarComponent from "./components/SnackbarComponent";
import Button from "@mui/material/Button";
import { snackbarSuccess } from "./redux/actions/showSnackbar";
import { useDispatch } from "react-redux";
import { Routes, Route, useRoutes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomeIndex from "./pages/Home/Index";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <SnackbarComponent />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeIndex />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Route>
      </Routes>
      {/* <Button
        color="success"
        onClick={() => dispatch(snackbarSuccess("Berhasill !!!"))}
      >
        Show
      </Button> */}
    </div>
  );
}

export default App;
