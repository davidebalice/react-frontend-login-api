import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import Github from "../pages/github";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/github" element={<Github />} />
    </Routes>
  );
};

export default AppRouter;
