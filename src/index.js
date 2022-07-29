import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomepageTemplate from './pages/Templates/HomepageTemplate'
import HomePage from './pages/Home/HomePage'
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import TimelinePage from './pages/Timeline/TimelinePage';
import AppTemplate from './pages/Templates/AppTemplate';
import { store } from './store';
import { Provider } from 'react-redux';
import UserProfilePage from './pages/Timeline/UserProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<HomepageTemplate />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Route>
            <Route path="/" element={<AppTemplate />}>
              <Route path="/timeline/:timeline_type" element={<TimelinePage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/u/:username" element={<UserProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
