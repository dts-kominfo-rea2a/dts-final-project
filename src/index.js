import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./layouts/Home";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import ProtectedComponent from "./components/ProtectedComponent";
import ProtectedAuthComponent from "./components/ProtectedAuthComponent";
import { store } from "./app/store";
import { Provider } from "react-redux";
import RecipeDetail from "./layouts/RecipeDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedComponent>
                <Home />
              </ProtectedComponent>
            }
          ></Route>
          <Route
            path="recipe/:id"
            element={
              // <ProtectedComponent>
              <RecipeDetail />
              // </ProtectedComponent>
            }
          ></Route>
          <Route
            path="login"
            element={
              <ProtectedAuthComponent>
                <LoginPage />
              </ProtectedAuthComponent>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedAuthComponent>
                <RegisterPage />
              </ProtectedAuthComponent>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
