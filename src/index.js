import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./common/Header";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router/AppRouter";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
