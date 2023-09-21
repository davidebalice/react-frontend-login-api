import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import Php from "../pages/php";

//const About = () => <h1>About</h1>;
//const Contact = () => <h1>Contact</h1>;

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/php" element={<Php />} />
    </Routes>
  );
};

export default AppRouter;
