import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import Github from "../pages/github";

//const About = () => <h1>About</h1>;
//const Contact = () => <h1>Contact</h1>;

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/github" element={<Github />} />
    </Routes>
  );
};

export default AppRouter;
