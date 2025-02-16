import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Wrapper from "./common/Wrapper";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Wrapper>
        <Header />
        <AppRouter />
      </Wrapper>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
